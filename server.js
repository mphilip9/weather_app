const express = require("express");
const axios = require('axios');
const { addLocation } = require('./database.js')


const app = express();        //binds the express module to 'app'
const port = 3000;

app.use(express.static(__dirname + '/./dist'))
app.use(express.json())
app.use(express.urlencoded())

app.get('/weatherData', (req, res) => {
  console.log('get request successful')
  // axios.get('https://api.openweathermap.org/data/2.5/weather?lat=44.34&lon=10.99&appid=20d000572593e79f029ffde131aab956').then(data => {
  //   console.log("Got data from the API call", data.data.weather)
  //   res.send(data.data)
  // }).catch(err => {
  //   console.log('error in the api call', err)
  // })
  // connection.then(conn => conn.query('select * from `weatherData`').then(data => {
  //   console.log(data)
  // }))
  // addLocation().then(data => {
  //   console.log(data[0]);
  // })

})

app.post('/weatherData', (req, res) => {
  console.log(req.body);
  res.send('post request successful')
  axios.get('https://api.openweathermap.org/data/2.5/weather?lat=44.34&lon=10.99&appid=20d000572593e79f029ffde131aab956').then(data => {
    console.log("Got data from the API call")
    let dbData = weatherObj(data.data);
    console.log(dbData);
    addLocation(dbData).then(data => {
      console.log(data[0]);
    })

  }).catch(err => {
    console.log('error in the api call', err)
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