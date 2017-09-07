import React, { Component } from 'react';

class TodoItem extends Component {
    render() {
        return <div>{this.props.todo.title}</div>
    }
}
export default TodoItem