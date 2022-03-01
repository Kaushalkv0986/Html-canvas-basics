const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');

//Arc (circles)
ctx.beginPath();

const width = canvas.width;
const height = canvas.height;
const centerX = width/2;
const centerY = height/2;

// Draw head
// (x, y, radius, start_angle, math.pi)
ctx.arc(centerX, centerY, (width - 100)/2, 0, Math.PI * 2);

//Move to mouth
ctx.moveTo(centerX + 200, centerY);

//draw mouth
/*math.pi for half circle and false for clockwise */
ctx.arc(centerX, centerY, 200, 0, Math.PI, false);

// Move to left eye
ctx.moveTo(centerX - 60, centerY-80);
ctx.arc(centerX-80, centerY-80, 20, 0, Math.PI * 2);
 

ctx.moveTo(centerX + 100, centerY-80);
ctx.arc(centerX+80, centerY-80, 20, 0, Math.PI * 2);
ctx.stroke();
