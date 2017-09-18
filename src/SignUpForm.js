import React from 'react'
export default function (props){
    return (
        <form className="signUp" onSubmit={props.onSubmit.bind(this)}> {/* 注册*/}
            <div className="row">
                <input type="text" value={props.formData.mail} placeholder="Email"
                onChange={props.onChange.bind(null,'mail')}/>
            
            </div>
            <div className="row">
                <input type="text" value={props.formData.username} placeholder="Username"
                onChange={props.onChange.bind(null,'username')}/>
                {/* bind 不仅可以绑定 this，还可以绑定第一个参数 */}
            </div>
            <div className="row">
                <input type="password" value={props.formData.password} placeholder="Password"
                onChange={props.onChange.bind(null,'password')}/>
            </div>
            <div className="row actions">
                <button type="submit">注册</button>
            </div>
            <div className="row login">
                已有账号？请
                <label>
                    <input type="radio" value="signIn" checked={props.onSelected === 'signIn'} 
                onChange={props.switch} /> 
                    登录
                </label>
            </div>
            
        </form>
        
        
    )
}