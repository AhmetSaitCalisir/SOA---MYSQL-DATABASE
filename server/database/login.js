const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

var db = require('./connection');

const router = express.Router();

//oturum açma için tc kimlik no ve password kontrolü

//login
router.post('/', (req, res) => {
    let sqlUnvanID = `select * from yonetici y,kimlikbilgileri kb,calisanbilgi where kb.TcNo='${req.body.TcNo}'and y.Sifre='${req.body.Sifre}'`;
    db.query(sqlUnvanID, (err, results) => {
        if (err) {
            console.log(err);
        }
        res.json(results);
        console.log(results);
        console.log('tc ve sifre doğru girildi');
    });
});

module.exports = router;