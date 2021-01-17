const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");

var db = require("./connection");

const router = express.Router();

//oturum açma için tc kimlik no ve password kontrolü

//login+
router.post("/", (req, res) => {
  let sqlUnvanID = `select * from yonetici y join kimlikbilgileri kb on y.CalisanID=kb.CalisanID where y.sifre='${req.body.Sifre}' and kb.TcNo='${req.body.TcNo}'`;
  db.query(sqlUnvanID, (err, results) => {
    if (err) {
      console.log(err);
    }
    if (results.length < 1) {
      res.send(false);
    } else {
      res.json(results);
    }
  });
});

module.exports = router;
