const express = require("express");
const bodyparser = require("body-parser");

const app = express();
app.use(bodyparser.urlencoded({ extended: true })); // this is used to get html elements

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/index.html");
});

app.post("/index.html", function(req, res) {
  console.log(req.body);

  let num1 = Number(req.body.num1);
  let num2 = Number(req.body.num2);

  let result = num1 + num2;
  res.send(`your result is ${result}`);
});

app.get("/bmi", (req, res) => {
  res.sendFile(__dirname + "/bmicalculator.html");
});

app.post("/bmicalculator", (req, res) => {
  let w = Number(req.body.weight);
  let h = Number(req.body.height);
  let total = (w * h) / 2;
  res.send(`Your BMI is ${total}`);
});
app.listen(3000, () => {
  console.log("server started on port 3000");
});
