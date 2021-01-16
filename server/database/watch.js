const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

var db = require('./connection');

const router = express.Router();

//nobetler listesi
router.get('/list', (req, res) => {
    let sql = `select * from nobetListele`
    let query = db.query(sql, (err, results) => {
        if (err) throw err;
        console.log('Tüm nobetler listelendi');
        res.json(results);
    });
});

//tarih seçerek nöbet getir
router.post('/byDate', (req, res) => {
    let nbilgi = {};
    let sqlIn = `call NobetTarih_KisiBilgisi('${req.body.Tarih}',@CalisanID,@Ad,@Soyad,@BirimAd)`;
    let sqlOut = `select @CalisanID ,@Ad ,@Soyad ,@BirimAd `;
    db.query(sqlIn, (err, results) => {
        if (err) throw err;
        console.log('Nöbet tarihi seçildi');
        //res.json(results);
    });

    db.query(sqlOut, (err, results) => {
        if (err) throw err;
        nbilgi.CalisanID = results[0].CalisanID;
        nbilgi.Ad = results[0].Ad;
        nbilgi.Soyad = results[0].Soyad;
        nbilgi.BirimAd = results[0].BirimAd;
        console.log('nobet getirildi');
        res.json(results[0]);
    });
})

//unvangönder
router.get('/unvansecimi', (req, res) => {
    let sql = `select UnvanAdi,UnvanID from unvan`;
    let query = db.query(sql, (err, results) => {
        if (err) throw err;
        console.log('unvan seciniz');
        res.json(results);

    });
})

//çalışanları gönder
router.get('/calisansecimi/birimler/:birimadi/unvanlar/:unvanadi', (req, res) => {
    let calisan = {};
    let sql = `select cb.Ad,cb.CalisanID from ((birimler b join calisanbilgi cb on cb.BirimID=b.BirimID) join unvan u on u.UnvanID=cb.UnvanID) where b.BirimAd LIKE '%${req.params.birimadi}%' and u.UnvanAdi LIKE'%${req.params.unvanadi}%'`;
    db.query(sql, (err, results) => {
        if (err) throw err;
        console.log('calisan seciniz');
        //var resultArray = Object.values(JSON.parse(JSON.stringify(result)));
        //calisan.Ad = resultArray[0].Ad;
        //console.log(calisan.Ad);
        res.json(results);

    });

});

//nöbet oluştur








module.exports = router;