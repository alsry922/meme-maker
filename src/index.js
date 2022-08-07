const $canvas = document.getElementById("canvas");
const $colorInput = document.getElementById("color-input");
const $tipSizeInput = document.getElementById("tip-size-input");
const $controlsMode = document.querySelector(".controls__mode");
const ctx = $canvas.getContext("2d");

const modes = {
  STROKE: "stroke",
  FILL: "fill",
  ERASE: "erase",
};

const shapes = {
  RECTANGLE: "rectangle",
  CIRCLE: "circle",
  TEXT: "text",
};

let isPainting = false;
let lineWidth = $tipSizeInput.value;
let paintColor = $colorInput.value;
let modeSet = modes.STROKE;

ctx.lineWidth = lineWidth;
ctx.fillStyle = paintColor;
ctx.strokeStyle = paintColor;

function onCanvasMousemove(event) {
  const [x, y] = [event.offsetX, event.offsetY];
  if (!isPainting) {
    ctx.moveTo(x, y);
    return;
  }
  switch (modeSet) {
    case modes.STROKE:
    case modes.FILL:
      drawLine(x, y);
      break;
    default:
      break;
  }
  ctx.lineTo(x, y);
  ctx.stroke();
}

function onCanvasMousedown() {
  isPainting = true;
}

function onCanvasMouseup() {
  isPainting = false;
  if (modeSet === modes.FILL) {
    ctx.fill();
  }
  ctx.beginPath();
}

function onCanvasMouseleave() {
  isPainting = false;
}

function onTipSizeChange(event) {
  const size = event.target.value;
  ctx.lineWidth = size;
}

function onColorChange(event) {
  const color = event.target.value;
  ctx.strokeStyle = color;
}

function onModeClick(event) {
  const target = event.target;
  if (!target.dataset.mode) return;
  modeSet = target.dataset.mode;
}

function drawLine(x, y) {
  ctx.lineTo(x, y);
  ctx.stroke();
}

$canvas.addEventListener("mousemove", onCanvasMousemove);
$canvas.addEventListener("mousedown", onCanvasMousedown);
$canvas.addEventListener("mouseup", onCanvasMouseup);
$canvas.addEventListener("mouseleave", onCanvasMouseleave);
$tipSizeInput.addEventListener("change", onTipSizeChange);
$colorInput.addEventListener("change", onColorChange);
$controlsMode.addEventListener("click", onModeClick);
