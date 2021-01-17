const express = require("express");

var db = require("./connection");

const router = express.Router();

//tum ameliyatlar listesi+
router.get("/list", (req, res) => {
  let sql = `select * from ameliyatListele`;
  let query = db.query(sql, (err, results) => {
    if (err) throw err;
    console.log("Tüm ameliyatlar listelendi");
    res.json(results);
  });
});

//Id ile ameliyat getir
router.get("/list/ameliyatId/:id", (req, res) => {
  let sql = `select cb.Ad,cb.Soyad,b.BirimAd,a.AmeliyatTarih,a.AmeliyatAciklama,cb.CalisanID,a.ameliyatID
  from ((ameliyatlar a join birimler b on a.birimID=b.BirimID) join calisanbilgi cb on cb.CalisanID=a.doktorID) where a.ameliyatID=${req.params.id}`;
  let query = db.query(sql, (err, results) => {
    if (err) throw err;
    console.log(`${req.params.id} id li ameliyat getirildi`);
    res.json(results);
  });
});

//ameliyat kaydı oluşturma+
router.post("/ekle", (req, res) => {
  let bilgi = {};
  let sql = `select cb.CalisanID,b.BirimID  from calisanbilgi cb,birimler b where b.BirimAD='${req.body.BirimAd}' and cb.Ad='${req.body.Ad}' `;
  db.query(sql, (err, result) => {
    if (err) throw err;
    bilgi.BirimID = result[0].BirimID;
    bilgi.CalisanID = result[0].CalisanID;
    console.log("calisanID:", bilgi.CalisanID);
    console.log("birimID:", bilgi.BirimID);
    let sqlEkle = `insert into ameliyatlar (AmeliyatTarih,AmeliyatAciklama,doktorID,birimID) values ('${req.body.Tarih}','${req.body.Aciklama}',${bilgi.CalisanID},${bilgi.BirimID})`;
    db.query(sqlEkle, (err, result) => {
      if (err) throw err;
      console.log("ameliyat kaydı oluşturuldu.");
    });
  });
});

//ameliyat sil
router.delete("/delete/:id", (req, res) => {
  let sql = `delete from ameliyatlar where ameliyatID=${req.params.id}`;
  db.query(sql, (err, result) => {
    if (err) throw err;
    console.log("Ameliyat kaydı silindi.");
  });
});

module.exports = router;
