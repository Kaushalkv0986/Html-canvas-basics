const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');


const circle1 = {
  x: 50,
  y: 50,
  r: 20
}

const circle2 = {
  x: canvas.width / 2,
  y: canvas.height / 2,
  r: 100,
  color: 'black'
}

addEventListener('load', () => {
  canvas.width = window.innerWidth - 50;
  canvas.height = window.innerHeight - 80;
  circle2.x = canvas.width / 2;
  circle2.y = canvas.height / 2;
  addEventListener('mousemove', (e) => {
    circle1.x = e.x - 23;
    circle1.y = e.y - 60.5;
  })
})

addEventListener('resize', () => {
  canvas.width = window.innerWidth - 50;
  canvas.height = window.innerHeight - 80;
  circle2.x = canvas.width / 2;
  circle2.y = canvas.height / 2;
  addEventListener('mousemove', (e) => {
    circle1.x = e.x - 23;
    circle1.y = e.y - 60.5;
  })
})


function getDistance(x1, y1, x2, y2) {
  let xDistance = x1 - x2;
  let yDistance = y1 - y2;

  return Math.sqrt(Math.pow(xDistance, 2) + Math.pow(yDistance, 2));
}

function animate() {
  requestAnimationFrame(animate);
  /*fill the rect with white background */
  ctx.fillStyle = "#FFF";
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  if (
    getDistance(circle1.x, circle1.y, circle2.x, circle2.y) 
    <= (circle1.r + circle2.r+30)) {
      circle2.color = '#ff000066';
  }
  else{
    circle2.color = 'black';
  }
  // console.log();

  //first rect (movable with mouse)
  ctx.beginPath();
  ctx.fillStyle = '#92abea';
  ctx.arc(circle1.x, circle1.y, 50, Math.PI * 2, false);
  ctx.fill();
  ctx.beginPath();
  ctx.fillStyle='black';
  ctx.arc(circle1.x, circle1.y, 5, Math.PI * 2, false);
  ctx.fill();

  //second rect
  ctx.beginPath();
  ctx.fillStyle = circle2.color;
  ctx.arc(circle2.x, circle2.y, circle2.r, Math.PI * 2, false);
  ctx.fill();
}

animate();
