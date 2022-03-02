const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const mouse = {
  x: canvas.width / 2,
  y: canvas.height / 2
}

const colorArray = [
  '#A67458',
  '#C4EEF2',
  '#7AB8BF',
  '#F24405',
  '#FA7F08',
  '#F2BFAC',
  '#D9564A',
  '#D9A443',
  '#127369',

];


addEventListener('load', () => {
  canvas.width = window.innerWidth - 50;
  canvas.height = window.innerHeight - 80;
  addEventListener('mousemove', (e) => {

    /*these are calculated */
    mouse.x = e.x - 23;
    mouse.y = e.y - 60.5;
  })
})

addEventListener('resize', () => {
  canvas.width = window.innerWidth - 50;
  canvas.height = window.innerHeight - 80;

  /** reinitializing the particlesArr when screen is resized **/
  particlesArr = [];
  init();

  addEventListener('mousemove', (e) => {
    mouse.x = e.x - 23;
    mouse.y = e.y - 60.5;
  })
})


function getDistance(x1, y1, x2, y2) {
  let xDistance = x1 - x2;
  let yDistance = y1 - y2;

  return Math.sqrt(Math.pow(xDistance, 2) + Math.pow(yDistance, 2));
}

function randomIntInRange(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}

function Particles(x, y, radius, color) {
  this.x = x;
  this.y = y;
  this.radius = radius;
  this.color = color;
  this.velocity = 0.05;
  this.radians = Math.random() * Math.PI * 2;
  this.distanceFromCenter = randomIntInRange(50, 100);
  this.lastMousePoint = {
    x: x,
    y: y
  }

  this.draw = (lastPoint) => {
    //to draw with circle
    // ctx.arc(this.x, this.y, this.radius, Math.PI * 2, false);
    // ctx.fillStyle = 'blue';
    // ctx.fill();

    //draw with line
    ctx.beginPath();
    ctx.strokeStyle = this.color;
    ctx.strokeWidth = this.radius;
    ctx.moveTo(lastPoint.x, lastPoint.y);
    ctx.lineTo(this.x, this.y);
    ctx.stroke();
    ctx.closePath();

  }; //draw end

  this.update = (particlesArr) => {

    lastPoint = { x: this.x, y: this.y };
    this.lastMousePoint.x += (mouse.x - this.lastMousePoint.x ) * 0.1;
    this.lastMousePoint.y += (mouse.y - this.lastMousePoint.y ) * 0.1;

    this.radians += this.velocity;
    this.x = this.lastMousePoint.x + Math.cos(this.radians) * this.distanceFromCenter;
    this.y = this.lastMousePoint.y + Math.sin(this.radians) * this.distanceFromCenter;
    this.draw(lastPoint);

  }
}


var particlesArr = [];

function init() {

  for (var i = 0; i < 100; i++) {

    //random radius of circles from 1 to 6
    var radius = (Math.random() * 0.5) + 2;
    /*position of circles*/
    var x = (canvas.width / 2) - 23;
    var y = (canvas.height / 2) - 60;

    let color = colorArray[Math.floor(Math.random() * colorArray.length)];

    particlesArr.push(new Particles(x, y, radius, color));
  }
}
init();

function animate() {
  requestAnimationFrame(animate);
  ctx.fillStyle = 'rgba( 255, 255, 255, 0.1)'
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  for (var i = 0; i < particlesArr.length; i++) {
    particlesArr[i].update(particlesArr);
  }
}

animate();