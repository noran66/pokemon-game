const GRASS_CLASS = "grass",
  GRASS_COUNT = 20;
const BALL_CLASS = "pokeball",
  BALL_COUNT = 5;
const PLAYER = document.querySelector(".player");
let playerPos = { x: 0, y: 0 };
let playerVel = { x: 0, y: 0 };

const PLAYER_SPEED = 3;
const START_PLAYER_POS = {
  x: window.innerWidth / 2,
  y: window.innerHeight / 2,
};

const SOUND = new Audio("assets/coin.mp3");
let scoreEl = document.querySelector("#score");
let scoreValue = 0;

// ============ GAME FUNCTIONS ==============
function start() {
  generateRondomElements(GRASS_CLASS, GRASS_COUNT);
  generateRondomElements(BALL_CLASS, BALL_COUNT);
  playerPos = START_PLAYER_POS;
}

function update() {
  playerPos.x += playerVel.x;
  playerPos.y += playerVel.y;
  PLAYER.style.left = playerPos.x + "px";
  PLAYER.style.top = playerPos.y + "px";

  checkCollisions();

  if (playerPos.x < 0) playerPos.x = 0;
  if (playerPos.y < 0) playerPos.y = 0;
  if (playerPos.x + PLAYER.offsetWidth > window.innerWidth) {
    playerPos.x = window.innerWidth - PLAYER.offsetWidth;
  }
  if (playerPos.y + PLAYER.offsetHeight > window.innerHeight) {
    playerPos.y = window.innerHeight - PLAYER.offsetHeight;
  }

  requestAnimationFrame(update);
}

function increaseScore() {
  scoreValue++;
  scoreEl.textContent = scoreValue;
}

// ------------ HANDLE PLAYER MOVEMENT --------------
window.addEventListener("keydown", (e) => {
  if (e.key == "ArrowUp") {
    playerVel.y = -PLAYER_SPEED;
    PLAYER.style.backgroundImage = "url('assets/player_front.png')";
  }
  if (e.key == "ArrowDown") {
    playerVel.y = PLAYER_SPEED;
    PLAYER.style.backgroundImage = "url('assets/player_back.png')";
  }
  if (e.key == "ArrowLeft") {
    playerVel.x = -PLAYER_SPEED;
    PLAYER.style.backgroundImage = "url('assets/player_left.png')";
  }
  if (e.key == "ArrowRight") {
    playerVel.x = PLAYER_SPEED;
    PLAYER.style.backgroundImage = "url('assets/player_right.png')";
  }
  PLAYER.classList.add("walk");
});

window.addEventListener("keyup", () => {
  playerVel.x = 0;
  playerVel.y = 0;
  PLAYER.classList.remove("walk");
});

function movePlayer(dir) {
  if (dir === "up") {
    playerVel.y = -PLAYER_SPEED;
    PLAYER.style.backgroundImage = "url('assets/player_front.png')";
  }
  if (dir === "down") {
    playerVel.y = PLAYER_SPEED;
    PLAYER.style.backgroundImage = "url('assets/player_back.png')";
  }
  if (dir === "left") {
    playerVel.x = -PLAYER_SPEED;
    PLAYER.style.backgroundImage = "url('assets/player_left.png')";
  }
  if (dir === "right") {
    playerVel.x = PLAYER_SPEED;
    PLAYER.style.backgroundImage = "url('assets/player_right.png')";
  }
  PLAYER.classList.add("walk");
}

function stopPlayer() {
  playerVel.x = 0;
  playerVel.y = 0;
  PLAYER.classList.remove("walk");
}

["up", "down", "left", "right"].forEach((id) => {
  const btn = document.getElementById(id);
  if (btn) {
    btn.addEventListener("touchstart", () => movePlayer(id));
    btn.addEventListener("touchend", stopPlayer);
  }
});

// ------------ RondomElements--------------
function generateRondomElements(className, elementCount) {
  for (let count = 0; count < elementCount; count++) {
    const newElement = document.createElement("div");
    newElement.classList.add(className);
    const maxX = window.innerWidth - 30;
    const maxY = window.innerHeight - 30;

    newElement.style.left = Math.random() * maxX + "px";
    newElement.style.top = Math.random() * maxY + "px";

    document.body.appendChild(newElement);
  }
}

// ------------Collisions--------------
function checkCollisions() {
  balls = document.querySelectorAll(".pokeball");
  balls.forEach((ball) => {
    if (collision(ball, PLAYER)) {
      ball.style.left = Math.random() * 100 + "%";
      ball.style.top = Math.random() * 100 + "%";
      SOUND.play();
      increaseScore();
    }
  });
}

// ============= Check collision between 2 divs ===========
function collision($div1, $div2) {
  var x1 = $div1.getBoundingClientRect().left;
  var y1 = $div1.getBoundingClientRect().top;
  var h1 = $div1.clientHeight;
  var w1 = $div1.clientWidth;
  var b1 = y1 + h1;
  var r1 = x1 + w1;

  var x2 = $div2.getBoundingClientRect().left;
  var y2 = $div2.getBoundingClientRect().top;
  var h2 = $div2.clientHeight;
  var w2 = $div2.clientWidth;
  var b2 = y2 + h2;
  var r2 = x2 + w2;

  if (b1 < y2 || y1 > b2 || r1 < x2 || x1 > r2) return false;
  return true;
}

// =========== RUN THE GAME ===============
start();
update();
