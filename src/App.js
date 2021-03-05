import React, { Component } from 'react'
import { fetchAdvice } from './api'
import './App.css'

export class App extends Component {

  constructor(props) {
    super(props)

    this.state = {
      advice: ''
    }
  }

  async componentDidMount() {
    this.getAdvice()
  }

  getAdvice = async () => {
    const advice = await fetchAdvice()
    this.setState({
      advice: advice
    })
  }



  render() {
    return (
      <div>
        <h4>{this.state.advice}</h4>
      </div>
    )
  }
}

export default App
