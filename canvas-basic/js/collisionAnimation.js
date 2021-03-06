const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const mouse = {
  x: null,
  y: null
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

  /** reinitializing the circleArray when screen is resized **/
  circleArray = [];
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


function rotate(velocity, angle) {
  const rotatedVelocities = {
    x: velocity.x * Math.cos(angle) - velocity.y * Math.sin(angle),
    y: velocity.x * Math.sin(angle) + velocity.y * Math.cos(angle)
  };
  return rotatedVelocities;
}

/****
 * Swaps out two colliding particles's x and y velocities after running
 * through an elastic collision reaction equation.
 * 
 * @param Object | particle      | A particle object(circle here) with x and y coordinates, plus velocity.
 * @param Object | otherParticle | A particle object(circle here) with x and y coordinates, plus velocity.
 * @return Null  | Does not return a value
 * ****/

function resolveCollision(particle, otherParticle) {
  const xVelocityDiff = particle.velocity.x - otherParticle.velocity.x;
  const yVelocityDiff = particle.velocity.y - otherParticle.velocity.y;

  const xDist = otherParticle.x - particle.x;
  const yDist = otherParticle.y - particle.y;

  // Prevent accidental overlap of particles
  if (xVelocityDiff * xDist + yVelocityDiff * yDist >= 0) {
    //Grab angle between the two colliding particles.
    const angle = -Math.atan2(yDist, xDist);

    //Store mass in var for better readability in collision equation.
    const m1 = particle.mass;
    const m2 = otherParticle.mass;

    //velocity before equation.
    const u1 = rotate(particle.velocity, angle);
    const u2 = rotate(otherParticle.velocity, angle);

    // Velocity after 1d collision equation
    const v1 = { x: u1.x * (m1 - m2) / (m1 + m2) + u2.x * 2 * m2 / (m1 + m2), y: u1.y };
    const v2 = { x: u2.x * (m1 - m2) / (m1 + m2) + u1.x * 2 * m2 / (m1 + m2), y: u2.y };

    // Final velocity after rotating axis back to original location
    const vFinal1 = rotate(v1, - angle);
    const vFinal2 = rotate(v2, -angle);

    // Swap particle velocities for realistic bounce effect
    particle.velocity.x = vFinal1.x;
    particle.velocity.y = vFinal1.y;

    /*decreasing the velocity a bit */
    otherParticle.velocity.x = vFinal2.x * 0.99;
    otherParticle.velocity.y = vFinal2.y * 0.99;
  }

}

function createCircle(x, y, radius, color) {
  this.x = x;
  this.y = y;
  this.radius = radius;
  this.color = colorArray[Math.floor(Math.random() * colorArray.length)];
  this.fillColor = 'rgba(0,0,0,0)';
  this.mass = 1;
  this.velocity = {
    x: randomIntInRange(-1, 1),
    y: randomIntInRange(-1, 1)
  };
  // this.color = colorArray[Math.floor(Math.random() * colorArray.length)];


  this.draw = () => {
    ctx.beginPath();
    ctx.arc(
      this.x,
      this.y,
      this.radius,
      Math.PI * 2,
      false
    );
    ctx.strokeStyle = this.color;
    ctx.stroke();
    ctx.save();
    ctx.globalAlpha = 0.4;
    ctx.fillStyle = this.fillColor;
    ctx.fill();
    ctx.restore();
    ctx.closePath();

  }; //draw end

  this.update = (circleArray) => {
    this.draw();

    for (let i = 0; i < circleArray.length; i++) {
      if (this === circleArray[i]) continue;

      if (getDistance(this.x, this.y, circleArray[i].x, circleArray[i].y) - (this.radius * 2) < 0) {
        resolveCollision(this, circleArray[i]);
      }
    }
    if (
      this.x + this.radius > canvas.width ||
      this.x - this.radius < 0
    ) {
      this.velocity.x = -this.velocity.x;
    }

    /* Bounce back the circle if touching Y boundaries */
    if (
      this.y + this.radius > canvas.height ||
      this.y - this.radius < 0
    ) {
      this.velocity.y = -this.velocity.y;
    }

    this.x += this.velocity.x;
    this.y += this.velocity.y;

    // mouse interactivity
    /*increase the radius if circle is around 40px of mouse */
    if (
      mouse.x - this.x < 100 &&
      mouse.x - this.x > -100 &&
      mouse.y - this.y < 100 &&
      mouse.y - this.y > -100
    ) {
      this.fillColor = this.color;
    }

    else {
      this.fillColor = 'rgba(0, 0, 0, 0)';
    }

    if (
      mouse.x - this.x < 20 &&
      mouse.x - this.x > -20 &&
      mouse.y - this.y < 20 &&
      mouse.y - this.y > -20
    ) {
      addEventListener('click', (e) => {
        this.velocity = {
          x: randomIntInRange(-5, 5),
          y: randomIntInRange(-5, 5)
        }
      })

      this.velocity = {
        x: Math.random(),
        y: Math.random()
      }
    }

  }
}


var circleArray = [];

function init() {

  for (var i = 0; i < 200; i++) {

    //random radius of circles from 1 to 6
    var radius = 10;
    /*position of circles*/
    var x = randomIntInRange(radius, canvas.width - (radius * 2));
    var y = randomIntInRange(radius, canvas.height - (radius * 2));

    let color = 'blue';

    for (var j = 0; j < circleArray.length; j++) {
      if (
        getDistance(x, y, circleArray[j].x, circleArray[j].y)
        - (radius * 2)
        < 0
      ) {
        x = randomIntInRange(radius, canvas.width - (radius * 2));
        y = randomIntInRange(radius, canvas.height - (radius * 2));

        j = -1;
      }
    }
    circleArray.push(new createCircle(x, y, radius, color));
  }
}
init();

function animate() {
  requestAnimationFrame(animate);
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  for (var i = 0; i < circleArray.length; i++) {
    circleArray[i].update(circleArray);
  }
}

animate();