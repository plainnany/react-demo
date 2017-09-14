import React, { Component } from 'react'
import logo from './logo.svg'
import TodoInput from './TodoInput'
import TodoItem from './TodoItem'
import UserDialog from './UserDialog'
import {getCurrentUser,signOut} from './leanCloud'
import 'normalize.css'
import './index.css'
import './reset.css'


class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      user: getCurrentUser() ||{},
      newTodo: '',
      todoList: []
    }

  }
  render() {
    let todos = this.state.todoList
      .filter((item) => !item.deleted)
      .map((item, index) => {
        return (
          <li key={index}>
            <TodoItem todo={item} onToggle={this.toggle.bind(this)}
              onDelete={this.delete.bind(this)} />
          </li>
        )
      })
    return (
      <div className="App">
        <h1>
          {this.state.user.username || '我'}的待办
          {this.state.user.id ? <button onClick={this.signOut.bind(this)}>登出</button> : null}
        </h1>
        <div className="inputWrapper">
          <TodoInput content={this.state.newTodo}
            onChange={this.changeTitle.bind(this)}
            onSubmit={this.addTodo.bind(this)} />
        </div>
        <ol className="todoList">
          {todos}
        </ol>
        {this.state.user.id ? null : <UserDialog onSignUp={this.onSignUpOrSignIn.bind(this)}
        onSignIn={this.onSignUpOrSignIn.bind(this)} />}
      </div>
    )
  }
  componetDidUpdate() {
  }

  addTodo(event) {
    this.state.todoList.push({
      id: idMaker(),
      title: event.target.value,
      status: null,
      deleted: false
    })
    this.setState({
      newTodo: '',
      todoList: this.state.todoList
    })

  }

  changeTitle(event) {
    this.setState({
      newTodo: event.target.value,
      todoList: this.state.todoList

    })
  }

  toggle(e, todo) {
    todo.status = todo.status === 'completed' ? '' : 'completed'
    this.setState(this.state)
  }
  delete(e, todo) {
    todo.deleted = true
    this.setState(this.state)
  }
  onSignUpOrSignIn(user){
    let stateCopy = json(this.state)
    stateCopy.user = user
    this.setState(stateCopy)
  }
  signOut(user){
    signOut()   
    // 此处不懂 当注册成功再登出后，刷新页面还是之前未登出的页面，加上signOut()登出就是真正登出
    let stateCopy = json(this.state)
    stateCopy.user = {}
    this.setState(stateCopy)
  }
}

export default App;

let id = 0

function idMaker() {

  id += 1
  return id
}

function json(data){
  JSON.parse(JSON.stringify(data))
}
