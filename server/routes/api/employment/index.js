const express = require("express");
const axios = require("axios");

const staffApiUrl = "http://localhost:8888/";
const employmentApiUrl = "http://localhost:9876/";

/*
YAPILMASI GEREKENLER

1-Birimleri listele+
1-Tüm ameliyatları listele+
2-İd ile ameliyat getir+
3-Ameliyat kaydı oluştur+
4-Ameliyat sil+
1-İzinleri listele+
2-id ile izin listele+
3-İzin ata+
4-İd ile izin sil+
1-Nöbetleri listele+
2-İd ile nöbet getir+
3-Tarih seçerek nöbet getir+
4-Nöbet oluştur+
5-Nöbet sil
*/

const router = express.Router();

//1-Birimleri listele
router.get("/birim", (req, res) => {
  axios
    .get(`${employmentApiUrl}birim`)
    .then((result) => {
      res.json(result.data);
    })
    .catch((err) => {
      console.log("employment");
      console.log("Birimler listelenirken bir hata meydana geldi");
      console.log(err);
      res.status(404).send("Birimler listelenirken bir hata meydana geldi");
    });
});

//1-Tüm ameliyatları listele
router.get("/ameliyat", (req, res) => {
  axios
    .get(`${employmentApiUrl}ameliyat`)
    .then((result) => {
      res.json(result.data);
    })
    .catch((err) => {
      console.log("employment ameliyat");
      console.log("Ameliyatlar listelenirken bir hata meydana geldi");
      console.log(err);

      res.status(404).send("Ameliyatlar listelenirken bir hata meydana geldi");
    });
});

//2-İd ile ameliyat getir
router.get("/ameliyat/id/:id", (req, res) => {
  axios
    .get(`${employmentApiUrl}ameliyat/id/${req.params.id}`)
    .then((result) => {
      res.json(result.data);
    })
    .catch((err) => {
      res
        .status(404)
        .send(
          `${req.params.id} idli ürün listelenirken bir hata meydana geldi`
        );
    });
});

//3-Ameliyat kaydı oluştur
router.post("/ameliyat/", (req, res) => {
  const Ameliyat = {
    BirimAd: req.body.BirimAd,
    Ad: req.body.Ad,
    Tarih: req.body.Tarih,
    Aciklama: req.body.Aciklama,
  };
  axios
    .post(`${employmentApiUrl}ameliyat/`, Ameliyat)
    .then((result) => {
      res.send("Ameliyat başarıyla eklendi");
    })
    .catch((err) => {
      res.status(400).send("Ameliyat eklenirken bir sorunla karşılaşıldı");
    });
});

//4-Ameliyat sil
router.delete("/ameliyat/id/:id", (req, res) => {
  axios
    .delete(`${employmentApiUrl}ameliyat/id/:id`)
    .then((result) => {
      res.send("Ameliyat silindi");
    })
    .catch((err) => {
      res.status(400).send("Ameliyat Silinirken Hata Meydana geldi");
    });
});

//1-İzinleri listele
router.get("/izin", (req, res) => {
  axios
    .get(`${employmentApiUrl}izin/`)
    .then((result) => {
      res.json(result.data);
    })
    .catch((err) => {
      res.status(404).send("İzinler listelenirken hata meydana geldi");
    });
});

//2-id ile izin listele
router.get("/izin/id/:id", (req, res) => {
  axios
    .get(`${employmentApiUrl}izin/id/${req.params.id}`)
    .then((result) => {
      res.json(result.data);
    })
    .catch((err) => {
      res
        .status(404)
        .send(`${req.params.id} idli izin listelenirken hata meydana geldi`);
    });
});

//3-İzin ata
router.post("/izin", (req, res) => {
  const Izin = {
    Ad: req.body.Ad,
    Soyad: req.body.Soyad,
    BirimAd: req.body.BirimAd,
    UnvanAd: req.body.UnvanAd,
    OnayAd: req.body.OnayAd,
    OnaySoyad: req.body.OnaySoyad,
    BaslaTarih: req.body.BaslaTarih,
    BitisTarih: req.body.BitisTarih,
  };
  axios
    .post(`${employmentApiUrl}izin/`, Izin)
    .then((result) => {
      res.send("İzin atandı");
    })
    .catch((err) => {
      res.status(400).send("İzin atanırken hata meydana geldi");
    });
});

//4-İd ile izin sil
router.delete("/izin/id/:id", (req, res) => {
  axios
    .delete(`${employmentApiUrl}izin/id/${req.params.id}`)
    .then((result) => {
      res.send("İzin iptal edildi");
    })
    .catch((err) => {
      res.status(400).send("İzin ipta edilirken bir hatayla karşılaşıldı");
    });
});

//1-Nöbetleri listele
router.get("/nobet", (req, res) => {
  axios
    .get(`${employmentApiUrl}nobet/`)
    .then((result) => res.json(result.data))
    .catch((err) =>
      res.status(404).send("Nöbetler listelenirken bir hata öeydana geldi")
    );
});

//2-İd ile nöbet getir
router.get("/nobet/id/:id", (req, res) => {
  axios
    .get(`${employmentApiUrl}nobet/id/${req.params.id}`)
    .then((result) => res.json(result.data))
    .catch((err) =>
      res.status(404).send("Nöbetler listelenirken bir hata öeydana geldi")
    );
});

//3-Tarih seçerek nöbet getir
router.post("nobet/zaman", (req, res) => {
  const Tarih = req.body.Tarih;
  axios
    .post(`${employmentApiUrl}nobet/zaman`, { Tarih })
    .then((result) => res.json(result.data))
    .catch((err) => {
      res.status(404).send("Tarihe göre nöbet getirilirken hata meydana geldi");
    });
});

//4-Nöbet oluştur
router.post("nobet/", (req, res) => {
  const Nobet = {
    nobetTarih: req.body.nobetTarih,
    CalisanID: req.body.CalisanID,
    BirimID: req.body.BirimID,
  };
  axios
    .post(`${employmentApiUrl}nobet/`, Nobet)
    .then((result) => {
      res.send("Nöbet Oluşturuldu");
    })
    .catch((err) => {
      res.status(400).send("Nöbet oluşturulken hata meydana geldi");
    });
});

//5-Nöbet sil
router.delete("nobet/id/:id", (req, res) => {
  axios
    .delete(`${employmentApiUrl}nobet/id/${req.params.id}`)
    .then((result) => res.send("Nöbet Silindi"))
    .catch((err) => {
      res.status(400).send("Nöbet silinirken bir hatayla karşılaşıldı");
    });
});

module.exports = router;
