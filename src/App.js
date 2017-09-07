import React, { Component } from 'react';
import logo from './logo.svg';
import TodoInput from './TodoInput.js';
import TodoItem from './TodoItem.js';
import 'normalize.css';
import './index.css';
import './reset.css';

class App extends Component {
  constructor(props) {
    super(props)
    this.state={
      newTodo: '',
      todoList: [
        {id: 1,title: '第一个待办'}
      ]
    }

  }
  render() {
    let todos = this.state.todoList.map((item,index)=>{
      return (
        <li key={index}>
          <TodoItem todo = {item} />
        </li>
      )
    })
    return (
      <div className="App">
        <h1>我的待办</h1>
        <div className="inputWrapper">
          <TodoInput content={this.state.newTodo} onSubmit={this.addTodo} />
        </div>
        <ol>
          {todos}
        </ol>
      </div>
    )
  }

  addTodo() {
    console.log('添加一个todo')
  }
}

export default App;
