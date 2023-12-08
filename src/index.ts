import { Body } from "./Model/Body.js";
import { Vector2 } from "./Model/Vector2.js";
import { Game } from "./Model/Game.js";
import { BrushBar } from "./View/BrushBar/BrushBar.js";
import { Pause } from "./View/Pause.js";
import { VelocityInit } from "./View/VelocityInit.js";

const game: Game = new Game(Vector2.null, 4000);
const brushBar = new BrushBar(game);
const pause = new Pause(game);
const selection = game.selection;
const velocityInit = new VelocityInit(game, brushBar);

document.body.appendChild(brushBar.brushBar);
document.body.appendChild(pause.pause);
document.body.appendChild(selection.selectionVis);
document.body.appendChild(selection.followingMessage);
document.body.appendChild(velocityInit.velocityVis);

function createPageElement(mass: number, radius: number, velocity: Vector2, position: Vector2) {
    game.createPageElement(mass, radius, velocity, position);
}

function createPageElementWithBody(body: Body) {
    game.createPageElementWithBody(body);
}

const sun:Body = new Body(1000000000000, 100, Vector2.null, Vector2.null);

createPageElementWithBody(sun);
game.follow(sun);

createPageElement(3000000000, 10, new Vector2(0.6, 0), new Vector2(0, 200));
createPageElement(6000000, 3, new Vector2(0.72, 0), new Vector2(0, 185));
createPageElement(10000000, 6, new Vector2(0.2, 0), new Vector2(0, 400));
createPageElement(8000000000, 15, new Vector2(-0.4, 0), new Vector2(0, -400));
createPageElement(10000000, 6, new Vector2(-0.27, 0), new Vector2(0, -430));
createPageElement(60000000, 8, new Vector2(-0.28, 0), new Vector2(0, -447));
createPageElement(50000000000, 25, new Vector2(-0.28, 0), new Vector2(0, 800));
createPageElement(6000000, 3, new Vector2(-0.12, 0), new Vector2(0, 880));
createPageElement(6000000, 3, new Vector2(0.05, 0), new Vector2(0, 830));
createPageElement(30000000, 7, new Vector2(0, 0.25), new Vector2(1200, 0));

createPageElement(40000000, 8, new Vector2(-0.26, -0.032), new Vector2(1000, 650));

var mousePos: Vector2 = Vector2.null;
addEventListener("mousemove", (event) => {
    mousePos = new Vector2(event.x, event.y);
    if(moving) {
        let delta = dragStartingPos.minus(mousePos);
        delta = delta.divide(new Vector2(window.innerWidth, window.innerHeight)).prod(new Vector2(game.zoom, game.zoom/(window.innerWidth/window.innerHeight)));
        game.position = moveStartingAnchor.add(delta);
    } else if(selecting) {

    }
})

game.pageElements.addEventListener("click", (event) => {
    if(!event.ctrlKey && dragStartingPos.distance(mousePos) < 15){
        createPageElement(brushBar.mass, brushBar.radius, Vector2.null, game.screenToRealWorld(new Vector2(event.x, event.y)));
    }
});

game.pageElements.addEventListener("wheel", (event) => {
    let zoomValue = (event.deltaY*(game.targetZoom**1.2))/12000;
    let limit = zoomValue+game.targetZoom < ((10**10));
    if(!isNaN(zoomValue) && limit) game.pointedZoom(zoomValue, mousePos);
});

var moving = false;
var selecting = false;

var dragStartingPos: Vector2 = Vector2.null;
var moveStartingAnchor: Vector2 = Vector2.null;

game.pageElements.addEventListener("mousedown", (event) => {
    dragStartingPos = mousePos;
    if(event.button == 1){
        moveStartingAnchor = game.position;
        moving = true;
    }
});

addEventListener("mouseup", (event) => {
    if(event.button == 1){
        moving = false;
    }
});