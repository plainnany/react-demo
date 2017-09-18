import React from 'react'
export default function(props){
    return (
        <form className="signIn" onSubmit={props.onSubmit}> {/* 登录*/}
            <div className="row">
                <input type="text" value={props.formData.username} placeholder="Username"
                onChange={props.onChange.bind(null,'username')}/>
            </div>
            <div className="row">
                <input type="password" value={props.formData.password} placeholder="Password"
                onChange={props.onChange.bind(null,'password')}/>
            </div>
            <div className="row actions">
                <button type="submit">登录</button>
                
            </div>
            <div className="row register">
                还没有账户？请
                <label>
                    <input type="radio" value="signUp" checked={props.onSelected === 'signUp'} 
                onChange={props.switch} /> 
                点击注册
            
                </label>
            </div>

            <div className="forgotPassword">
                <a href="#" onClick={props.onForgotPassword}>忘记密码了？</a>
            </div>
            
        </form>
    )
} 