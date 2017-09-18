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
                <a href="#" onClick={props.onForgotPassword}>忘记密码了？</a>
            </div>
            <label>
                <input type="radio" value="signUp" checked={props.onSelected === 'signUp'} 
            onChange={props.switch} /> 
               注册
        
            </label>
        </form>
    )
} 