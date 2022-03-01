const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');

//paths
ctx.beginPath();
ctx.moveTo(50, 50);
ctx.lineTo(150, 50);
ctx.lineTo(100, 200);
ctx.lineTo(50, 50); //or we can use ctx.closePath();
// ctx.stroke();

ctx.fillStyle = 'coral';
ctx.fill();

ctx.beginPath();
ctx.moveTo(200, 50);
ctx.lineTo(150, 200);
ctx.lineTo(250, 200);
ctx.closePath();
ctx.stroke();

/* Rectangle */
ctx.beginPath();
ctx.rect(300, 50, 150, 100);
ctx.fillStyle = 'teal';
ctx.fill();

ctx.beginPath();
ctx.lineWidth = 2;
ctx.moveTo(0, 220);
ctx.lineTo(canvas.width, 220);
ctx.fillStyle = 'black';
ctx.stroke();
