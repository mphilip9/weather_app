import ReactDOM from "react-dom"
import React from "react"
import '../styles.css';
import { faHome } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useEffect, useState } from 'react'
import Cities from './Cities.js';
import axios from 'axios'
const url = require('url')

const App = () => {
  const [weatherData, setWeatherData] = useState([{ location: '', temperature: '', feelsLike: '', description: '', icon: '' }])
  const [searchState, setSearchState] = useState('')
  const [city, setCity] = useState('')
  const [country, setCountry] = useState('')

  const fetchWeather = () => {
    axios.get('/weatherData').then(data => {
      console.log("Got data from the API call")
      console.log(data.data);
      setWeatherData(data.data)
    }).catch(err => {
      console.log('error in the api call', err)
    })
  }
  useEffect(() => {
    fetchWeather()

  }, [])

  const setLocation = () => {
    event.preventDefault()
    const weatherDB = { city: city, state: searchState, country: country }
    axios.post('/weatherData', weatherDB).then(response => {
      console.log(response)
      fetchWeather();
    }).catch(error => {
      console.log('error: ', error)
    })
    setCity('')
    setCountry('')
    setSearchState('')
  }

  const handleCity = (event) => {
    console.log(city)
    setCity(event.target.value);
  }

  const handleCountry = (event) => {
    console.log(country)
    setCountry(event.target.value);
  }

  return (
    <>
      <div id="title">
        <h1>Weather Moods</h1>
      </div>
      <div id="search-form">
        <form onSubmit={setLocation}>
          <label>City:<input type="text" name="name" onChange={handleCity} /></label>
          <select onChange={(event) => { setSearchState(event.target.value) }}>
            <option value="AL">Alabama</option>
            <option value="AK">Alaska</option>
            <option value="AZ">Arizona</option>
            <option value="AR">Arkansas</option>
            <option value="CA">California</option>
            <option value="CO">Colorado</option>
            <option value="CT">Connecticut</option>
            <option value="DE">Delaware</option>
            <option value="DC">District Of Columbia</option>
            <option value="FL">Florida</option>
            <option value="GA">Georgia</option>
            <option value="HI">Hawaii</option>
            <option value="ID">Idaho</option>
            <option value="IL">Illinois</option>
            <option value="IN">Indiana</option>
            <option value="IA">Iowa</option>
            <option value="KS">Kansas</option>
            <option value="KY">Kentucky</option>
            <option value="LA">Louisiana</option>
            <option value="ME">Maine</option>
            <option value="MD">Maryland</option>
            <option value="MA">Massachusetts</option>
            <option value="MI">Michigan</option>
            <option value="MN">Minnesota</option>
            <option value="MS">Mississippi</option>
            <option value="MO">Missouri</option>
            <option value="MT">Montana</option>
            <option value="NE">Nebraska</option>
            <option value="NV">Nevada</option>
            <option value="NH">New Hampshire</option>
            <option value="NJ">New Jersey</option>
            <option value="NM">New Mexico</option>
            <option value="NY">New York</option>
            <option value="NC">North Carolina</option>
            <option value="ND">North Dakota</option>
            <option value="OH">Ohio</option>
            <option value="OK">Oklahoma</option>
            <option value="OR">Oregon</option>
            <option value="PA">Pennsylvania</option>
            <option value="RI">Rhode Island</option>
            <option value="SC">South Carolina</option>
            <option value="SD">South Dakota</option>
            <option value="TN">Tennessee</option>
            <option value="TX">Texas</option>
            <option value="UT">Utah</option>
            <option value="VT">Vermont</option>
            <option value="VA">Virginia</option>
            <option value="WA">Washington</option>
            <option value="WV">West Virginia</option>
            <option value="WI">Wisconsin</option>
            <option value="WY">Wyoming</option>
          </select>
          <label>  Country:<input placeholder="USA" type="text" name="name" onChange={handleCountry} id="country-input" /></label>
          <input type="submit" value="Search" id="search-button" />
        </form>
      </div>


      <Cities weatherData={weatherData} />
    </>
  )
}

export default App;