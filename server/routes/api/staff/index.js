const express = require("express");
const axios = require("axios");

/*
YAPILMASI GEREKENLER

1) Çalışan getir
2) Çalışan ekle
3) Çalışan güncelle
4) Çalışan sil
*/

const router = express.Router();

router.get("/", (req, res) => {
  res.send("MERHABA STAFF");
});

router.get("/employees", (req, res) => {
  axios.get("http://localhost:8888/employees").then((data) => {
    res.json(data.data);
  });
});

router.post("/employees", (req, res) => {
  axios.post("http://localhost:8888/employees", req.body).then((data) => {
    res.send("Eklendi");
  });
});

module.exports = router;
