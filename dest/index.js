import { Body } from "./Model/Body.js";
import { Vector2 } from "./Model/Vector2.js";
import { Game } from "./Model/Game.js";
import { BrushBar } from "./View/BrushBar/BrushBar.js";
import { Pause } from "./View/Pause.js";
import { VelocityInit } from "./View/VelocityInit.js";
const game = new Game(Vector2.null, 700);
const brushBar = new BrushBar(game);
const pause = new Pause(game);
const selection = game.selection;
const velocityInit = new VelocityInit(game, brushBar);
var sandBoxActivated = false;
addEventListener("load", (event) => {
    const app = document.getElementById("app");
    if (app != null)
        game.app = app;
    game.initPageElement();
    app === null || app === void 0 ? void 0 : app.appendChild(brushBar.brushBar);
    app === null || app === void 0 ? void 0 : app.appendChild(pause.pause);
    app === null || app === void 0 ? void 0 : app.appendChild(selection.selectionVis);
    app === null || app === void 0 ? void 0 : app.appendChild(selection.followingMessage);
    app === null || app === void 0 ? void 0 : app.appendChild(velocityInit.velocityVis);
    //const sunVel = new Vector2(0.8, 0.4);
    const sunVel = new Vector2(0, 0);
    const sun = createStarSystem(Vector2.null, sunVel);
    game.follow(sun);
    //const otherStarVel = new Vector2(0, -0.3);
    const otherStarVel = new Vector2(-0.8, -0.7);
    const otherStarPos = new Vector2(70000, 60700);
    createStarSystem(otherStarPos, otherStarVel);
    //createPageElement(100000000000000000, 10000, new Vector2(2.4, -2.4), new Vector2(-220000, 330000));
    createPageElement(100000000000000000, 10000, new Vector2(1.6, -2.8), new Vector2(-220000, 330000));
});
function createPageElement(mass, radius, velocity, position) {
    game.createPageElement(mass, radius, velocity, position);
}
function createPageElementWithBody(body) {
    game.createPageElementWithBody(body);
}
function createPageElementAround(body, mass, radius, velocity, position) {
    game.createPageElementAround(body, mass, radius, velocity, position);
}
function createPageElementWithBodiesAround(body, bodies) {
    game.createPageElementWithBodiesAround(body, bodies);
}
function createStarSystem(center, starVel) {
    let star = new Body(1000000000000, 100, starVel, center);
    createPageElementWithBody(star);
    let bodies = [];
    bodies.push(new Body(3000000000, 10, new Vector2(0.6, 0), new Vector2(0, 200)));
    bodies.push(new Body(6000000, 3, new Vector2(0.72, 0), new Vector2(0, 185)));
    bodies.push(new Body(10000000, 6, new Vector2(0.2, 0), new Vector2(0, 400)));
    bodies.push(new Body(8000000000, 15, new Vector2(-0.4, 0), new Vector2(0, -400)));
    bodies.push(new Body(10000000, 6, new Vector2(-0.27, 0), new Vector2(0, -430)));
    bodies.push(new Body(60000000, 8, new Vector2(-0.28, 0), new Vector2(0, -447)));
    bodies.push(new Body(50000000000, 25, new Vector2(-0.28, 0), new Vector2(0, 800)));
    bodies.push(new Body(6000000, 3, new Vector2(-0.12, 0), new Vector2(0, 880)));
    bodies.push(new Body(6000000, 3, new Vector2(0.05, 0), new Vector2(0, 830)));
    bodies.push(new Body(30000000, 7, new Vector2(0, 0.25), new Vector2(1200, 0)));
    bodies.push(new Body(40000000, 8, new Vector2(-0.26, -0.032), new Vector2(1000, 650)));
    createPageElementWithBodiesAround(star, bodies);
    return star;
}
var mousePos = Vector2.null;
addEventListener("mousemove", (event) => {
    mousePos = new Vector2(event.x, event.y);
    if (moving) {
        let delta = dragStartingPos.minus(mousePos);
        delta = delta.divide(new Vector2(window.innerWidth, window.innerHeight)).prod(new Vector2(game.zoom, game.zoom / (window.innerWidth / window.innerHeight)));
        game.position = moveStartingAnchor.add(delta);
    }
    else if (selecting) {
    }
});
game.pageElements.addEventListener("click", (event) => {
    if (!sandBoxActivated)
        return;
    if (!event.ctrlKey && dragStartingPos.distance(mousePos) < 15) {
        createPageElement(brushBar.mass, brushBar.radius, Vector2.null, game.screenToRealWorld(new Vector2(event.x, event.y)));
    }
});
document.body.addEventListener("wheel", (event) => {
    let zoomValue = (event.deltaY * (game.targetZoom ** 1.2)) / 12000;
    if (!sandBoxActivated)
        zoomValue /= 3;
    let limit = zoomValue + game.targetZoom < ((10 ** 10));
    if (!isNaN(zoomValue) && limit)
        game.pointedZoom(zoomValue, mousePos);
});
var moving = false;
var selecting = false;
var dragStartingPos = Vector2.null;
var moveStartingAnchor = Vector2.null;
game.pageElements.addEventListener("mousedown", (event) => {
    if (!sandBoxActivated)
        return;
    dragStartingPos = mousePos;
    if (event.button == 1) {
        moveStartingAnchor = game.position;
        moving = true;
    }
});
addEventListener("mouseup", (event) => {
    if (!sandBoxActivated)
        return;
    if (event.button == 1) {
        moving = false;
    }
});
addEventListener("keypress", (event) => {
    if (event.key == "m") {
        sandBoxActivated = !sandBoxActivated;
        pause.activate();
        selection.activate();
        velocityInit.activate();
        brushBar.activate();
    }
});
