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
      date: new Date(),
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
    this.timer = setInterval(
      () => this.setState({ date: new Date() }),
      1000
    );

    this.getQuote()
  }

  componentWillUnmount() {
    console.log('clear')
    clearInterval(this.timer);
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

    const currentTime = this.state.date.toLocaleTimeString([], { hour: 'numeric', minute: '2-digit', second: '2-digit' })
      .replace("AM", "")
      .replace("PM", "")

    const welcomeMessgage = this.state.date.getHours() >= 13
      ? 'Good Evening, '
      : (
        this.state.date.getHours() >= 12
          ? 'Good Afternoon, '
          : 'Good Morning, '
      )

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
          <p className="clock">{currentTime}</p>
          <p className="welcomeMessgage">{welcomeMessgage}Jenil</p>
        </div>

        <div className="quoteContainer">
          <p className="quote">"{this.state.quote}"</p>
          <p className="author">-{this.state.author}</p>
        </div>
      </div>
    )
  }
}

export default App
