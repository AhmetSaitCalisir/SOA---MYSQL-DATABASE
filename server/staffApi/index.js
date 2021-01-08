const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");

const axios = require("axios");

const app = express();

app.use(cors());
app.use(bodyParser.json());

app.get("/", (req, res) => {
  res.send("H1 B1TCHES I'M STAFFAPI");
});

const databaseUrl = "http://localhost:3535/";

app.get("/employees", (req, res) => {
  axios.get(databaseUrl).then((data) => {
    res.json(data.data);
  });
});

app.post("/employees", (req, res) => {
  const employe = {
    id: req.body.id,
    isim: req.body.isim,
  };
  employees.push(employe);
  res.send("Eklendi");
});

const port = process.env.PORT || 8888;

app.listen(port, () => {
  console.log(`StaffApi başlatıldı => http://localhost:${port}/`);
});
