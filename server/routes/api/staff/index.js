const express = require("express");
const axios = require("axios");

const staffApiUrl = "http://localhost:8888/";
const employmenApiUrl = "http://localhost:9876/";

/*
YAPILMASI GEREKENLER

1) Çalışan getir
2) Çalışan ekle
3) Çalışan güncelle
4) Çalışan sil
*/

const router = express.Router();

//1) Çalışan Getir
router.get("/", (req, res) => {});

//2) Çalışşan Ekle
router.post("/", (req, res) => {});

//3) Çalışan Güncelle
router.put("/:id", (req, res) => {});

//4) Çalışan Sil
router.delete("/:id", (req, res) => {});

module.exports = router;
