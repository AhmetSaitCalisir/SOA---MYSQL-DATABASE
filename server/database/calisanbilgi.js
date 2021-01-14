const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
/*
const mysql = require('mysql');

//create connection
var db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "12345",
    database: "hastane"
});

//connect
db.connect((err) => {
    if (err) throw err;
    console.log(`MySql connected`);
});
  
*/

var db = require('./connection');

const router = express.Router();

//list calisanlar
router.get('/', (req, res) => { //çalışanları listele
    let sql = 'select c.Ad,c.Soyad,u.UnvanAdi,b.BirimAd from (calisanbilgi c join birimler b on b.BirimID=c.birimID) join unvan u on u.UnvanID=c.unvanID';
    let query = db.query(sql, (err, results) => {
        if (err) throw err;
        console.log('Tüm çalışanlar listelendi');
        res.json(results);

    });

});

//id ile calisan getir
router.get('/id/:id', (req, res) => {
    let sql = `select c.Ad,c.Soyad,u.UnvanAdi,b.BirimAd,k.TcNo,k.Ilce,k.Il,k.AnneAdi,k.BabaAdi,k.Uyruk,k.SeriNo from 
    (((calisanbilgi c join birimler b on b.BirimID=c.BirimID) 
    join unvan u on u.UnvanID=c.UnvanID) 
    join kimlikbilgileri k on k.CalisanID=c.CalisanID) where c.CalisanID=${req.params.id}`;
    let query = db.query(sql, (err, results) => {
        if (err) throw err;
        console.log(`${req.params.id} id li çalışan getirildi`);
        res.json(results);

    });

});


//calisan ekle
router.post('/ekle', (req, res) => {

    let calisan = {};
    let sqlUnvanID = `SELECT UnvanID FROM unvan where UnvanAdi='${req.body.UnvanAdi}'`;
    db.query(sqlUnvanID, (err, results) => {
        if (err) {
            console.log(err);
        }
        calisan.UnvanID = results;
        console.log(calisan.UnvanID);
    });
    let sqlBirimID = `SELECT BirimID FROM birimler where BirimAd Like '%${req.body.BirimAd}%';`;
    db.query(sqlBirimID, (err, results) => {
        if (err) {
            console.log(err);
        }
        calisan.BirimID = results;
        console.log(calisan.BirimID);
    });
    res.send('kisi eklendi');
    console.log('bitti');
    /*
    let sql = `INSERT INTO calisanbilgi (Ad, Soyad, UnvanID,BirimID) values ('${req.body.Ad}','${req.body.Soyad}','${calisan.UnvanID}','${calisan.BirimID}')`;
    db.query(sql, (err, results) => {
        if (err) {
            console.log(err);
        }
        console.log(results);
    });   */

});




module.exports = router;