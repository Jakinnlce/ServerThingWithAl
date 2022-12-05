var express = require("express");
var app = express();
var expressWs = require("express-ws")(app);
app.use(express.json()); // for parsing application/json
app.use(express.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded

let JakinSocket = null;

app.ws("/jakin", function (ws, req) {
  JakinSocket = ws;
  ws.on("message", function (msg) {
    console.log(msg);
  });
  console.log("socket", req.testing);
});

app.post("/al", function (req, res, next) {
  if (JakinSocket !== null) {
    JakinSocket.send(JSON.stringify(req.body));
  }
  res.end();
});

console.log("now listening on port 3000!");
app.listen(3000);
