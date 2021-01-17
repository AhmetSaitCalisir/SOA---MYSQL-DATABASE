const express = require("express");

var db = require("./connection");

const router = express.Router();

/*
1-Tüm çalışanları listele
2-Id ile çalışanları listele
3-Çalışan ekle
4-Çalışan güncelle
5-Çalışan sil
6-Ünvan listele
7-Birimleri listele
8-Birim adı ve ünvana göre çalışan listele
 */

//1-Tüm çalışanları listele+
router.get("/", (req, res) => {
  //çalışanları listele
  let sql =
    "select *  from (calisanbilgi c join birimler b on b.BirimID=c.birimID) join unvan u on u.UnvanID=c.unvanID";
  let query = db.query(sql, (err, results) => {
    if (err) throw err;
    console.log("Tüm çalışanlar listelendi");
    res.json(results);
  });
});

//2-Id ile çalışanları listele+
router.get("/id/:id", (req, res) => {
  let sql = `select * from 
    (((calisanbilgi c join birimler b on b.BirimID=c.BirimID) 
    join unvan u on u.UnvanID=c.UnvanID) 
    join kimlikbilgileri k on k.CalisanID=c.CalisanID) where c.CalisanID=${req.params.id}`;
  let query = db.query(sql, (err, results) => {
    if (err) throw err;
    console.log(`${req.params.id} id li çalışan getirildi`);
    res.json(results);
  });
});

async function IdBul(BirimAdi, UnvanAdi) {
  let promise = new Promise((resolve, reject) => {
    let sqlID = `SELECT b.BirimID,u.UnvanID FROM birimler b,unvan u where b.BirimAd Like '%${BirimAdi}%' and u.UnvanAdi='${UnvanAdi}'`;
    db.query(sqlID, (err, result) => {
      console.log("sqlıd qwuery içine girildi");
      if (err) reject(err);
      let IDs = {};
      IDs.BirimID = -1;
      IDs.UnvanID = -1;
      IDs.BirimID = result[0].BirimID;
      IDs.UnvanID = result[0].UnvanID;
      console.log("birim id bulundu", IDs.BirimID);
      resolve(IDs);
    });
  });
  let result = await promise;
  return result;
}

async function ekle(IDs) {
  let ID = -1;
  let promise = new Promise((resolve, reject) => {
    let sqlInsert = `INSERT INTO calisanbilgi (Ad, Soyad, UnvanID,BirimID) values ('${IDs.Ad}','${IDs.Soyad}',${IDs.UnvanID},${IDs.BirimID})`;
    db.query(sqlInsert, (err, results) => {
      if (err) {
        console.log(err);
      }
      resolve("ekle query sona erdi");
    });
  }).then(async () => {
    let promiseID = new Promise((resolve, reject) => {
      let sqlCalisanID = `select CalisanID from calisanbilgi cb where cb.Ad='${IDs.Ad}' and cb.Soyad='${IDs.Soyad}'`;
      db.query(sqlCalisanID, (err, results) => {
        if (err) {
          console.log(err);
        }
        ID = results[0].CalisanID;
        resolve(ID);
      });
    });
    let result = await promiseID;
    return result;
  });
  return await promise;
}

//kimlik bilgileri ekle
async function kimlikEkle(
  CalID,
  TcNo,
  Ad,
  Soyad,
  Ilce,
  Il,
  AnneAdi,
  BabaAdi,
  Uyruk,
  SeriNo
) {
  let promise = new Promise((resolve, reject) => {
    let sql = `CALL KimlikBilgisi_Ekle('${CalID}','${TcNo}','${Ad}','${Soyad}','${Ilce}','${Il}','${AnneAdi}','${BabaAdi}','${Uyruk}','${SeriNo}');`;
    db.query(sql, (err, results) => {
      if (err) {
        console.log(err);
      }
      resolve("kimlik bilgileri eklendi");
    });
  });
}

