import React, { Component } from 'react';
import HomePage from './HomePage'
import logo from './logo.svg';
import './App.css';

class App extends Component {
  // state = {
  //   response: ''
  // };

  // componentDidMount() {
  //   this.callApi()
  //     .then(res => this.setState({ response: res.express }))
  //     .catch(err => console.log(err));
  // }

  // callApi = async () => {
  //   const response = await fetch('/api/countwords');
  //   const body = await response.json();

  //   if (response.status !== 200) throw Error(body.message);

  //   return body;
  // };

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
