const express = require("express");
const axios = require("axios");

/*
1-Tüm ameliyatları listele+
2-İd ile ameliyat getir+
3-Ameliyat kaydı oluştur+
4-Ameliyat sil+
 */
const databaseUrl = "http://localhost:3535/";
const router = express.Router();

//1-Tüm ameliyatları listele
router.get("/", (req, res) => {
    axios
        .get(`${databaseUrl}operation/list`)
        .then((result) => {
            res.json(result.data);
        })
        .catch((err) => {
            console.log("employment ameliyat Api");
            console.log("Ameliyatlar listelenirken bir hata meydana geldi");
            console.log(err);

            res.status(404).send("Ameliyatlar listelenirken bir hata meydana geldi");
        });
});

//2-İd ile ameliyat getir
router.get("/id/:id", (req, res) => {
    axios
        .get(`${databaseUrl}operation/list/ameliyatId/${req.params.id}`)
        .then((result) => {
            res.json(result.data);
        })
        .catch((err) => {
            console.log("employment ameliyat Api id");
            console.log(`${req.params.id} idli ürün listelenirken bir hata meydana geldi`);
            console.log(err);
            res
                .status(404)
                .send(
                    `${req.params.id} idli ürün listelenirken bir hata meydana geldi`
                );
        });
});

//3-Ameliyat kaydı oluştur
router.post("/", (req, res) => {
    const Ameliyat = {
        BirimAd: req.body.BirimAd,
        Ad: req.body.Ad,
        Tarih: req.body.Tarih,
        Aciklama: req.body.Aciklama,
    };
    axios
        .post(`${databaseUrl}operation/ekle`, Ameliyat)
        .then((result) => {
            res.send("Ameliyat başarıyla eklendi");
        })
        .catch((err) => {
            console.log("employment ameliyat Api kaydı");
            console.log("Ameliyat eklenirken bir sorunla karşılaşıldı");
            console.log(err);
            res.status(400).send("Ameliyat eklenirken bir sorunla karşılaşıldı");
        });
});

//4-Ameliyat sil
router.delete("/id/:id", (req, res) => {
    axios
        .delete(`${databaseUrl}operation/delete/:id`)
        .then((result) => {
            res.send("Ameliyat silindi");
        })
        .catch((err) => {
            console.log("employment ameliyat Api sil");
            console.log("Ameliyat Silinirken Hata Meydana geldi");
            console.log(err);
            res.status(400).send("Ameliyat Silinirken Hata Meydana geldi");
        });
});

module.exports = router;