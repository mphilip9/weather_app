const express = require("express");
const axios = require('axios');
const { addLocation, getLocationData, deleteLocation } = require('./database.js')


const app = express();        //binds the express module to 'app'
const port = 3000;

app.use(express.static(__dirname + '/./dist'))
app.use(express.json())
app.use(express.urlencoded())

app.get('/weatherData', (req, res) => {
  console.log('get request successful')
  // axios.get('http://api.openweathermap.org/geo/1.0/direct?q=trenton,nj,usa&limit=4&appid=20d000572593e79f029ffde131aab956').then(data => {
  //   console.log(data);
  // }).catch(error => {
  //   console.log(error)
  // })
  getLocationData().then(data => {
    // console.log('inside app.get', data[0])
    res.send(data[0])
  })

})

app.post('/weatherData', (req, res) => {
  let city = req.body.city.toLowerCase();
  let state = req.body.state;
  let country = req.body.country.toLowerCase();
  axios.get(`http://api.openweathermap.org/geo/1.0/direct?q=${city},${state},${country}&limit=1&appid=20d000572593e79f029ffde131aab956`).then(data => {
    console.log(data.data[0].lat);
    axios.get(`https://api.openweathermap.org/data/2.5/weather?lat=${data.data[0].lat}&lon=${data.data[0].lon}&appid=20d000572593e79f029ffde131aab956`).then(data => {
      console.log("Got data from the API call")
      let dbData = weatherObj(data.data);
      console.log(dbData);
      state ? dbData.location = `${city}, ${state}` : dbData.location = `${city}`
      addLocation(dbData).then(data => {
        console.log(data[0]);
      })
      res.send('post request successful')
    }).catch(err => {
      console.log('error in the api call', err)
    })
  }).catch(error => {
    console.log(error)
  })
  // res.send('temp, delete me')
})

app.delete('/weatherData', (req, res) => {
  console.log(req.body);
  let id = req.body.id;
  deleteLocation(id).then(data => {
    console.log('delete successful')
    res.send('delete successful')
  }).catch(error => {
    console.log('error in delete', error)
  })
})

app.listen(port, function () {
  console.log(`SERVER STARTED ON localhost:${port}`);
})

const weatherObj = (data) => {
  let weather = {
    temperature: (Math.floor((data.main.temp - 273.15) * 9 / 5 + 32)),
    description: data.weather[0].description,
    feelsLike: (Math.floor((data.main.feels_like - 273.15) * 9 / 5 + 32)),
    icon: data.weather[0].icon,
  }
  return weather;
}