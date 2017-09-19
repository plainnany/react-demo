import React, { Component } from 'react'
import logo from './logo.svg'
import TodoInput from './TodoInput'
import TodoItem from './TodoItem'
import UserDialog from './UserDialog'
import {getCurrentUser,signOut,TodoModel} from './leanCloud'
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
    let user = getCurrentUser()
    if (user) {
      TodoModel.getByUser(user, (todos) => {
        let stateCopy = JSON.parse(JSON.stringify(this.state))
        stateCopy.todoList = todos
        this.setState(stateCopy)
      },(error)=>{
        console.log(error)
      })
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
        <div className="aside">
          <div className="topbar"></div>
          <div className="account">
            
            <span>{this.state.user.username || '我'}</span>
            {this.state.user.id ? <span className="icon-logout iconfont" 
            onClick={this.signOut.bind(this)}></span> : null}
          </div>
          <div className="aside-content">
            <p><span className="icon-home iconfont"></span>我的一天</p>
            <p><span className="icon-todo iconfont"></span>Todo</p>
          </div>
        </div>
        <div className="main">
          <h1>
            {this.state.user.username || '我'}的待办
           
          </h1>
          <div className="inputWrapper">
          <span className="icon-add iconfont"></span>
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
      </div>
    )
  }
  componetDidUpdate() {
  }

  addTodo(e) {
    
    let newTodo={
      title: e.target.value,
      status: '',
      deleted: false
    }
    TodoModel.create(newTodo,(id)=>{
      newTodo.id=id,
      this.state.todoList.push(newTodo),
      this.setState({
        newTodo: '',
        todoList: this.state.todoList
      })
    },(error)=>{
      console.log(error)
    })
    
  }


  changeTitle(event) {
    this.setState({
      newTodo: event.target.value,
      todoList: this.state.todoList

    })
  }

  toggle(e, todo) {
    let oldStatus = todo.status
    todo.status = todo.status === 'completed' ? '' : 'completed'
    this.setState(this.state)
    TodoModel.update(todo, () => {
      this.setState(this.state)
    }, (error) => {
      todo.status = oldStatus
      this.setState(this.state)
    })
  }
  delete(e, todo) {
    TodoModel.destroy(todo.id, () => {
      todo.deleted = true
      this.setState(this.state)
    })
  }
  onSignUpOrSignIn(user){
    let stateCopy = JSON.parse(JSON.stringify(this.state))
    stateCopy.user = user
    this.setState(stateCopy)
  }
  signOut(user){
    signOut()   
    // 此处不懂 当注册成功再登出后，刷新页面还是之前未登出的页面，加上signOut()登出就是真正登出
    let stateCopy = JSON.parse(JSON.stringify(this.state))  // 怎样封装这个函数？
    stateCopy.user = {}
    this.setState(stateCopy)
  }
}

export default App;


function json(data){
  JSON.parse(JSON.stringify(data))
  console.log(this)
}
