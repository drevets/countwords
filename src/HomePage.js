import React, { Component } from 'react';

class HomePage extends Component {
  constructor() {
    super();
    this.state = {
      textInput: '',
    };
  }

  onChange = event => {
    console.log(event.target)
  }

  render() {
    return (
      <div>
        <div>I am a homepage</div>
        <input type="textarea" name="textInput" onChange={this.onChange} value={this.state.textInput}/>
        <button type='submit'>Submit</button>
      </div>
    );
  }
}

export default HomePage;
