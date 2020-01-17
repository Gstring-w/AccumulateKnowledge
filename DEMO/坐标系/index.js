const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");
ctx.strokeStyle="#FF0000";
function main() {
  initXandY();
  move1()
}

main();

function initXandY() {
  ctx.beginPath();
  ctx.moveTo(500, 0);
  ctx.lineTo(500, 1000);
  ctx.stroke();
  ctx.beginPath();
  ctx.moveTo(0, 500);
  ctx.lineTo(1000, 500);
  ctx.stroke();
}

function getY1(x) {
  const tmp = Math.abs(x) - 1;
  return Math.sqrt(1 - tmp * tmp);
}

function getY2(x) {
  return Math.acos(1 - Math.abs(x)) - 3;
}

function draw(x, y) {
  ctx.lineTo(x * 100 + 500, -y * 100 + 500)
  ctx.stroke();
}

var count = -2;
function move1() {
  window.requestAnimationFrame(() => {
    draw(count, getY1(count));
    count += 0.03;
    if (count >= 2) {
      return move2();
    }
    move1();
  });
}

function move2() {
  var id = window.requestAnimationFrame(() => {
    draw(count, getY2(count));
    count -= 0.03;
    if (count <= -2) {
      return window.cancelAnimationFrame(id);
    }
    move2();
  });
}
