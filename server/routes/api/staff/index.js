const express = require("express");
const axios = require("axios");

const staffApiUrl = "http://localhost:8888/";
const employmentApiUrl = "http://localhost:9876/";

/*
YAPILMASI GEREKENLER

1) Çalışan getir
2) Çalışan ekle
3) Çalışan güncelle
4) Çalışan sil
*/

const router = express.Router();

//1) Çalışan Getir
router.get("/", (req, res) => {
    axios
        .get(`${staffApiUrl}`)
        .then((result) => {
            res.json(result.data);
        })
        .catch((err) => {
            res.status(404).send("Kişi verilerine ulaşılamadı");
        });
});

//2) Çalışan Ekle
router.post("/", (req, res) => {});

//3) Çalışan Güncelle
router.put("/:id", (req, res) => {});

//4) Çalışan Sil
router.delete("/:id", (req, res) => {});

module.exports = router;