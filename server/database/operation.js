const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

var db = require('./connection');

const router = express.Router();

//tum ameliyatlar listesi
router.get('/list', (req, res) => {
    let sql = `select * from ameliyatListele`
    let query = db.query(sql, (err, results) => {
        if (err) throw err;
        console.log('Tüm ameliyatlar listelendi');
        res.json(results);

    });
});

//ameliyat atama
//birim gönder
router.get('/birimsecimi', (req, res) => {
    let sql = `select BirimAd from birimler`;
    let query = db.query(sql, (err, results) => {
        if (err) throw err;
        console.log('birim seciniz');
        res.json(results);

    });
});

//doktor gönder
router.post('/doktorsecimi', (req, res) => {
    let sql = `select cb.Ad from (birimler b join calisanbilgi cb on cb.BirimID=b.BirimID) where b.BirimAd='${req.body.BirimAd}'`;
    let query = db.query(sql, (err, results) => {
        if (err) throw err;
        console.log('doktor seciniz');
        res.json(results);

    });
});

//ameliyat kaydı oluşturma


module.exports = router;