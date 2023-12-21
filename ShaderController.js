// mouse coordinates taken from from the mousemove event expressed in "CSS pixels"

class Vector2 {
  x;
  y;
  
  constructor(x, y){
    this.x = x;
    this.y = y;
  }
}

var pos = new Vector2(0, 0);
var realPos = new Vector2(0, 0);
var prevPos = new Vector2(0, 0);
var targetPos = new Vector2(0, 0);
var prevTargetPos = new Vector2(0, 0);
var vel = new Vector2(0, 0);

var targetMouse = new Vector2(0, 0);
var mouse = new Vector2(0, 0);

var maxSpeed = 40;

function lerp(a, b, f){
  return a + f*(b-a);
}

function lerpv(a, b, f){
  return new Vector2(lerp(a.x, b.x, f), lerp(a.y, b.y, f));
}

document.addEventListener("mousemove", (event) => {
  targetMouse.x = event.clientX;
  targetMouse.y = event.clientY;
});

shaderWebBackground.shade({

  // called only once before the first run
  onInit: (ctx) => {
    // we can center the mouse even before any "mousemove" event occurs
    // note, we are 

    // for convenience you can store your attributes on context
    ctx.iFrame = 0;
  },
  onResize: (width, height, ctx) => {
    ctx.iMinDimension = Math.min(width, height);
  },                 
  onBeforeFrame: (ctx) => {
    prevTargetPos.x = targetPos.x;
    prevTargetPos.y = targetPos.y;

    targetPos.x = parseFloat(document.getElementById("positionX").textContent);
    targetPos.y = parseFloat(document.getElementById("positionY").textContent);

    
    if(isNaN(targetPos.x)) targetPos.x = 0;
    if(isNaN(targetPos.y)) targetPos.y = 0;

    prevPos.x = pos.x;
    prevPos.y = pos.y;

    let deltaX = targetPos.x - prevTargetPos.x;
    let deltaY = targetPos.y - prevTargetPos.y;

    vel.x = Math.sign(deltaX)*Math.min(Math.abs(deltaX), maxSpeed);
    vel.y = Math.sign(deltaY)*Math.min(Math.abs(deltaY), maxSpeed);

    pos.x += vel.x;
    pos.y += vel.y;

    realPos = lerpv(realPos, pos, 0.1);
    //realPos.x = lerp(realPos.x, pos.x, 0.1);
    //realPos.y = lerp(realPos.y, pos.y, 0.1);

    ctx.posX = ctx.toShaderX(realPos.x);
    ctx.posY = ctx.toShaderY(realPos.y);


    mouse = lerpv(mouse, targetMouse, 0.005);
    ctx.shaderMouseX = ctx.toShaderX(mouse.x);
    ctx.shaderMouseY = ctx.toShaderY(mouse.y);
  },
  shaders: {
    image: {
      uniforms: {
        iTime: (gl, loc) => gl.uniform1f(loc, performance.now() / 1000),
        iResolution: (gl, loc, ctx) => gl.uniform2f(loc, ctx.width, ctx.height),
        iPos: (gl, loc, ctx) => gl.uniform2f(loc, ctx.posX, ctx.posY),
        iMouse: (gl, loc, ctx) => gl.uniform2f(loc, ctx.shaderMouseX, ctx.shaderMouseY),
      }
    }
  },
  onAfterFrame: (ctx) => {
    ctx.iFrame++;
  },
  // custom error handler
  onError: (error, canvas) => {
    canvas.remove();
    console.error(error);
    document.documentElement.classList.add("my-fallback");
  }
});