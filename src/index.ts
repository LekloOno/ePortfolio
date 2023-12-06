import { Body } from "./Model/Body.js";
import { Vector2 } from "./Model/Vector2.js";
import { Game } from "./Model/Game.js";
import { BrushBar } from "./View/BrushBar/BrushBar.js";
import { Pause } from "./View/Pause.js";
import { Selection } from "./View/Selection.js";


const game: Game = new Game(Vector2.null, 4000);
const brushBar = new BrushBar(game);
const pause = new Pause(game);
const selection = new Selection(game);

document.body.appendChild(brushBar.brushBar);
document.body.appendChild(pause.pause);
document.body.appendChild(selection.selectionVis);

function createPageElement(mass: number, radius: number, velocity: Vector2, position: Vector2) {
    game.createPageElement(mass, radius, velocity, position);
}

function createPageElementWithBody(body: Body) {
    game.createPageElementWithBody(body);
}

createPageElement(10000000000, 5, new Vector2(0.08, 0.01), new Vector2(500,300));
createPageElement(1000000, 5, new Vector2(0.12, 0), new Vector2(400,200));
createPageElement(800000000000, 5, new Vector2(-0.06, 0.2), new Vector2(1000,0));
createPageElement(500000000000, 5, new Vector2(0.2, -0.07), new Vector2(200,1500));
//const lastTime = new Date().getTime();

var mousePos: Vector2 = Vector2.null;
addEventListener("mousemove", (event) => {
    mousePos = new Vector2(event.x, event.y);
    if(moving) {
        let delta = dragStartingPos.minus(mousePos);
        delta = delta.divide(new Vector2(window.innerWidth, window.innerHeight)).dot(new Vector2(game.zoom, game.zoom/(window.innerWidth/window.innerHeight)));
        game.position = moveStartingAnchor.add(delta);

        if(!game.isRunning) {
            game.draw();
        }
    } else if(selecting) {

    }
})

game.pageElements.addEventListener("click", (event) => {
    createPageElement(brushBar.mass, brushBar.radius, new Vector2(0.05, 0), game.screenToRealWorld(new Vector2(event.x, event.y)));
    if(!game.isRunning){
        game.draw();
    }
});

game.pageElements.addEventListener("wheel", (event) => {
    let zoomValue = (event.deltaY*(game.zoom**1.2))/12000;
    let limit = zoomValue+game.zoom < ((10**10));
    if(!isNaN(zoomValue) && limit) game.pointedZoom(zoomValue, mousePos);
    if(!game.isRunning) game.draw();
});

var moving = false;
var selecting = false;

var dragStartingPos: Vector2 = Vector2.null;
var moveStartingAnchor: Vector2 = Vector2.null;

game.pageElements.addEventListener("mousedown", (event) => {
    if(event.button == 1){
        dragStartingPos = mousePos;
        moveStartingAnchor = game.position;
        moving = true;
    }
});

addEventListener("mouseup", (event) => {
    if(event.button == 1){
        moving = false;
    }
});