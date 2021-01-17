const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const axios = require("axios");

const ameliyat = require("./routes/ameliyat.js");
const izin = require("./routes/izin.js");
const nobet = require("./routes/nobet.js");

/*
YAPILMASI GEREKENLER

1-Birimleri listele+

*/

const databaseUrl = "http://localhost:3535/";
const app = express();

app.use(cors());
app.use(bodyParser.json());

app.get("/", (req, res) => {
  res.send("SELAM SANA İŞ İSTEYEN");
});

//1-Birimleri listele
app.get("/birim", (req, res) => {
  axios
    .get(`${databaseUrl}calisanbilgileri/birimsecimi`)
    .then((result) => {
      res.json(result.data);
    })
    .catch((err) => {
      console.log("employment Api");
      console.log("Birimler listelenirken bir hata meydana geldi");
      console.log(err);
      res.status(404).send("Birimler listelenirken bir hata meydana geldi");
    });
});

app.use("/ameliyat", ameliyat);
app.use("/izin", izin);
app.use("/nobet", nobet);

const port = process.env.PORT || 9876;

app.listen(port, () => {
  console.log(`EmploymentApi başlatıldı => http://localhost:${port}/`);
});
