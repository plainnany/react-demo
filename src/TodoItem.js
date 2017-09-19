import React, { Component } from 'react';
import './TodoItem.css'

class TodoItem extends Component {
    render() {
        
        return (
            <div className="TodoItem">
                <label>
                    <input type="checkbox" checked={this.props.todo.status === 'completed'} 
                        onChange={this.toggle.bind(this)} />
                    <span className="icon-unchecked iconfont"></span>
                    <span className="icon-checked iconfont"></span>
                    
                </label>
                <span className="title">{this.props.todo.title}</span>
                <button onClick={this.delete.bind(this)} className="icon-delete iconfont"></button>
            </div>
        )
    }
    toggle(e) {
        this.props.onToggle(e,this.props.todo) 
    }
    delete(e) {
        this.props.onDelete(e,this.props.todo)
    }
}

export default TodoItem