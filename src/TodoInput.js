import React, { Component } from 'react';


class TodoInput extends Component{
    render() {
        return <input type="text" value={this.props.content} 
        onChange={this.changeTitle.bind(this)}
        onKeyPress={this.submit.bind(this)} // 将submit中的this指的为TodoInput
        />  
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