import React, { Component } from 'react';
import './App.css';
import Home from './template/Home.js';
import Dashboard from './template/Dashboard.js';
import { Switch, Route } from 'react-router';
import { BrowserRouter, Redirect } from 'react-router-dom';

class App extends Component {
  constructor(){
    super();
    this.state = {

    };
  }

  render() {
    let route = (
      <Switch>
        <Redirect from="/dashboard/:id" to="/dashboard" />
        <Route path="/dashboard" component={Dashboard} />
        <Route exact path="/" component={Home} />
        <Redirect to={{ pathname:'/' }} />
      </Switch>
    )
    return (
      <BrowserRouter>
        {route}
      </BrowserRouter>
    );
  }
}

export default App;
