import React, { Component } from 'react'
import { fetchQuote, fetchWeather } from './api'
import { MdEdit } from "react-icons/md";
import './App.css'

export class App extends Component {

  constructor(props) {
    super(props)

    this.state = {
      quote: '',
      author: '',
      backgroundImage: '',
      username: '',
      date: new Date(),
      editUsername: true,
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

    // Start the timer
    this.timer = setInterval(
      () => this.setState({ date: new Date() }),
      1000
    );

    // Get the username from localstorage
    const username = localStorage.getItem('username')
    if (username) {
      this.setState({
        username,
        editUsername: false
      })
    }

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

  saveUsername = (e) => {
    // Save the username to the state
    this.setState({
      username: e.target.value
    })
    if (e.key === 'Enter') {
      // Save
      localStorage.setItem('username', this.state.username)
      this.setState({
        editUsername: false
      })
    }
  }

  getSavedUsername = () => {
    return localStorage.getItem('username', this.state.username)
  }

  editUsername = () => {
    console.log('Edit')
    this.setState({
      editUsername: true
    })
  }

  render() {

    const appStyle = {
      backgroundImage: `linear-gradient(rgba(0,0,0,0.3),rgba(0,0,0,0.3)), url('${this.state.backgroundImage}')`
    }

    const currentTime = this.state.date.toLocaleTimeString([], { hour: 'numeric', minute: '2-digit', second: '2-digit' })
      .replace("AM", "")
      .replace("PM", "")

    const welcomeMessgage = this.state.date.getHours() >= 13
      ? 'Good evening, '
      : (
        this.state.date.getHours() >= 12
          ? 'Good afternoon, '
          : 'Good morning, '
      )

    const welcomeMessageClassAnimation = this.getSavedUsername() && !this.state.editUsername ? 'show' : 'hide'
    const enterUsernameClassAnimation = this.getSavedUsername() && !this.state.editUsername ? 'hide' : 'show'

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
          <div className={`welcomeMessage  ${welcomeMessageClassAnimation}`}>
            <p>{welcomeMessgage}{this.state.username}.</p>
            <span className="editUsername" onClick={this.editUsername}><MdEdit size={20} /></span>
          </div>
          <div className={`usernameForm ${enterUsernameClassAnimation}`}>
            <label className="usernameLabel">What's your name?</label>
            <input className="username" type="text" disabled={!this.state.editUsername} value={this.state.username} onChange={this.saveUsername} onKeyDown={this.saveUsername} />
          </div>
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