//3-Çalışan ekle -+ => Procedure bende yok deneyemedim
router.post("/ekle", async (req, res) => {
  let IDs = await IdBul(req.body.BirimAdi, req.body.UnvanAdi);
  IDs.Ad = req.body.Ad;
  IDs.Soyad = req.body.Soyad;
  const bilgiler = {
    TcNo: req.body.TcNo,
    Ad: req.body.Ad,
    Soyad: req.body.Soyad,
    Ilce: req.body.Ilce,
    Il: req.body.Il,
    AnneAdi: req.body.AnneAdi,
    BabaAdi: req.body.BabaAdi,
    Uyruk: req.body.Uyruk,
    SeriNo: req.body.SeriNo,
  };
  await kimlikEkle(
    await ekle(IDs),
    bilgiler.TcNo,
    bilgiler.Ad,
    bilgiler.Soyad,
    bilgiler.Ilce,
    bilgiler.Il,
    bilgiler.AnneAdi,
    bilgiler.BabaAdi,
    bilgiler.Uyruk,
    bilgiler.SeriNo
  );
});

async function guncelle(bilgi) {
  let promise = new Promise((resolve, reject) => {
    let sql = `
        UPDATE calisanbilgi
        SET UnvanID = '${bilgi.UnvanID}', BirimID = '${bilgi.BirimID}'
        WHERE CalisanID = ${bilgi.CalID};
        `;
    db.query(sql, (err, results) => {
      if (err) {
        console.log(err);
      }
      resolve("calisan guncellendi");
    });
  });
}

//güncelleme birim ve unvan değiştirilebilir diye düşündüm
//4-Çalışan güncelle
router.put("/update/:id", async (req, res) => {
  let IDs = await IdBul(req.body.BirimAdi, req.body.UnvanAdi);
  console.log("put ıd bulundu");
  let bilgi = {};
  bilgi.CalID = req.params.id;
  bilgi.UnvanID = IDs.UnvanID;
  bilgi.BirimID = IDs.BirimID;
  await guncelle(bilgi);
});

//delete function
async function sil(id) {
  let promise = new Promise((resolve, reject) => {
    let sql = `DELETE FROM calisanbilgi WHERE CalisanID=${id}`;
    db.query(sql, (err, results) => {
      if (err) {
        console.log(err);
      }
      resolve("çalışan silindi");
      console.log("çalışan silindi");
    });
  }).then(() => {
    let promiseSil = new Promise((resolve, reject) => {
      let sqlKimSil = ` DELETE FROM kimlikbilgileri WHERE CalisanID=${id};`;
      db.query(sqlKimSil, (err, results) => {
        if (err) {
          console.log(err);
        }
        resolve("kimlik bilgileri silindi");
        console.log("çalışan kimlik bilgileri silindi");
      });
      return "Çalışan kimlik bilgileri tablosundan silindi";
    });
  });
}

//5-Çalışan sil+
router.delete("/delete/:id", async (req, res) => {
  res.send(await sil(req.params.id));
});

//6-Ünvan listele+
router.get("/unvansecimi", (req, res) => {
  let sql = `select UnvanAdi,UnvanID from unvan`;
  let query = db.query(sql, (err, results) => {
    if (err) throw err;
    console.log("unvan seciniz");
    res.json(results);
  });
});

//7-Birimleri listele
router.get("/birimsecimi", (req, res) => {
  let sql = `select BirimAd from birimler`;
  let query = db.query(sql, (err, results) => {
    if (err) throw err;
    console.log("birim seciniz");
    res.json(results);
  });
});

//8-Birim adı ve ünvana göre çalışan listele+
router.get(
  "/calisansecimi/birimler/:birimadi/unvanlar/:unvanadi",
  (req, res) => {
    let calisan = {};
    let sql = `select * from ((birimler b join calisanbilgi cb on cb.BirimID=b.BirimID) join unvan u on u.UnvanID=cb.UnvanID) where b.BirimAd LIKE '%${req.params.birimadi}%' and u.UnvanAdi LIKE'%${req.params.unvanadi}%'`;
    db.query(sql, (err, results) => {
      if (err) throw err;
      console.log("calisan seciniz");
      res.json(results);
    });
  }
);

//9-Birim adına göre doktorları listele+
router.get("/doktorsecimi/:birimadi", (req, res) => {
  let sql = `select * from (birimler b join calisanbilgi cb on cb.BirimID=b.BirimID) where b.BirimAd='${req.params.birimadi}' and cb.UnvanID='1'`;
  let query = db.query(sql, (err, results) => {
    if (err) throw err;
    console.log("doktor seciniz");
    res.json(results);
  });
});

module.exports = router;
