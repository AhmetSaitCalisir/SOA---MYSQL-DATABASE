const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(bodyParser.json());

app.get("/", (req, res) => {
  res.send("H1 B1TCHES I'M EMLOYMENT");
});

const port = process.env.PORT || 9876;

app.listen(port, () => {
  console.log(`EmploymentApi başlatıldı => http://localhost:${port}/`);
});
