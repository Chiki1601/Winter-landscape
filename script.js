var canvas = document.querySelector("#sparkLights");
var ctx = canvas.getContext("2d");

var WIDTH = window.innerWidth;
var HEIGHT = window.innerHeight;
var MIN_SPEED = 0.5;
var MAX_SPEED = 1;
var MAX_RADIUS = 3;
var COUNT = 200
var FIRST_COLOR = 'rgba(237, 185, 255, 1)';
var SECOUND_COLOR = 'rgba( 237, 228, 242, 0.2)';
var BLINK = 4;
canvas.width = WIDTH;
canvas.height = HEIGHT;


var gradient;
var particles = [];
var create = function(){
  if(particles.length > COUNT){
    particles.splice(Math.floor(Math.random()*particles.length),1);
  }
  var p = {
    x:Math.random()*WIDTH,
    y:Math.random()*100,
    xVel:0,
    yVel:Math.random()*(MAX_SPEED - MIN_SPEED + 1) + MIN_SPEED,
    radius:Math.random()*MAX_RADIUS,
    maxRadius: 0,
    maxBlink:0,
    pulse: 0,
    blink: Math.floor(Math.random()*BLINK+1)
  };
  p.maxRadius = p.radius;
  p.maxBlink = p.blink;
  particles.push(p);
};
var draw = function(){
  ctx.clearRect(0,0,canvas.width,canvas.height);
  particles.forEach(function(p){
    gradient = ctx.createRadialGradient(p.x,p.y,0,p.x,p.y,p.radius);
    gradient.addColorStop(0, FIRST_COLOR);
    gradient.addColorStop(1, SECOUND_COLOR);
    ctx.beginPath();
    ctx.arc(p.x,p.y,p.radius,0,Math.PI*2);
    ctx.fillStyle = gradient;
    ctx.fill();
  });
};
var move = function(){
  particles.forEach(function(p){
    p.y += p.yVel;
  });
};
var loop = function(){
  create();
  move();
  draw();
  
 window.requestAnimationFrame(loop);
};
loop()