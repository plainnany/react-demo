import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

class Hello extends Component {
  constructor(props) {
    super(props)
    this.state = {
      date: new Date()
    }
    setInterval(()=>{ 
      this.state = {
        date: new Date() // 更新 date
      }
    })
  }
  componentWillMount() {
    console.log('下一步运行 render ')
  }
  render() {
    console.log('这里是 render')
    return (
      <div>
        <h1>Hello, {this.props.name}</h1>
        <h2>{this.state.date.toString()}</h2>
      </div>
    )
  }
  componentDidMount(){
    console.log('已经挂载到页面里了')
  }

}

export default Hello;
