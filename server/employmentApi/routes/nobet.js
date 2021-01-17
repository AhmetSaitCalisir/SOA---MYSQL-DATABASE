const express = require("express");
const axios = require("axios");

/*
1-Nöbetleri listele+
2-İd ile nöbet getir+
3-Tarih seçerek nöbet getir+
4-Nöbet oluştur+
5-Nöbet sil
*/
const databaseUrl = "http://localhost:3535/";
const router = express.Router();

//1-Nöbetleri listele
router.get("/", (req, res) => {
    axios
        .get(`${databaseUrl}watch/list`)
        .then((result) => res.json(result.data))
        .catch((err) => {
            console.log("employmentApi nobet");
            console.log("Nöbetler listelenirken bir hata meydana geldi");
            console.log(err);
            res.status(404).send("Nöbetler listelenirken bir hata meydana geldi")
        });
});

//2-İd ile nöbet getir
router.get("/id/:id", (req, res) => {
    axios
        .get(`${databaseUrl}watch/list/id/${req.params.id}`)
        .then((result) => res.json(result.data))
        .catch((err) => {
            console.log("employmentApi nobet id");
            console.log("Nöbetler listelenirken bir hata meydana geldi");
            console.log(err);
            res.status(404).send("Nöbetler listelenirken bir hata meydana geldi")
        });
});

//3-Tarih seçerek nöbet getir
router.post("/zaman", (req, res) => {
    const Tarih = req.body.Tarih;
    axios
        .post(`${databaseUrl}watch/byDate`, { Tarih })
        .then((result) => res.json(result.data))
        .catch((err) => {
            console.log("employmentApi nobet tarih ile");
            console.log("Tarihe göre nöbet getirilirken hata meydana geldi");
            console.log(err);
            res.status(404).send("Tarihe göre nöbet getirilirken hata meydana geldi");
        });
});

//4-Nöbet oluştur
router.post("/", (req, res) => {
    const Nobet = {
        nobetTarih: req.body.nobetTarih,
        CalisanID: req.body.CalisanID,
        BirimID: req.body.BirimID,
    };
    axios
        .post(`${databaseUrl}watch/create`, Nobet)
        .then((result) => {
            res.send("Nöbet Oluşturuldu");
        })
        .catch((err) => {
            console.log("employmentApi nobet oluştur");
            console.log("Nöbet oluşturulurken hata meydana geldi");
            console.log(err);
            res.status(400).send("Nöbet oluşturulurken hata meydana geldi");
        });
});

//5-Nöbet sil
router.delete("/id/:id", (req, res) => {
    axios
        .delete(`${databaseUrl}watch/delete/${req.params.id}`)
        .then((result) => res.send("Nöbet Silindi"))
        .catch((err) => {
            console.log("employmentApi nobet sil");
            console.log("Nöbet silinirken bir hatayla karşılaşıldı");
            console.log(err);
            res.status(400).send("Nöbet silinirken bir hatayla karşılaşıldı");
        });
});

module.exports = router;