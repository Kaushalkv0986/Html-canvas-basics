const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');

const mouse = {
  x: innerWidth,
  y: innerHeight
}
addEventListener('mousemove', (e)=>{
  mouse.x = e.clientX -240;
  mouse.y = e.clientY-105;
})
const rect1 = {
  x: 20,
  y: 20,
  h: 100,
  w: 120
}
const rect2 = {
  x: 140,
  y: 20,
  h: 100,
  w: 120
}
function animate (){
  requestAnimationFrame(animate);
  /*fill the rect with white background */
  ctx.fillStyle = "#FFF";
  ctx.fillRect(0,0,canvas.width, canvas.height);

  if (
    mouse.x + rect1.w >= rect2.x &&
    mouse.x <= rect2.x + rect2.w &&
    mouse.y + rect1.h >= rect2.y &&
    mouse.y <= rect2.y + rect2.h
  ){
    console.log("colliding");
  }
  
  //first rect (movable with mouse)
  ctx.fillStyle = '#1a1a23';
  ctx.fillRect(mouse.x, mouse.y, rect1.w, rect1.h);
  
  //second rect
  ctx.fillStyle = '#92abea';
  ctx.fillRect(rect2.x, rect2.y, rect2.w, rect2.h);
}

animate();
