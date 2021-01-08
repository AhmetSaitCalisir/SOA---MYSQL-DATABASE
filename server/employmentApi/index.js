const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const axios = require("axios");

/*
YAPILMASI GEREKENLER

1) Nöbet getir
2) Nöbet ata
3) Nöbet güncelle
4) Nöbet sil
5) Ameliyat getir
6) Ameliyat ata
7) Ameliyat güncelle
8) Ameliyat sil
*/

const databaseUrl = "http://localhost:3535/";
const app = express();

app.use(cors());
app.use(bodyParser.json());

app.get("/", (req, res) => {});

//1) Nöbet Getir
app.get("/watch", (req, res) => {});

//2) Nöbet Ata
app.post("/watch", (req, res) => {});

//3) Nöbet Güncelle
app.put("/watch/:id", (req, res) => {});

//4) Nöbet Sil
app.delete("/watch/:id", (req, res) => {});

//5) Ameliyat Getir
app.get("/operation", (req, res) => {});

//6) Ameliyat Ata
app.post("/operation", (req, res) => {});

//7) Ameliyat Güncelle
app.put("/operation/:id", (req, res) => {});

//8) Ameliyat Sil
app.delete("/operation/:id", (req, res) => {});

const port = process.env.PORT || 9876;

app.listen(port, () => {
  console.log(`EmploymentApi başlatıldı => http://localhost:${port}/`);
});
