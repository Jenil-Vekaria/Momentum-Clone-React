import React, { Component } from 'react'
import { fetchQuote, fetchWeather } from './api'
import './App.css'

export class App extends Component {

  constructor(props) {
    super(props)

    this.state = {
      quote: '',
      author: '',
      backgroundImage: '',
      weather: {
        city: '',
        country: '',
        temp: '',
        icon: '',
        description: ''
      }
    }
  }

  async componentDidMount() {
    this.getQuote()
  }

  getQuote = async () => {
    const { quote, author, background } = await fetchQuote()
    const { name, temp, icon, main, country } = await fetchWeather()

    if (quote) {
      this.setState({
        quote,
        author,
        backgroundImage: background
      })
    }

    if (name) {
      this.setState({
        weather: {
          city: name,
          country,
          temp,
          icon,
          description: main
        }
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

        <div className="weatherContainer">
          <div className="temperatureContainer">
            <img src={this.state.weather.icon} alt="weather icon" />
            <h2 className="temperature">{Math.floor(this.state.weather.temp)}&deg;</h2>
          </div>
          <h3 className="weatherDescription">{this.state.weather.description}</h3>
          <h4 className="city">{this.state.weather.city}, {this.state.weather.country}</h4>
        </div>

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
