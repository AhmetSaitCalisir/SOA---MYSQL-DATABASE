const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();

const staffApi = require("./routes/api/staff/index");
const employmentApi = require("./routes/api/employment/index");

app.use(cors());
app.use(bodyParser.json());

app.get("/", (req, res) => {
  res.send("MERHABA DÜNYA");
});

app.use("/staff", staffApi);
app.use("/employment", employmentApi);

const port = process.env.PORT || 4545;

app.listen(port, () => {
  console.log(`Server başlatıldı => http://localhost:${port}/`);
});
