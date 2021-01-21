const express = require("express");

var db = require("./connection");

const router = express.Router();

//nobetler listesi+
router.get("/list", (req, res) => {
    let sql = `select * from nobetListele`;
    let query = db.query(sql, (err, results) => {
        if (err) throw err;
        console.log("Tüm nobetler listelendi");
        res.json(results);
    });
});

//Id ile nöbet getir+
router.get("/list/id/:id", (req, res) => {
    let sql = `select cb.Ad,cb.Soyad,b.BirimAd,u.UnvanAdi,n.nobetTarih,cb.CalisanID,n.calisanID from
  (((nobetler n JOIN birimler b ON b.birimID =n.BirimID) JOIN calisanbilgi cb ON cb.CalisanID = n.calisanID)
         JOIN unvan u ON cb.UnvanID = u.UnvanID) where cb.CalisanID=${req.params.id}`;
    let query = db.query(sql, (err, results) => {
        if (err) throw err;
        console.log(`${req.params.id} id li çalışan ve nöbet bilgileri getirildi`);
        res.json(results);
    });
});

//tarih seçerek nöbet getir+
router.post("/byDate", (req, res) => {
    let nbilgi = {};
    let sqlIn = `call NobetTarih_KisiBilgisi('${req.body.Tarih}',@CalisanID,@Ad,@Soyad,@BirimAd)`;
    let sqlOut = `select @CalisanID ,@Ad ,@Soyad ,@BirimAd `;
    db.query(sqlIn, (err, results) => {
        if (err) throw err;
        console.log("Nöbet tarihi seçildi");
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

//nöbet oluştur
router.post("/create", (req, res) => {
    let sql = `insert into nobetler (nobetTarih,calisanID,birimID) values ('${req.body.nobetTarih}',${req.body.CalisanID},${req.body.BirimID})`;
    db.query(sql, (err, result) => {
        if (err) throw err;
        console.log("nobet oluşturuldu.");
    });
});

//nöbet sil+
router.delete("/delete/:id", (req, res) => {
    let sql = `delete from nobetler where calisanID=${req.params.id}`;
    db.query(sql, (err, result) => {
        if (err) throw err;
        console.log("nobet silindi.");
    });
});

module.exports = router;