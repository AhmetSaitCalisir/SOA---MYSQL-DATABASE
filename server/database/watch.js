const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");

var db = require("./connection");

const router = express.Router();

//nobetler listesi
router.get("/list", (req, res) => {
  let sql = `select * from nobetListele`;
  let query = db.query(sql, (err, results) => {
    if (err) throw err;
    console.log("Tüm nobetler listelendi");
    res.json(results);
  });
});

//tarih seçerek nöbet getir
router.post("/byDate", (req, res) => {
  let nbilgi = {};
  let sqlIn = `call NobetTarih_KisiBilgisi('${req.body.Tarih}',@CalisanID,@Ad,@Soyad,@BirimAd)`;
  let sqlOut = `select @CalisanID ,@Ad ,@Soyad ,@BirimAd `;
  db.query(sqlIn, (err, results) => {
    if (err) throw err;
    console.log("Nöbet tarihi seçildi");
    //res.json(results);
  });

  db.query(sqlOut, (err, results) => {
    if (err) throw err;
    nbilgi.CalisanID = results[0].CalisanID;
    nbilgi.Ad = results[0].Ad;
    nbilgi.Soyad = results[0].Soyad;
    nbilgi.BirimAd = results[0].BirimAd;
    console.log("nobet getirildi");
    res.json(results[0]);
  });
});

//çalışanları gönder

//nöbet oluştur

module.exports = router;
