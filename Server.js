var express = require("express");
var app = express();
var expressWs = require("express-ws")(app);
app.use(express.json()); // for parsing application/json
app.use(express.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded

let JakinResponse = "Al!!!!!";

app.use(function (req, res, next) {
  console.log("middleware");
  req.testing = "testing";
  return next();
});

app.get("/", function (req, res, next) {
  console.log("get route", req.testing);
  res.end();
});
app.get("/jakin", function (req, res, next) {
  console.log("happy birthday al", req.testing);
  res.send(JakinResponse);
});

app.post("/al", function (req, res, next) {
  JakinResponse = req.body;
  res.end();
});
app.ws("/", function (ws, req) {
  ws.on("message", function (msg) {
    console.log(msg);
  });
  console.log("socket", req.testing);
});
console.log("now listening on port 3000!");
app.listen(3000);
