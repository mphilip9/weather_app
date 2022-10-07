import ReactDOM from "react-dom";
import React from "react";
import { useEffect, useState } from 'react';
import axios from 'axios'
const url = require('url');

const App = () => {
  const [weatherData, setWeatherData] = useState({})

  const fetchWeather = () => {
    axios.get('/weatherData').then(data => {
      console.log("Got data from the API call")
      console.log(data);
    }).catch(err => {
      console.log('error in the api call', err)
    })
  }

  const postWeather = () => {
    axios.post('/weatherData', { data: 'somedata' }).then(response => {
      console.log(response)
      // fetchWeather();
    }).catch(error => {
      console.log('error: ', error)
    })
  }

  useEffect(() => {
    fetchWeather()
  }, [])

  const setLocation = () => {
    axios.post('/weatherData', { data: 'somedata' }).then(response => {
      console.log(response)
    }).catch(error => {
      console.log('error: ', error)
    })
  }

  const handleInput = () => {
    console.log('input')
  }


  return (
    <div>
      <h1>Weather Moods</h1>
      <ul>
        <li>Temperature: </li>
      </ul>
      <form onSubmit={setLocation}>
        <label>City:<input type="text" name="name" onChange={handleInput} /></label>
        <label>State:<input type="text" name="name" onChange={handleInput} /></label>
        <label>Country:<input type="text" name="name" onChange={handleInput} /></label>
        <input type="submit" value="Submit" />
      </form>
    </div>
  )
}

export default App;