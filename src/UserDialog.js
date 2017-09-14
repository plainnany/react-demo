import React, { Component } from 'react'
import './UserDialog.css'
import {signUp,signIn} from './leanCloud'
import SignUpForm from './SignUpForm'
import SignInForm from './SignInForm'

export default class UserDialog extends Component{
    constructor(props){
        super(props)
        this.state = {
            
            selected: 'signUp',
            formData: {
                username: '',
                password: ''
            }
        }
        
    }
    switch(e){
        this.setState({
            selected: e.target.value
        })
        
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
        let {username,password} = this.state.formData
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
        signUp(username, password, success, error)
    }
    changeFormData(key,e){
        let stateCopy = JSON.parse(JSON.stringify(this.state))
        stateCopy.formData[key] = e.target.value
        this.setState(stateCopy)
    }

    render() {
        
        return (
            <div className="UserDialog-Wrapper">
                <div className="UserDialog">
                    <nav onChange={this.switch.bind(this)}>
                        <label>
                            <input type="radio" value="signUp" checked={this.state.selected === 'signUp'} 
                            onChange={this.switch.bind(this)} /> 
                            注册
                        </label>
                        <label>
                            <input type="radio" value="signIn" checked={this.state.selected === 'signIn'} 
                            onChange={this.switch.bind(this)} /> 
                            登录
                        </label>
                    </nav>
                    <div className="panes">
                        {this.state.selected === 'signUp' ? 
                        <SignUpForm formData={this.state.formData} 
                            onSubmit={this.signUp.bind(this)} 
                            onChange={this.changeFormData.bind(this)} /> : null}
                        {this.state.selected === 'signIn' ? 
                            <SignInForm formData={this.state.formData} 
                            onSubmit={this.signIn.bind(this)} 
                            onChange={this.changeFormData.bind(this)}  
                            />: null}
                    </div>
                </div>
            </div>
            
        )
    }
    
}