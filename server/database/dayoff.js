const express = require("express");

var db = require("./connection");

const router = express.Router();

//izinler listesi+
router.get("/list", (req, res) => {
  let sql = `select i.ID,cb.Ad,cb.Soyad,b.BirimAd,u.UnvanAdi,i.BaslangicTarih,i.BitisTarih,y.Ad as 'onaylayanAd',y.Soyad as 'onaylayanSoyad' from ((((calisanbilgi cb join izinler i on i.KisiID=cb.CalisanID)
    join birimler b on b.BirimID=i.BirimID) 
    join unvan u on u.UnvanID=cb.UnvanID)
    join yonetici y on y.CalisanID=i.OnaylayanID)`;
  db.query(sql, (err, results) => {
    if (err) throw err;
    console.log("Tüm izinler listelendi");
    res.json(results);
  });
});

//function ıd bull
async function ekle(
  Ad,
  Soyad,
  BirimAd,
  UnvanAd,
  OnayAd,
  OnaySoyad,
  BaslaTarih,
  BitisTarih
) {
  console.log("IdBul içine girildi");
  let promise = new Promise((resolve, reject) => {
    console.log("promise içine girildi.");
    let sqlID = `select cb.CalisanID,b.BirimID,u.UnvanID,y.YoneticiID from calisanbilgi cb,birimler b,unvan u, yonetici y  where 
        (((((cb.Ad='${Ad}' and cb.Soyad='${Soyad}')
         and b.BirimAd LIKE '%${BirimAd}%')
         and u.UnvanAdi LIKE '%${UnvanAd}%') 
         and y.Ad LIKE '%${OnayAd}%')
         and y.Soyad LIKE '%${OnaySoyad}%')`;
    db.query(sqlID, (err, results) => {
      if (err) reject(err);
      console.log("query içine girildi.");
      let IDs = {};
      IDs.CalisanID = results[0].CalisanID;
      IDs.BirimID = results[0].BirimID;
      IDs.UnvanID = results[0].UnvanID;
      IDs.YoneticiID = results[0].YoneticiID;
      resolve(IDs);
    });
  }).then((result) => {
    let sql = `insert into izinler (BaslangicTarih,BitisTarih,KisiID,OnaylayanID,BirimID) values ('${BaslaTarih}','${BitisTarih}','${result.CalisanID}','${result.YoneticiID}','${result.BirimID}')`;
    db.query(sql, (err, results) => {
      if (err) throw err;
      console.log("izin atandı");
    });
    return "calisanID " + result.CalisanID; // "done!"
  });
}
//İzin ata+
router.post("/assigndayoff", async (req, res) => {
  let bil = {
    Ad: req.body.Ad,
    Soyad: req.body.Soyad,
    BirimAd: req.body.BirimAd,
    UnvanAd: req.body.UnvanAd,
    OnayAd: req.body.OnayAd,
    OnaySoyad: req.body.OnaySoyad,
    BaslaTarih: req.body.BaslaTarih,
    BitisTarih: req.body.BitisTarih,
  };
  console.log("post içine girildi");

  console.log(
    await ekle(
      bil.Ad,
      bil.Soyad,
      bil.BirimAd,
      bil.UnvanAd,
      bil.OnayAd,
      bil.OnaySoyad,
      bil.BaslaTarih,
      bil.BitisTarih
    )
  );
  console.log("post bitti");
});

module.exports = router;
