import AV from 'leancloud-storage'

const appId = 'YccHsPkiXhrh6WVLK3QBLcBn-gzGzoHsz'
const appKey = '4nNH1lHoxSJl0epADF0Muu2v'
AV.init({ appId, appKey })
export default AV

export const TodoModel = {
    getByUser(user, successFn, errorFn){
        // 文档见 https://leancloud.cn/docs/leanstorage_guide-js.html#批量操作
        let query = new AV.Query('Todo')
        query.find().then((response) => {
            console.log(response)
            let array = response.map((t) => {
                return {id: t.id, ...t.attributes}
            })
            successFn.call(null, array)
        }, (error) => {
            errorFn && errorFn.call(null, error)
        })
    },
    create({status, title, deleted}, successFn, errorFn){
        let Todo = AV.Object.extend('Todo')  // 这个是用户输入Todo存储的数据
        let todo = new Todo()
        todo.set('title', title)
        todo.set('status', status)
        todo.set('deleted', deleted)
        // 根据文档 https://leancloud.cn/docs/acl-guide.html#单用户权限设置
        // 这样做就可以让这个 Todo 只被当前用户看到
        let acl = new AV.ACL()
        acl.setPublicReadAccess(false) // 注意这里是 false
        acl.setWriteAccess(AV.User.current(), true)
        acl.setReadAccess(AV.User.current(), true)

        todo.setACL(acl)

        todo.save().then(function (response) {
            successFn.call(null, response.id)
        }, function (error) {
            errorFn && errorFn.call(null, error)
        })

        
    },
    update({id, title, status, deleted}, successFn, errorFn){
        // 文档 https://leancloud.cn/docs/leanstorage_guide-js.html#更新对象
        let todo = AV.Object.createWithoutData('Todo', id)
        title !== undefined && todo.set('title', title)
        status !== undefined && todo.set('status', status)
        deleted !== undefined && todo.set('deleted', deleted)
        // 考虑如下场景
        // update({id:1, title:'hi'})
        // 调用 update 时，很有可能没有传 status 和 deleted
        // 也就是说，用户只想「局部更新」
        // 所以我们只 set 该 set 的
        // 那么为什么不写成 title && todo.set('title', title) 呢，为什么要多此一举跟 undefined 做对比呢？
        // 考虑如下场景
        // update({id:1, title: '', status: null}}
        // 用户想将 title 和 status 置空，我们要满足
        todo.save().then((response) => {
            successFn && successFn.call(null)
        }, (error) => errorFn && errorFn.call(null, error))
    },
    destroy(todoId, successFn, errorFn){
        // 文档 https://leancloud.cn/docs/leanstorage_guide-js.html#删除对象
        let todo = AV.Object.createWithoutData('Todo', todoId)
        todo.destroy().then(function (response) {
            successFn && successFn.call(null)
        }, function (error) {
            errorFn && errorFn.call(null, error)
        })
      
    }
}

export function signUp(mail,username, password, successFn, errorFn){
    // 新建 AVUser 对象实例
    var user = new AV.User()
    // 设置用户名
    user.setUsername(username)
    // 设置密码
    user.setPassword(password)
    // 设置邮箱
    user.setEmail(mail)

    user.signUp().then(function (loginedUser) {
        let user = getUserFromAVUser(loginedUser)
        successFn.call(null, user)
    }, function (error) {
        errorFn.call(null, error)
    })
    
    return undefined
 
}
export function signIn(username, password, successFn, errorFn){
    AV.User.logIn(username, password).then(function (loginedUser) {
        let user = getUserFromAVUser(loginedUser)
        successFn.call(null, user)
    }, function (error) {
        errorFn.call(null, error)
    })
}
export function getCurrentUser(){
    let user = AV.User.current()
    return user ? getUserFromAVUser(user) : null
}
function getUserFromAVUser(AVUser){
    return {

        id: AVUser.id,
        ...AVUser.attributes   // 把 AVUser的attributes属性拷贝到getUserFromAVUser这个对象
    }
}
export function signOut(){
    AV.User.logOut()
    return undefined
}
export function sendPasswordResetEmail(mail, successFn, errorFn){
    AV.User.requestPasswordReset(mail).then(function (success) {
        successFn.call() 
    }, function (error) {
        console.dir(error)
    })
}
 
