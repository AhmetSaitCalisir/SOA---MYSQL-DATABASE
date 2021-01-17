const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const axios = require("axios");

/*
YAPILMASI GEREKENLER

1-Tüm çalışanları listele +
2-Id ile çalışanları listele +
3-Çalışan ekle +
4-Çalışan güncelle +
5-Çalışan sil +
6-Ünvan listele +
7-Birim adı ve ünvana göre çalışan listele +
8-Birim adına göre doktor listele +
9-oturum açma +
*/

const databaseUrl = "http://localhost:3535/";
const app = express();

app.use(cors());
app.use(bodyParser.json());

//1-Tüm çalışanları listele
app.get("/", (req, res) => {
  axios
    .get(`${databaseUrl}calisanbilgileri`)
    .then((result) => {
      res.json(result.data);
    })
    .catch((err) => {
      console.log("StaffApi");
      console.log("Kişi verilerine ulaşılamadı");
      console.log(err);
      res.status(404).send("Kişi verilerine ulaşılamadı");
    });
});

//2-Id ile çalışanları listele
app.get("/id/:id", (req, res) => {
  axios
    .get(`${databaseUrl}calisanbilgileri/${req.params.id}`)
    .then((result) => {
      res.json(result.data);
    })
    .catch((err) => {
      res.status(404).send("Kişi verilerine ulaşılamadı");
    });
});

//3-Çalışan ekle
app.post("/", (req, res) => {
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
    .post(`${databaseUrl}calisanbilgileri/ekle`, Calisan)
    .then((result) => {
      res.send("Kişi Başarıyla Eklendi");
    })
    .catch((err) => {
      res.status(400).send("Kişi Eklenemedi");
    });
});

//4-Çalışan güncelle
app.put("/id/:id", (req, res) => {
  const Calisan = {
    BirimAdi: req.body.BirimAdi,
    UnvanAdi: req.body.UnvanAdi,
  };
  axios
    .put(`${databaseUrl}calisanbilgileri/update/${req.params.id}`, Calisan)
    .then((result) => {
      res.send("Çalışan Güncellendi");
    })
    .catch((err) => {
      res.status(400).send("Çalışan Güncellenirken bir hata meydana geldi");
    });
});

//5-Çalışan sil
app.delete("/id/:id", (req, res) => {
  axios
    .delete(`${databaseUrl}calisanbilgileri/delete/id/${req.params.id}`)
    .then((result) => {
      res.send("Kişi Başarıyla Silindi");
    })
    .catch((err) => {
      res.status(400).send("Kişi silinirken hata meydana geldi");
    });
});

//6-Ünvan listele
app.get("/unvan", (req, res) => {
  axios
    .get(`${databaseUrl}calisanbilgileri/unvansecimi`)
    .then((result) => {
      res.json(result.data);
    })
    .catch((err) => {
      res.status(404).send("Ünvanlar Listelenirken Bir Hata Meydana Geldi");
    });
});

//7-Birim adı ve ünvana göre çalışan listele
app.get("/birim/:birimadi/unvan/:unvanadi", (req, res) => {
  axios
    .get(
      `${databaseUrl}calisanbilgileri/calisansecimi/birimler/${req.params.birimadi}/unvanlar/${req.params.unvanadi}`
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
app.get("/doktor/:birimadi", (req, res) => {
  axios
    .get(`${databaseUrl}calisanbilgileri/doktorsecimi/${req.params.birimadi}`)
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
app.post("/oturumac", (req, res) => {
  const Kimlik = {
    TcNo: req.body.TcNo,
    Sifre: req.body.Sifre,
  };
  axios
    .post(`${databaseUrl}login`)
    .then((result) => {
      res.json(result.data);
    })
    .catch((err) => {
      res.status(400).send("Oturum açılırken bir hata meydana geldi");
    });
});

const port = process.env.PORT || 8888;

app.listen(port, () => {
  console.log(`StaffApi başlatıldı => http://localhost:${port}/`);
});
