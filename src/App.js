import React, { Component } from 'react'
import { fetchBackground, fetchQuote } from './api'
import './App.css'

export class App extends Component {

  constructor(props) {
    super(props)

    this.state = {
      quote: '',
      author: '',
      backgroundImage: ''
    }
  }

  async componentDidMount() {
    this.getQuote()
  }

  getQuote = async () => {
    const { quote, author, background } = await fetchQuote()

    if (quote && author && background) {
      this.setState({
        quote,
        author,
        backgroundImage: background
      })
    }
  }

  render() {

    const appStyle = {
      backgroundImage: `linear-gradient(rgba(0,0,0,0.3),rgba(0,0,0,0.3)), url('${this.state.backgroundImage}')`
    }
    return (
      <div className="App">
        <div className="background" style={appStyle}></div>
        <div className="welcomeContainer">
          <p className="clock">12:00</p>
          <p className="welcomeMessgage">Good Evening, Jenil</p>
        </div>

        <div className="quote-container">
          <p className="quote">"{this.state.quote}"</p>
          <p className="author">-{this.state.author}</p>
        </div>
      </div>
    )
  }
}

export default App
