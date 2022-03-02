var canvas = document.getElementById('canvas');
var ctx = canvas.getContext('2d');

var tempText = "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Esse vitae praesentium eveniet natus maxime. Qui hic nesciunt enim molestiae voluptas.";
var input = document.getElementById('input');
input.value = tempText;
canvas.width = innerWidth - 80;
canvas.height = innerHeight - 120;
var width = +(canvas.width);
var height = +(canvas.height);
var fontFamily = "Arial";
var fontSize = 24;
var fontColour = "#00ffdccf";

function fragmentText(text, maxWidth) {
  var words = text.split(' '),
    lines = [],
    line = "";
  if (ctx.measureText(text).width < maxWidth) {
    return [text];
  }
  while (words.length > 0) {
    while (ctx.measureText(words[0]).width >= maxWidth) {
      var tmp = words[0];
      words[0] = tmp.slice(0, -1);
      if (words.length > 1) {
        words[1] = tmp.slice(-1) + words[1];
      } else {
        words.push(tmp.slice(-1));
      }
    }
    if (ctx.measureText(line + words[0]).width < maxWidth) {
      line += words.shift() + " ";
    } else {
      lines.push(line);
      line = "";
    }
    if (words.length === 0) {
      lines.push(line);
    }
  }
  return lines;
}

const rect1 = {
  x: 20,
  y: 20,
  w: Math.min(400, canvas.width - 40),
  h: Math.min(400, canvas.height - 40)
}

function draw() {
  ctx.clearRect(0, 0, width, height);
  ctx.fillStyle = "#A67458";
  ctx.fillRect(rect1.x, rect1.y, rect1.w, rect1.h);
  ctx.save();
  ctx.font = fontSize + "px " + fontFamily;
  ctx.textAlign = "center";
  ctx.fillStyle = fontColour;
  var lines = fragmentText(input.value, (rect1.w - fontSize));
  lines.forEach(function (line, i) {
    // ctx.fillText(line, rect1.w / 2 + rect1.x, (rect1.y) + (i + 1) * parseInt(fontSize, 0));

    /* for centered aligned text */
    ctx.fillText(line, (rect1.w/2 + rect1.x) , rect1.h/2 - rect1.y + (i + 1) * parseInt(fontSize, 0));
  });
  ctx.restore();
}
addEventListener('load', () => {
  draw();
})
input.onkeyup = function (e) { // keyup because we need to know what the entered text is.
  draw();
};
// width - parseInt(fontSize, 0)