import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

class Hello extends Component {
  constructor(props){
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
  render() {
    return (
      <div>
        <h1>Hello, {this.props.name}</h1>
        <h2>{this.state.date.toString()}</h2>
      </div>
    );
  }
}

export default Hello;
