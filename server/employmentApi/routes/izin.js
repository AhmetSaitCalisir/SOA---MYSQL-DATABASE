const express = require("express");
const axios = require("axios");

/**
1-İzinleri listele+
2-id ile izin listele+
3-İzin ata+
4-İd ile izin sil+
 */

const databaseUrl = "http://localhost:3535/";
const router = express.Router();

//1-İzinleri listele
router.get("/", (req, res) => {
  axios
    .get(`${databaseUrl}dayoff/list`)
    .then((result) => {
      res.json(result.data);
    })
    .catch((err) => {
      res.status(404).send("İzinler listelenirken hata meydana geldi");
    });
});

//2-id ile izin listele
router.get("/id/:id", (req, res) => {
  axios
    .get(`${databaseUrl}dayoff/list/id/${req.params.id}`)
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
router.post("/", (req, res) => {
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
    .post(`${databaseUrl}dayoff/assigndayoff`, Izin)
    .then((result) => {
      res.send("İzin atandı");
    })
    .catch((err) => {
      res.status(400).send("İzin atanırken hata meydana geldi");
    });
});

//4-İd ile izin sil
router.delete("/id/:id", (req, res) => {
  axios
    .delete(`${databaseUrl}dayoff/delete/id/${req.params.id}`)
    .then((result) => {
      res.send("İzin iptal edildi");
    })
    .catch((err) => {
      res.status(400).send("İzin ipta edilirken bir hatayla karşılaşıldı");
    });
});

module.exports = router;
