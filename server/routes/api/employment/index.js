const express = require("express");
const axios = require("axios");

const staffApiUrl = "http://localhost:8888/";
const employmentApiUrl = "http://localhost:9876/";

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

const router = express.Router();

router.get("/", (req, res) => {});

//1) Nöbet Getir
router.get("/watch", (req, res) => {
  axios
    .get(`${employmentApiUrl}/watch`)
    .then((result) => {
      res.json(result.data);
    })
    .catch((err) => {
      res.status(404).send("Nöbet verilerine ulaşılamadı");
    });
});

//2) Nöbet Ata
router.post("/watch", (req, res) => {});

//3) Nöbet Güncelle
router.put("/watch/:id", (req, res) => {});

//4) Nöbet Sil
router.delete("/watch/:id", (req, res) => {});

//5) Ameliyat Getir
router.get("/operation", (req, res) => {
  axios
    .get(`${employmentApiUrl}/oparation`)
    .then((result) => {
      res.json(result.data);
    })
    .catch((err) => {
      res.status(404).send("Ameliyat verilerine ulaşılamadı");
    });
});

//6) Ameliyat Ata
router.post("/operation", (req, res) => {});

//7) Ameliyat Güncelle
router.put("/operation/:id", (req, res) => {});

//8) Ameliyat Sil
router.delete("/operation/:id", (req, res) => {});

module.exports = router;
