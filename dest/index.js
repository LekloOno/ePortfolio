import { Vector2 } from "./Model/Vector2.js";
import { Game } from "./Model/Game.js";
const brushBar = document.createElement("div");
brushBar.id = "sandBoxBrush";
const massControl = document.createElement("div");
massControl.id = "mass";
massControl.textContent = "Mass ";
var mass = 100000;
const maxMass = 1000000000000;
const massSlider = document.createElement("input");
massSlider.id = "massSlider";
massSlider.type = "range";
massSlider.min = "10";
massSlider.max = "1000";
massSlider.addEventListener("change", (event) => {
    let val = Number(massSlider.value) / 1000;
    let exp = val ** 10;
    mass = (exp) * maxMass;
    massInput.value = Math.round(mass) + "";
});
const massInput = document.createElement("input");
massInput.id = "massInput";
massInput.type = "number";
massInput.addEventListener("change", (event) => {
    let val = Number(massInput.value);
    if (isNaN(val))
        return;
    let sliderVal = Math.max(Math.min((val / maxMass) ** 0.1, 1), 0) * 1000;
    massSlider.value = sliderVal + "";
    mass = val;
});
massControl.appendChild(massSlider);
massControl.appendChild(massInput);
const radiusControl = document.createElement("div");
radiusControl.id = "radius";
radiusControl.textContent = "Radius ";
var radius = 10;
const maxRadius = 50;
const radiusSlider = document.createElement("input");
radiusSlider.id = "radiusSlider";
radiusSlider.type = "range";
radiusSlider.min = "0";
radiusSlider.max = "1000";
radiusSlider.addEventListener("change", (event) => {
    let val = Number(radiusSlider.value) / 1000;
    let exp = val;
    radius = (exp) * maxRadius;
    radiusInput.value = Math.round(radius) + "";
});
const radiusInput = document.createElement("input");
radiusInput.id = "radiusInput";
radiusInput.type = "number";
radiusInput.addEventListener("change", (event) => {
    let val = Number(radiusInput.value);
    if (isNaN(val))
        return;
    let sliderVal = Math.max(Math.min((val / maxRadius) ** 0.1, 1), 0) * 1000;
    radiusSlider.value = sliderVal + "";
    radius = val;
});
radiusControl.appendChild(radiusSlider);
radiusControl.appendChild(radiusInput);
const colorHelp = document.createElement("input");
const colorHelpLabel = document.createElement("label");
colorHelpLabel.textContent = "Color Help ";
colorHelp.id = "colorHelp";
colorHelp.type = "checkbox";
colorHelp.addEventListener("change", (event) => {
    game.colorHelp = colorHelp.checked;
    if (!run)
        game.draw();
});
const pause = document.createElement("div");
pause.id = "pause";
pause.textContent = "Pause";
pause.hidden = true;
brushBar.append(massControl);
brushBar.append(radiusControl);
brushBar.append(colorHelpLabel);
brushBar.append(colorHelp);
document.body.appendChild(brushBar);
document.body.appendChild(pause);
const game = new Game(Vector2.null, 4000);
function createPageElement(mass, radius, velocity, position) {
    game.createPageElement(mass, radius, velocity, position);
}
function createPageElementWithBody(body) {
    game.createPageElementWithBody(body);
}
createPageElement(10000000000, 5, new Vector2(0.08, 0.01), new Vector2(500, 300));
createPageElement(1000000, 5, new Vector2(0.12, 0), new Vector2(400, 200));
createPageElement(800000000000, 5, new Vector2(-0.06, 0.2), new Vector2(1000, 0));
createPageElement(500000000000, 5, new Vector2(0.2, -0.07), new Vector2(200, 1500));
//const lastTime = new Date().getTime();
var run = true;
var mousePos = Vector2.null;
addEventListener("mousemove", (event) => {
    mousePos = new Vector2(event.x, event.y);
    if (dragging) {
        let delta = dragStartingPos.minus(mousePos);
        delta = delta.divide(new Vector2(window.innerWidth, window.innerHeight)).dot(new Vector2(game.zoom, game.zoom / (window.innerWidth / window.innerHeight)));
        game.position = dragStartingAnchor.add(delta);
        if (!run) {
            game.draw();
        }
    }
});
game.pageElements.addEventListener("click", (event) => {
    createPageElement(mass, radius, new Vector2(0.05, 0), game.screenToRealWorld(new Vector2(event.x, event.y)));
    if (!run) {
        game.draw();
    }
});
game.pageElements.addEventListener("wheel", (event) => {
    let zoomValue = (event.deltaY * (game.zoom ** 1.2)) / 12000;
    let limit = zoomValue + game.zoom < ((10 ** 10));
    if (!isNaN(zoomValue) && limit)
        game.pointedZoom(zoomValue, mousePos);
    if (!run)
        game.draw();
});
var intervalId = setInterval(gameLoop, game.universe.physicsTimeStep);
addEventListener("keypress", (event) => {
    if (event.key == " ") {
        if (run) {
            clearInterval(intervalId);
            pause.hidden = false;
        }
        else {
            intervalId = setInterval(gameLoop, game.universe.physicsTimeStep);
            pause.hidden = true;
        }
        run = !run;
    }
});
var dragging = false;
var dragStartingPos = Vector2.null;
var dragStartingAnchor = Vector2.null;
addEventListener("mousedown", (event) => {
    if (event.button == 1) {
        dragStartingPos = mousePos;
        dragStartingAnchor = game.position;
        dragging = true;
    }
});
game.pageElements.addEventListener("mouseup", (event) => {
    if (event.button == 1) {
        dragging = false;
    }
});
function gameLoop() {
    game.gameLoop();
}
