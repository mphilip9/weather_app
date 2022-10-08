const mysql = require('mysql2/promise');
// const bluebird = require('bluebird');

const connection = mysql.createConnection({ host: 'localhost', user: 'root', database: 'weather' })



// const db = Promise.promisifyAll(connection, { multiArgs: true });

// db.connectAsync()
//   .then(() => console.log(`Connected to MySQL as id: ${db.threadId}`))
//   .then(() =>
//     // Expand this table definition as needed:
//     db.queryAsync(
//       "CREATE TABLE IF NOT EXISTS responses (id INT NOT NULL AUTO_INCREMENT PRIMARY KEY)"
//     )
//   )
//   .catch((err) => console.log(err));



const addLocation = (weatherObj) => {
  let queryString = 'insert into `weatherData` (location, temperature, description, icon, feelsLike) values (?,?,?,?,?)'
  let fields = [weatherObj.location, weatherObj.temperature, weatherObj.description, weatherObj.icon, weatherObj.feelsLike]
  return connection.then(conn => conn.query(queryString, fields))
}

const getLocationData = () => {
  let queryString = 'select id, location, temperature, description, icon, feelsLike from `weatherData`'
  return connection.then(conn => conn.query(queryString))
}

const deleteLocation = (id) => {
  let queryString = 'delete from `weatherData` where id=(?)';
  let fields = id;
  return connection.then(conn => conn.query(queryString, fields))
}

// exports.connection = connection;
module.exports.addLocation = addLocation;
module.exports.getLocationData = getLocationData;
module.exports.deleteLocation = deleteLocation;