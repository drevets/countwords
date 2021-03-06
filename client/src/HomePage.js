import React, { Component } from 'react';
import {connect} from 'react-redux'
import {extractTextFromFile} from './store/analysis'

class HomePage extends Component {
  constructor() {
    super();
    this.state = {
      textInput: '',
      textTitle: ''
    };
    this.fileInput = React.createRef()
  }

  handleChange = event => {
    console.log({[event.target.name]: event.target.value})
    this.setState({[event.target.name]: event.target.value})
  };

  handleSubmit = event => {
    alert('Thanks for submitting!')
    event.preventDefault()
    this.setState({textInput: '', textTitle: ''})
  }

  placeFileContent = (target, file) => {
    // readFileContent(file).then(content => {
    //   target.value = content
    // }).catch(error => console.log(error))
  }

  handleFileSubmit = event => {
  //   const reader = new FileReader();
  //   return new Promise ((resolve, reject) => {
  //     reader.onload = event => resolve(event.target.result)
  //     reader.onerror = error => reject(error)
  //     reader.readAsText(this.fileInput.current.files[0])
  //   })
  //   console.log('user submitted a file')
  //   alert(`Selected file = ${
  //     this.fileInput.current.files[0].name
  //   }`
  // );
  // console.log(this.fileInput.current.files[0])
  // event.preventDefault();
  }

  handleFileChange = async event => {
    const file = this.fileInput.current.files[0]
    const objectURL = window.URL.createObjectURL(file);
    await this.props.extractText(objectURL)
    const reader = new FileReader()
    reader.onload = event => {
      console.log(event.target.result)
    }
    reader.readAsText(file, "UTF-8")
  }

  render() {
    return (
      <div>
        <form onSubmit={this.handleSubmit}>
          <label>
            Paste your text here:
            <input
              type="textarea"
              name='textInput'
              onChange={this.handleChange}
              value={this.state.textInput}
            />
          </label>
          <label>
            Give your text a title:
            <input
            type='text'
            name='textTitle'
            onChange={this.handleChange}
            value={this.state.textTitle}
            />
            </label>
          <button type="submit">Submit</button>
        </form>
        Or, you can upload a file
        <form onSubmit={this.handleFileSubmit}>
          <label>
            Choose a file
            <input
              type='file'
              ref={this.fileInput}
              onChange={this.handleFileChange}
            />
          </label>
          <button type='submit'>Submit</button>
        </form>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {}
}

const mapDispatchToProps = dispatch => {
  return {
    extractText: objectURL => dispatch(extractTextFromFile(objectURL))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(HomePage);
