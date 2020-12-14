var COUNT = 300;
var sky = document.querySelector('.sky');
var canvas = document.createElement('canvas');
var ctx = canvas.getContext('2d');
var width = sky.clientWidth;
var height = sky.clientHeight;
var i = 0;
var active = false;

function onResize() {
  width = sky.clientWidth;
  height = sky.clientHeight;
  canvas.width = width;
  canvas.height = height;
  ctx.fillStyle = '#FFF';

  var wasActive = active;
  active = true;

  if (!wasActive && active)
    requestAnimationFrame(update);
}

class Snowflake {
  constructor() {
    this.reset();
  }
  reset() {
    this.x = Math.random() * width;
    this.y = Math.random() * -height;
    this.vy = 1 + Math.random() * 3;
    this.vx = 0.5 - Math.random();
    this.r = 1 + Math.random() * 2;
    this.o = 0.5 + Math.random() * 0.5;
  }
}

canvas.style.position = 'absolute';
canvas.style.left = canvas.style.top = '0';

var snowflakes = [], snowflake;
for (i = 0; i < COUNT; i++) {
  snowflake = new Snowflake();
  snowflakes.push(snowflake);
}

function update() {
  ctx.clearRect(0, 0, width, height);

  if (!active)
    return;

  for (i = 0; i < COUNT; i++) {
    snowflake = snowflakes[i];
    snowflake.y += snowflake.vy;
    snowflake.x += snowflake.vx;

    ctx.globalAlpha = snowflake.o;
    ctx.beginPath();
    ctx.arc(snowflake.x, snowflake.y, snowflake.r, 0, Math.PI * 2, false);
    ctx.closePath();
    ctx.fill();

    if (snowflake.y > height) {
      snowflake.reset();
    }
  }
  requestAnimationFrame(update);
}

onResize();
window.addEventListener('resize', onResize, false);

sky.appendChild(canvas);