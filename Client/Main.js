import { setCookie } from "./Cookie.js";
setCookie();
let className;
console.log(document.cookie);
let ClickedButton = null;
let LittleIdBoy = document.getElementById("root");
let LittleWsBoy = new WebSocket("ws://localhost:3000/ws");
LittleWsBoy.addEventListener("message", (event) => {
  if (event.data === "You won!") {
    document.body.innerHTML = `<h1 class = "${className}"> You won! </h1>`;
    document.body.innerHTML += `<h2 class = "${className}"> Refresh to keep playing! </h2>`;
  }
  if (event.data === "You lost!") {
    document.body.innerHTML = `<h1 class = "${className}"> You lost! </h1>`;
    document.body.innerHTML += `<h2 class = "${className}"> Refresh to keep playing! </h2>`;
  }
  if (event.data === "You tied!") {
    document.body.innerHTML = `<h1 class = "${className}"> You tied! </h1>`;
    document.body.innerHTML += `<h2 class = "${className}"> Refresh to keep playing! </h2>`;
  }
  console.log("Message from server ", event.data);
  setUserStyle(event.data);
});
let userColor = "grey";
window.TheClicker = function TheClicker() {
  LittleWsBoy.send(JSON.stringify({ type: "locked", value: ClickedButton }));

  document.body.innerHTML = `<h1 id="WaitingForPlayer" class = "${className}"> Waiting for other player... </h1>`;
  let NumOfDots = 0;
  setInterval(() => {
    NumOfDots = NumOfDots > 3 ? 0 : NumOfDots + 1;
    document.getElementById("WaitingForPlayer").innerHTML =
      "Waiting for other player";
    for (let i = 0; i < NumOfDots; i++) {
      document.getElementById("WaitingForPlayer").innerHTML += ".";
    }
  }, 500);
};

window.HighlightGuy = function HighlightGuy(HighlightClick) {
  ClickedButton = HighlightClick;
  let buttons = document.getElementsByTagName("button");
  for (let greyOut of buttons) {
    greyOut.style.backgroundColor = "#F0F0F0";
  }

  let HighlightTurner = document.getElementById(HighlightClick);
  HighlightTurner.style.backgroundColor = userColor;
};
function setUserStyle(user) {
  if (user === "User1") {
    document.getElementsByTagName("body")[0].className = "user1Background";
    userColor = "lightblue";
    document.getElementById("WelcomeRSP").className = "User1txt";
    window.user = "User1";
  }

  if (user === "User2") {
    document.getElementsByTagName("body")[0].className = "user2Background";
    userColor = "lightsalmon";
    document.getElementById("WelcomeRSP").className = "User2txt";
    window.user = "User2";
  }
  className = window.user === "User2" ? "User2txt" : "User1txt";
}
