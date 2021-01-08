const express = require("express");

/*
YAPILMASI GEREKENLER

1) Nöbet getir
2) Nöbet ata
3) Nöbet güncelle
4) Nöbet sil
5) Ameliyat getir
6) Ameliyat ata
7) Ameliyat güncelle
8) Ameliyat sil
*/

const router = express.Router();

router.get("/", (req, res) => {
  res.send("MERHABA EMPLOYMENT");
});

module.exports = router;
