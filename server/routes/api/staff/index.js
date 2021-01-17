const express = require("express");
const axios = require("axios");

const staffApiUrl = "http://localhost:8888/";
const employmentApiUrl = "http://localhost:9876/";

/*

YAPILMASI GEREKENLER

1-Tüm çalışanları listele 
2-Id ile çalışanları listele 
3-Çalışan ekle 
4-Çalışan güncelle 
5-Çalışan sil 
6-Ünvan listele 
7-Birim adı ve ünvana göre çalışan listele 
8-Birim adına göre doktor listele 
9-oturum açma 
*/

const router = express.Router();

//1-Tüm çalışanları listele
router.get("/", (req, res) => {
  axios
    .get(`${staffApiUrl}`)
    .then((result) => {
      res.json(result.data);
    })
    .catch((err) => {
      console.log("Staff");
      console.log("Kişi verilerine ulaşılamadı");
      console.log(err);
      res.status(404).send("Kişi verilerine ulaşılamadı");
    });
});

//2-Id ile çalışanları listele
router.get("/id/:id", (req, res) => {
  axios
    .get(`${staffApiUrl}id/${req.params.id}`)
    .then((result) => {
      res.json(result.data);
    })
    .catch((err) => {
      res.status(404).send("Kişi verilerine ulaşılamadı");
    });
});

//3-Çalışan ekle
router.post("/", (req, res) => {
  const Calisan = {
    BirimAdi: req.body.BirimAdi,
    UnvanAdi: req.body.UnvanAdi,
    Ad: req.body.Ad,
    TcNo: req.body.TcNo,
    Ad: req.body.Ad,
    Soyad: req.body.Soyad,
    Ilce: req.body.Ilce,
    AnneAdi: req.body.AnneAdi,
    BabaAdi: req.body.BabaAdi,
    Uyruk: req.body.Uyruk,
    SeriNo: req.body.SeriNo,
  };
  axios
    .post(`${staffApiUrl}`, Calisan)
    .then((result) => {
      res.send("Kişi Başarıyla Eklendi");
    })
    .catch((err) => {
      res.status(400).send("Kişi Eklenemedi");
    });
});

//4-Çalışan güncelle
router.put("/id/:id", (req, res) => {
  const Calisan = {
    BirimAdi: req.body.BirimAdi,
    UnvanAdi: req.body.UnvanAdi,
  };
  axios
    .put(`${staffApiUrl}id/${req.params.id}`, Calisan)
    .then((result) => {
      res.send("Çalışan Güncellendi");
    })
    .catch((err) => {
      res.status(400).send("Çalışan Güncellenirken bir hata meydana geldi");
    });
});

//5-Çalışan sil
router.delete("/id/:id", (req, res) => {
  axios
    .delete(`${staffApiUrl}id/${req.params.id}`)
    .then((result) => {
      res.send("Kişi Başarıyla Silindi");
    })
    .catch((err) => {
      res.status(400).send("Kişi silinirken hata meydana geldi");
    });
});

//6-Ünvan listele
router.get("/unvan", (req, res) => {
  axios
    .get(`${staffApiUrl}unvan`)
    .then((result) => {
      res.json(result.data);
    })
    .catch((err) => {
      res.status(404).send("Ünvanlar Listelenirken Bir Hata Meydana Geldi");
    });
});

//7-Birim adı ve ünvana göre çalışan listele
router.get("/birim/:birimadi/unvan/:unvanadi", (req, res) => {
  axios
    .get(
      `${staffApiUrl}birim/${req.params.birimadi}/unvan/${req.params.unvanadi}`
    )
    .then((result) => {
      res.json(result.data);
    })
    .catch((err) => {
      res
        .status(404)
        .send(
          `${req.params.birimadi} birimindeki ${req.params.unvanadi} grubu listelenemedi`
        );
    });
});

//8-Birim adına göre doktor listele
router.get("/doktor/:birimadi", (req, res) => {
  axios
    .get(`${staffApiUrl}doktor/${req.params.birimadi}`)
    .then((result) => {
      res.json(result.data);
    })
    .catch((err) => {
      res
        .status(404)
        .send(
          `${req.params.birimadi} birimindeki doktorlar listelenirken bir hata meydana geldi`
        );
    });
});

//9-Oturum açma
router.post("/oturumac", (req, res) => {
  const Kimlik = {
    TcNo: req.body.TcNo,
    Sifre: req.body.Sifre,
  };
  axios
    .post(`${staffApiUrl}oturumac`)
    .then((result) => {
      res.json(result.data);
    })
    .catch((err) => {
      res.status(400).send("Oturum açılırken bir hata meydana geldi");
    });
});

module.exports = router;
