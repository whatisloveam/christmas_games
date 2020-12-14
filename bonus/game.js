var canvas = document.getElementById("canvas");
var ctx = canvas.getContext("2d");

var mouseX = 300, mouseY = 200;

var img = new Image();
img.src = 'https://i.ytimg.com/vi/gE4GzqGLMHQ/maxresdefault.jpg';
var x = 50, y = 50;
var isShooting = false;

var bulletX = [];
var bulletY = [];
var dirX = [];
var dirY = [];
var enemyX = 120;
var enemyY = 120;

document.addEventListener("mousemove", mouseEvent);
document.addEventListener("mousedown", mousedown);
document.addEventListener("mouseup", mouseup);

function mouseEvent(e)
{
  mouseX = e.pageX;
  mouseY = e.pageY;
}
function mousedown(e)
{
  isShooting = true;
}
function mouseup(e)
{
  isShooting = false;
}


function drawShip(angle)
{
  ctx.setTransform(1, 0, 0, 1, 300, 200);
  ctx.rotate(angle);
  ctx.beginPath();
  ctx.moveTo(20, 0);
  ctx.lineTo(-10, -10);
  ctx.lineTo(-10, 10);
  ctx.closePath();
  ctx.fillStyle = "yellow";
  ctx.fill();
}

var lastTime = 0;
var score = 0;

function update(timer) // 60 FPS
{
  ctx.setTransform(1, 0, 0, 1, 0, 0);
  ctx.clearRect(-1000, -1000, 2000, 2000);
  ctx.fillStyle = "black";
  ctx.fillRect(-1000, -1000, 2000, 2000);
  ctx.strokeStyle = "green";
  ctx.strokeRect(x-1, y-1, img.width+1, img.height+1);
  
  
  
  var now = Date.now();
  
  var vx = (300 - mouseX) / 25;
  var vy = (200 - mouseY) / 25;
  
  var angle = Math.atan2(mouseY - 200, mouseX - 300);
  
  x += vx;
  y += vy;
  
  if(x > 300) x = 300;
  if(y > 200) y = 200;
  
  if(x + img.width < 300) x = 300 - img.width;
  if(y + img.height < 200) y = 200-  img.height;
  
  ctx.drawImage(img, x, y);
  
  ctx.beginPath();
  ctx.fillStyle = "red";
  ctx.rect(enemyX + x, enemyY + y, 50, 50);
  ctx.fill();
  
  
  ctx.font = "20px Arial";
  ctx.fillStyle = "yellow";
  if(isShooting)
  {
    if(now - lastTime > 100)
    {
      bulletX.push(300);
      bulletY.push(200);
      dirX.push(Math.cos(angle)*10);
      dirY.push(Math.sin(angle)*10);
      lastTime = now;
    }
  }
  
  for(var i = 0; i < bulletX.length; i++)
  {
    bulletX[i] += dirX[i] + vx;
    bulletY[i] += dirY[i] + vy;
    if(!(bulletX[i] - x < enemyX || bulletX[i] - x > enemyX + 50 ||
         bulletY[i] - y < enemyY || bulletY[i] - y > enemyY + 50))
    {
      bulletX.splice(i, 1);
      bulletY.splice(i, 1);
      dirX.splice(i, 1);
      dirY.splice(i, 1);
      enemyX = Math.random() * 900;
      enemyY = Math.random() * 900;
      score++;
    }
    else
    {
      ctx.beginPath();
      ctx.arc(bulletX[i], bulletY[i], 3, 0, 2 * Math.PI);
      ctx.fill();
    }
  }
  ctx.fillText("Score: " + score, 10, 50);
  drawShip(angle);
  requestAnimationFrame(update);
}

requestAnimationFrame(update);