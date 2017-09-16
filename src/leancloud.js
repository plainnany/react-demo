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
        let Todo = AV.Object.extend('Todo')   // 数据为何没有保存到leancloud Todo中，而是在_User中
        let todo = new Todo()
        todo.set('title', title)
        todo.set('status', status)
        todo.set('deleted', deleted)
        todo.save().then(function (response) {
            successFn.call(null, response.id)
            alert('success')
        }, function (error) {
            errorFn && errorFn.call(null, error)
        });
    
    },
    update(){
  
    },
    destroy(){
  
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
 
