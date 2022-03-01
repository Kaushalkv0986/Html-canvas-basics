const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const mouse = {
  x: null,
  y: null
}

const maxRadius = 30;
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
window.addEventListener('mousemove', (e) => {
  mouse.x = e.x
  mouse.y = e.y;
})
window.addEventListener('resize', () => {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
})

function createCircle(x, y, dx, dy, radius) {
  this.x = x;
  this.y = y;
  this.dx = dx;
  this.dy = dy;
  this.radius = radius;
  this.minRadius = radius;
  this.color = colorArray[Math.floor(Math.random() * colorArray.length)];


  this.draw = () => {
    ctx.beginPath();
    ctx.arc(
      this.x,
      this.y,
      this.radius,
      Math.PI * 2,
      false
    );
    ctx.fillStyle = this.color;
    ctx.fill();
  }; //draw end

  this.update = () => {
    /* Bounce back the circle if touching X boundaries */
    if (
      this.x + this.radius > canvas.width ||
      this.x - this.radius < 0
    ) {
      this.dx -= this.dx;
    }

    /* Bounce back the circle if touching Y boundaries */
    if (
      this.y + this.radius > canvas.height ||
      this.y - this.radius < 0
    ) {
      this.dy -= this.dy;
    }

    this.x += this.dx;
    this.y += this.dy;

    // mouse interactivity
    /*increase the radius if circle is around 40px of mouse */
    if (
      mouse.x - this.x < 40 &&
      mouse.x - this.x > -40 &&
      mouse.y - this.y < 40 &&
      mouse.y - this.y > -40 &&
      this.radius < maxRadius
    ) {
      this.radius += 1;
    }
    else if (this.radius > this.minRadius) {
      this.radius -= 1;
    }

    this.draw();
  }
}


var circleArray = [];

for (var i = 0; i < 800; i++) {

  //random radius of circles from 1 to 6
  var radius = Math.random() * 5 + 1;

  /*position of circles*/
  var x = Math.random() * (canvas.width - radius * 2) + radius;
  var y = Math.random() * (canvas.height - radius * 2) + radius;

  /*movement */
  dx = (Math.random() - 0.5);
  dy = (Math.random() - 0.5);

  circleArray.push(new createCircle(x, y, dx, dy, radius));
}


function animate() {
  requestAnimationFrame(animate);
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  for (var i = 0; i < circleArray.length; i++) {
    circleArray[i].update();
  }

}

animate();