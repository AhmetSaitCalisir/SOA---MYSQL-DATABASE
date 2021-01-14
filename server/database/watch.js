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

//nöbet oluştur




module.exports = router;