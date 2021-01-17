const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const axios = require("axios");

/*
YAPILMASI GEREKENLER

1) Çalışan getir
2) Çalışan ekle
3) Çalışan güncelle
4) Çalışan sil
*/

const databaseUrl = "http://localhost:3535/";
const app = express();

app.use(cors());
app.use(bodyParser.json());

//1) Çalışan Getir
app.get("/", (req, res) => {
  axios
    .get(`${databaseUrl}calisanbilgileri`)
    .then((result) => {
      res.json(result.data);
    })
    .catch((err) => {
      res.status(404).send("Kişi verilerine ulaşılamadı");
    });
});

//2) Çalışan Ekle
app.post("/", (req, res) => {});

//3) Çalışan Güncelle
app.put("/:id", (req, res) => {});

//4) Çalışan Sil
app.delete("/:id", (req, res) => {});

const port = process.env.PORT || 8888;

app.listen(port, () => {
  console.log(`StaffApi başlatıldı => http://localhost:${port}/`);
});
