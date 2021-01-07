const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(bodyParser.json());

const denemeVeriTabani = [
  { id: 1, isim: "Nil Güreşçi" },
  { id: 2, isim: "Ahmet Sait Çalışır" },
];

app.get("/", (req, res) => {
  res.json(denemeVeriTabani);
});

const port = process.env.PORT || 3535;

app.listen(port, () => {
  console.log(`Database başlatıldı => http://localhost:${port}/`);
});
