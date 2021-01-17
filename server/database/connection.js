const mysql = require("mysql");

//create connection
var db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "12345",
  database: "hastane",
});

//connect
db.connect((err) => {
  if (err) {
    console.log(err);
    throw err;
  }
  console.log(`MySql connected`);
});

module.exports = db;
