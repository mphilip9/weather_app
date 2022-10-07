const express = require("express");



const app = express();        //binds the express module to 'app'
const port = 3000;

app.use(express.static(__dirname + '/./dist'));
app.use(express.json());

app.listen(port, function () {
  console.log(`SERVER STARTED ON localhost:${port}`);
})