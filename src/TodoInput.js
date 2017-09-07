import React, { Component } from 'react';


class TodoInput extends Component{
    render() {
        return <input type="text" defaultValue={this.props.content}/>
    }
}

export default TodoInput