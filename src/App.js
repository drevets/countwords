import React, { Component } from 'react';
import HomePage from './HomePage'
import logo from './logo.svg';
import './App.css';

class App extends Component {

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Let's Count Some Words!</h1>
        </header>
          <HomePage/>
      </div>
    );
  }
}

export default App;
