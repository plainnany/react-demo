import React, { Component } from 'react';


class TodoInput extends Component{
    render() {
        return <input type="text" value={this.props.content} 
        onKeyPress={this.submit.bind(this)} />
    }
    submit(e){
        if (e.key === 'Enter') {
            
            this.props.onSubmit(e)
        }
    }
}

export default TodoInput