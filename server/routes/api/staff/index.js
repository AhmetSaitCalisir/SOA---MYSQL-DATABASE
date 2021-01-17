const express = require("express");
const axios = require("axios");

const staffApiUrl = "http://localhost:8888/";
const employmentApiUrl = "http://localhost:9876/";

/*

YAPILMASI GEREKENLER

1-Tüm çalışanları listele 
2-Id ile çalışanları listele 
3-Çalışan ekle 
4-Çalışan güncelle 
5-Çalışan sil 
6-Ünvan listele 
7-Birim adı ve ünvana göre çalışan listele 
8-Birim adına göre doktor listele 
9-oturum açma 
*/

const router = express.Router();

module.exports = router;
