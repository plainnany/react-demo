import AV from 'leancloud-storage'

const appId = 'YccHsPkiXhrh6WVLK3QBLcBn-gzGzoHsz'
const appKey = '4nNH1lHoxSJl0epADF0Muu2v'
AV.init({ appId, appKey })
export default AV

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
 
