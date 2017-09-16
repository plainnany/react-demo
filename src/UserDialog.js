import React, { Component } from 'react'
import './UserDialog.css'
import {signUp,signIn,sendPasswordResetEmail} from './leanCloud'
import SignInOrSignUp from './SignInOrSignUp'
import ForgotPasswordForm from './ForgotPassword'

export default class UserDialog extends Component{
    constructor(props){
        super(props)
        this.state = {
            
            selectedTab: 'signInOrSignUp', // 'forgotPassword'
            formData: {
                mail: '',
                username: '',
                password: ''
            }
        }
        
    }
    
    signIn(e){
        e.preventDefault()
        let {username,password} = this.state.formData
        let success = (user)=>{
            this.props.onSignUp.call(null, user)
        }
        let error = (error)=>{
            
            switch(error.code){
                case 210:
                    alert('用户名与密码不匹配')
                    break
                case 211:
                    alert('找不到用户名')
                default:
                    alert(error)
                    break
            }
        }
        signIn(username, password, success, error)
    }
    signUp(e){
        e.preventDefault()
        let {mail,username,password} = this.state.formData
        let success = (user)=>{
            this.props.onSignUp.call(null, user)
        }
        let error = (error)=>{
            switch(error.code){
                case 202:
                    alert('用户名已被占用')
                    break
                case 201:
                    alert('请输入密码')
                default:
                    alert(error)
                    break
            }
        }
        signUp(mail,username, password, success, error)
    }
    changeFormData(key,e){
        let stateCopy = JSON.parse(JSON.stringify(this.state))
        stateCopy.formData[key] = e.target.value
        this.setState(stateCopy)
    }
    showForgotPassword(){
        let stateCopy = JSON.parse(JSON.stringify(this.state))
        stateCopy.selectedTab = 'forgotPassword'
        this.setState(stateCopy)
    }
    returnSignIn(){
        let stateCopy = JSON.parse(JSON.stringify(this.state))
        stateCopy.selectedTab = 'signInOrSignUp'
        this.setState(stateCopy)
    }
    resetPassword(e){
        e.preventDefault()
        sendPasswordResetEmail(this.state.formData.mail)    
    }
    render() {
        return (
            <div className="UserDialog-Wrapper">
                <div className="UserDialog">
                    {this.state.selectedTab === 'signInOrSignUp' ? 
                    <SignInOrSignUp 
                        formData={this.state.formData} 
                        onSignIn={this.signIn.bind(this)}
                        onSignUp={this.signUp.bind(this)} 
                        onChange={this.changeFormData.bind(this)}
                        onForgotPassword={this.showForgotPassword.bind(this)}
                    /> : 
                    <ForgotPasswordForm 
                        onSubmit={this.resetPassword.bind(this)} 
                        onChange={this.changeFormData.bind(this)}
                        onSignIn={this.returnSignIn.bind(this)} 
                        formData={this.changeFormData.bind(this)} />}
                </div>
            </div>
            
        )
    }
    
}