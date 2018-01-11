import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import busStop from './icon.png'

class App extends Component {

  addGps=() => {
    console.log("hello")
  }
  render() {
    return (
      <div>
       <h1>project</h1>
       <button onClick={()=>{this.addGps()}}>snap to road</button>
      </div>
    );
  }
}

export default App;
