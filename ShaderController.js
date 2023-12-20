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
var targetPos = new Vector2(0, 0);

function lerp(a, b, f){
  return a + f*(b-a);
}

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
    targetPos.x = parseFloat(document.getElementById("positionX").textContent);
    targetPos.y = parseFloat(document.getElementById("positionY").textContent);

    if(isNaN(targetPos.x)) targetPos.x = 0;
    if(isNaN(targetPos.y)) targetPos.y = 0;
  
    pos.x = lerp(pos.x, targetPos.x, 0.1);
    pos.y = lerp(pos.y, targetPos.y, 0.1);

    console.log(pos.x);
    ctx.posX = ctx.toShaderX(pos.x);
    ctx.posY = ctx.toShaderY(pos.y);
    //console.log(targetPosX);
  },
  shaders: {
    image: {
      uniforms: {
        iTime: (gl, loc) => gl.uniform1f(loc, performance.now() / 1000),
        iResolution: (gl, loc, ctx) => gl.uniform2f(loc, ctx.width, ctx.height),
        iPos: (gl, loc, ctx) => gl.uniform2f(loc, ctx.posX, ctx.posY),
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