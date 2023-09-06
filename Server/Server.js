var express = require("express");
var cookieParser = require("cookie-parser");
var path = require("path");
var app = express();
var expressWs = require("express-ws")(app);
app.use(express.json()); // for parsing application/json
app.use(express.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded
app.use(cookieParser());

const SendFileOptions = {
  root: path.dirname(__dirname),
};

app.get("/", function (req, res) {
  res.sendFile(path.join("Client", "index.html"), SendFileOptions);
});
app.get("/styles.css", function (req, res) {
  res.sendFile(path.join("Client", "StyleStuff.css"), SendFileOptions);
});

app.get("/Main.js", function (req, res) {
  res.sendFile(path.join("Client", "Main.js"), SendFileOptions);
});

app.get("/Cookie.js", function (req, res) {
  res.sendFile(path.join("Client", "Cookie.js"), SendFileOptions);
});

let Socket1 = null;
let Socket2 = null;
let Answer1 = null;
let Answer2 = null;
app.ws("/ws", function (ws, req) {
  console.log(req.cookies);
  const User = IdentifyUser(req);
  console.log("user", User);
  if (User === "User1") {
    Socket1 = ws;
  } else if (User === "User2") {
    Socket2 = ws;
  } else {
    console.log("Ignoring this user.");
  }
  ws.send(User);
  ws.on("message", function (msg) {
    msg = JSON.parse(msg);
    if (ws === Socket1) {
      Answer1 = msg.value;
      if (Answer2 === null) {
        return;
      }
      let winner = RPSDetermine(Answer1, Answer2);
      if (winner === 1) {
        Socket1.send("You won!");
        Socket2.send("You lost!");
        Answer1 = null;
        Answer2 = null;
        return;
      }
      if (winner === 2) {
        Socket2.send("You won!");
        Socket1.send("You lost!");
        Answer1 = null;
        Answer2 = null;
        return;
      }

      if (winner === 0) {
        Socket2.send("You tied!");
        Socket1.send("You tied!");
        Answer1 = null;
        Answer2 = null;
      }
    }
    if (ws === Socket2) {
      Answer2 = msg.value;
      if (Answer1 === null) {
        return;
      }
      let winner = RPSDetermine(Answer1, Answer2);
      if (winner === 1) {
        Socket1.send("You won!");
        Socket2.send("You lost!");
        Answer1 = null;
        Answer2 = null;
        return;
      }
      if (winner === 2) {
        Socket2.send("You won!");
        Socket1.send("You lost!");
        Answer1 = null;
        Answer2 = null;
        return;
      }

      if (winner === 0) {
        Socket2.send("You tied!");
        Socket1.send("You tied!");
        Answer1 = null;
        Answer2 = null;
      }
    }
  });
});

// app.post("/al", function (req, res, next) {
//   if (JakinSocket !== null) {
//     JakinSocket.send(JSON.stringify(req.body));
//   }
//   res.end();
// });

console.log("now listening on port 3000!");
app.listen(3000);
//req.connection.remotePort
//req.connection.remoteAdress

const UsersCookies = {};

function IdentifyUser(req) {
  let UUIDCookie = req.cookies["User"];
  let user1Cookie = UsersCookies["User1"];
  if (user1Cookie === undefined) {
    UsersCookies["User1"] = UUIDCookie;
    return "User1";
  }
  if (user1Cookie === UUIDCookie) {
    return "User1";
  }

  let user2Cookie = UsersCookies["User2"];
  if (user2Cookie === undefined) {
    UsersCookies["User2"] = UUIDCookie;
    return "User2";
  }
  if (user2Cookie === UUIDCookie) {
    return "User2";
  }
}
//connect > user > websockets

//--Rock, Paper and Scissors stuffs--
function RememberSelection() {}

function RPSDetermine(User1Selection, User2Selection) {
  if (User1Selection === "rock" && User2Selection === "scissors") {
    return 1;
  }
  if (User1Selection === "rock" && User2Selection === "paper") {
    return 2;
  }
  if (User1Selection === "rock" && User2Selection === "rock") {
    return 0;
  }
  if (User1Selection === "paper" && User2Selection === "rock") {
    return 1;
  }
  if (User1Selection === "paper" && User2Selection === "scissors") {
    return 2;
  }
  if (User1Selection === "paper" && User2Selection === "paper") {
    return 0;
  }
  if (User1Selection === "scissors" && User2Selection === "paper") {
    return 1;
  }
  if (User1Selection === "scissors" && User2Selection === "rock") {
    return 2;
  }
  if (User1Selection === "scissors" && User2Selection === "scissors") {
    return 0;
  }
}
const RPSmemory = 1;
