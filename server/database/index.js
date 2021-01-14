const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const calisanbilgi = require('./calisanbilgi');
const login = require('./login');
const operation = require('./operation');
const watch = require('./watch');
const dayoff = require('./dayoff');
/*
const mysql = require('mysql');


//create connection
var db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "12345",
    database: "hastane"
});

//connect
db.connect((err) => {
    if (err) {
        throw err;
    }
    console.log(`MySql connected`);
});

*/

const app = express();

app.use(cors());
app.use(bodyParser.json());

app.get("/", (req, res) => {
    res.send('okey');
});

app.use("/calisanbilgileri", calisanbilgi);

app.use('/login', login);

app.use('/operation', operation);

app.use('/watch', watch);


app.use('/dayoff', dayoff);

const port = process.env.PORT || 3535;

app.listen(port, () => {
    console.log(`Database başlatıldı => http://localhost:${port}/`);
});