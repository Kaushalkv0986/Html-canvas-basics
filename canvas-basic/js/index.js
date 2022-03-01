const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');


//fillRect()
ctx.fillStyle = 'red';

/* (x, y, width, height) -> x,y will be top left cords */
ctx.fillRect(20, 30, 150, 100);

ctx.fillStyle = 'grey';
ctx.fillRect(200, 30, 150, 100);

//strokeRect()
ctx.lineWidth = 5;
ctx.strokeStyle = '#b324b1';
ctx.strokeRect(20, 150, 150, 100);

//clearRect()
ctx.clearRect(30, 35, 130, 85);

//fillText()
ctx.font = '30px Arial';
ctx.fillStyle = 'purple';
ctx.fillText("Hello World", 200, 200);

//strokeText()
ctx.font = '35px Times New Roman'
ctx.lineWidth = 1;
ctx.strokeStyle = 'black';
ctx.strokeText('Hello World', 400, 200);
