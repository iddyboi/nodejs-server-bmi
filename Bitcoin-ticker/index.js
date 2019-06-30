const express = require("express");
const bodyParser = require("body-parser");
const request = require("request");

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/index.html");
});

app.post("/", (req, res) => {
  console.log(req.body.crypto);

  let crypto = req.body.crypto;
  let fiat = req.body.fiat;
  const baseURL = "https://apiv2.bitcoinaverage.com/indices/global/ticker/";
  const finalURL = baseURL + crypto + fiat;

  request(finalURL, (error, Response, body) => {
    let data = JSON.parse(body);
    let price = data.last;
    let currentDate = data.display_timestamp;
    res.write(`<p> current date is ${currentDate}</p>`);
    res.write(`<p>\nThe price of ${crypto} is ${price} ${fiat}</p>`);
    res.send();
  });
});
app.listen(3000, () => {
  console.log("listening on port 3000");
});
