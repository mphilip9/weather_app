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
  let queryString = 'insert into `weatherData` (temperature, description, icon, feelsLike) values (?,?,?,?)'
  let fields = [weatherObj.temperature, weatherObj.description, weatherObj.icon, weatherObj.feelsLike]
  return connection.then(conn => conn.query(queryString, fields))
}


// exports.connection = connection;
module.exports.addLocation = addLocation;