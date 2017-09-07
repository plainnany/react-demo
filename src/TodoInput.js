import React, { Component } from 'react';
import './TodoInput.css'

class TodoInput extends Component{
    render() {
        return <input type="text" value={this.props.content} 
        className="TodoInput"
        onChange={this.changeTitle.bind(this)}  
        onKeyPress={this.submit.bind(this)} // 将submit中的this指的为TodoInput
        />  
        // onChange，onKeyPress是事件名
    }
    submit(e) {
        if (e.key === 'Enter') {
            this.props.onSubmit(e)
        }
    }

    changeTitle(e) {
        this.props.onChange(e)
    }
}

export default TodoInput