import React, { Component } from 'react'
import { fetchBackground, fetchQuote, fetchWeather } from './api'
import { MdEdit } from "react-icons/md";
import './App.css'

export class App extends Component {

  constructor(props) {
    super(props)

    this.state = {
      quote: {
        quote: '',
        author: ''
      },
      background: {
        backgroundImage: '',
        user: '',
        city: '',
        country: '',
        directLink: ''
      },
      date: new Date(),
      welcomeMessage: {
        username: '',
        editUsername: true,
      },
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
    const username = localStorage.getItem('username') || ''
    const editUsername = username ? false : true
    if (username) {
      this.setState({
        welcomeMessage: {
          username,
          editUsername
        }
      })
    }

    this.getQuote()
  }

  componentWillUnmount() {
    clearInterval(this.timer);
  }

  getQuote = async () => {
    const { full, user, city, locationCountry, html } = await fetchBackground()
    const { quote, author } = await fetchQuote()
    const { name, temp, icon, main, country } = await fetchWeather()

    if (quote) {
      this.setState({
        quote: {
          quote,
          author
        },
        background: {
          backgroundImage: full,
          user,
          city,
          country: locationCountry,
          directLink: html
        }
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

    console.log(this.state)
  }

  saveUsername = (e) => {

    const username = e.target.value
    let editUsername = true

    if (e.key === 'Enter') {
      localStorage.setItem('username', this.state.welcomeMessage.username)
      editUsername = false
    }

    // Save the username to the state
    this.setState({
      welcomeMessage: { username, editUsername }
    })
  }

  getSavedUsername = () => {
    return localStorage.getItem('username', this.state.welcomeMessage.username) || ' '
  }

  editUsername = () => {
    console.log('Edit')
    this.setState({
      welcomeMessage: { editUsername: true }
    })
  }

  render() {

    const appStyle = {
      backgroundImage: `linear-gradient(rgba(0,0,0,0.15),rgba(0,0,0,0.15)), url('${this.state.background.backgroundImage}')`
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

    const welcomeMessageClassAnimation = this.getSavedUsername() && !this.state.welcomeMessage.editUsername ? 'show' : 'hide'
    const enterUsernameClassAnimation = this.getSavedUsername() && !this.state.welcomeMessage.editUsername ? 'hide' : 'show'

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
            <p>{welcomeMessgage}{this.state.welcomeMessage.username}.</p>
            <span className="editUsername" onClick={this.editUsername}><MdEdit size={20} /></span>
          </div>
          <div className={`usernameForm ${enterUsernameClassAnimation}`}>
            <label className="usernameLabel">What's your name?</label>
            <input className="username"
              type="text"
              disabled={!this.state.welcomeMessage.editUsername}
              value={this.state.welcomeMessage.username}
              onChange={this.saveUsername}
              onKeyDown={this.saveUsername} />
          </div>
        </div>

        <div className="quoteContainer">
          <p className="quote">"{this.state.quote.quote}"</p>
          <p className="author">-{this.state.quote.author}</p>
        </div>

        <div className="backgroundLocation">
          <p>{this.state.background.city}{this.state.background.country}</p>
          <a className="photographer" href={this.state.background.directLink}>{this.state.background.user}/Unsplash</a>
        </div>
      </div>
    )
  }
}

export default App
