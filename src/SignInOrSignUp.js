import React, { Component } from 'react'
import SignUpForm from './SignUpForm'
import SignInForm from './SignInForm'

export default class SignInOrSignUp extends Component{
    constructor(props){
        super(props)
        this.state = {
            selected: 'signIn'
        }
    }
    switch(e){
        this.setState({
            selected: e.target.value
        })
        
    }
    render(){
        return (
            <div className="signInOrSignUp">
                <h3>Welcome</h3>
                
                <div className="panes">
                    {this.state.selected === 'signUp' ? 
                        <SignUpForm formData={this.props.formData} 
                            onSubmit={this.props.onSignUp} 
                            onChange={this.props.onChange} 
                            onSelected={this.state.selected}
                            switch={this.switch.bind(this)}/> : null}
                    {this.state.selected === 'signIn' ? 
                        <SignInForm formData={this.props.formData} 
                            onSubmit={this.props.onSignIn} 
                            onChange={this.props.onChange}  
                            onForgotPassword={this.props.onForgotPassword}
                            onSelected={this.state.selected}
                            switch={this.switch.bind(this)}
                        />: null}
                </div>
                {/* <nav>
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
                </nav> */}
            </div>
        )
    }
}