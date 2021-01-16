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
router.get('/doktorsecimi/:birimadi', (req, res) => {
    let sql = `select cb.Ad from (birimler b join calisanbilgi cb on cb.BirimID=b.BirimID) where b.BirimAd='${req.params.id}' and cb.UnvanID='1'`;
    let query = db.query(sql, (err, results) => {
        if (err) throw err;
        console.log('doktor seciniz');
        res.json(results);

    });
});

//ameliyat kaydı oluşturma
router.post('/ekle', (req, res) => {
    let bilgi = {};
    let sql = `select cb.CalisanID,b.BirimID  from calisanbilgi cb,birimler b where b.BirimAD='${req.body.BirimAd}' and cb.Ad='${req.body.Ad}' `;
    db.query(sql, (err, result) => {
        if (err) throw err;

        bilgi.BirimID = result[0].BirimID;
        bilgi.CalisanID = result[0].CalisanID;
        console.log('calisanID:', bilgi.CalisanID);
        console.log('birimID:', bilgi.BirimID);

        let sqlEkle = `insert into ameliyatlar (AmeliyatTarih,AmeliyatAciklama,doktorID,birimID) values ('${req.body.Tarih}','${req.body.Aciklama}',${bilgi.CalisanID},${bilgi.BirimID})`;
        db.query(sqlEkle, (err, result) => {
            if (err) throw err;
            console.log('ameliyat kaydı oluşturuldu.');
        })

    })

})


module.exports = router;