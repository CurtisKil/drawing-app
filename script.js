const canvas = document.getElementById("canvas");
const increaseBtn = document.getElementById("increase");
const decreaseBtn = document.getElementById("decrease");
const sizeEL = document.getElementById("size");
const colorEl = document.getElementById("color");
const clearEl = document.getElementById("clear");

const ctx = canvas.getContext("2d");

let size = 10;
// Is the mouse pressed (mousedown event)
let isPressed = false;
colorEl.value = "black";
let color = colorEl.value;
let x;
let y;

// User presses mouse (mousedown)
canvas.addEventListener("mousedown", (e) => {
  isPressed = true;

  x = e.offsetX;
  y = e.offsetY;
});

// User releases mouse press (mouseup)
canvas.addEventListener("mouseup", (e) => {
  isPressed = false;

  x = undefined;
  y = undefined;
});

// User moves mouse (mousemove)
canvas.addEventListener("mousemove", (e) => {
  if (isPressed) {
    const x2 = e.offsetX;
    const y2 = e.offsetY;

    drawCircle(x2, y2);
    drawLine(x, y, x2, y2);

    // Set x2, y2 to current position
    x = x2;
    y = y2;
  }
});

function drawCircle(x, y) {
  ctx.beginPath();
  ctx.arc(x, y, size, 0, Math.PI * 2);
  ctx.fillStyle = color;
  ctx.fill();
}

// x & y move to and draw the line to
function drawLine(x1, y1, x2, y2) {
  ctx.beginPath();
  ctx.moveTo(x1, y1);
  ctx.lineTo(x2, y2);
  //   Apply color. Stroke style is like a border/line
  ctx.strokeStyle = color;
  //   Make circle same size as line
  ctx.lineWidth = size * 2;
  ctx.stroke();
}

function updateSizeOnScreen() {
  sizeEL.innerText = size;
}

increaseBtn.addEventListener("click", () => {
  // Size of line increases by 5 on when changed
  size += 5;

  //   Max size of 50
  if (size > 50) {
    size = 50;
  }
  updateSizeOnScreen();
});

decreaseBtn.addEventListener("click", () => {
  // Size of line increases by 5 on when changed
  size -= 5;

  //   Min size of 5
  if (size < 5) {
    size = 5;
  }
  updateSizeOnScreen();
});

colorEl.addEventListener("change", (e) => (color = e.target.value));

// Clear canvas
clearEl.addEventListener("click", () =>
  ctx.clearRect(0, 0, canvas.width, canvas.height)
);
