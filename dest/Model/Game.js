import { Universe } from "./Universe.js";
import { Vector2 } from "./Vector2.js";
import { Body } from "./Body.js";
export class Game {
    constructor(position, zoom) {
        this.colorHelp = false;
        this.position = position;
        this.zoom = zoom;
        this.universe = new Universe();
        this.pageElements = document.createElement("div");
        this.pageElements.id = "universe";
        document.body.appendChild(this.pageElements);
    }
    pointedZoom(amount, mousePos) {
        let nextZoom = this.zoom + amount;
        let worldPos = this.screenToRealWorld(mousePos);
        let v = worldPos.minus(worldPos.minus(this.position).kDot(nextZoom).kDivide(this.zoom));
        this.zoom = nextZoom;
        this.position = v;
    }
    screenToRealWorld(pos) {
        let x = this.position.x - this.zoom / 2 + (pos.x * this.zoom / window.innerWidth);
        let yZoom = this.zoom / (window.innerWidth / window.innerHeight);
        let y = this.position.y - yZoom / 2 + (pos.y * yZoom / window.innerHeight);
        return new Vector2(x, y);
    }
    screenToWorldSize(obj) {
        let x = obj.x * this.zoom / window.innerWidth;
        let y = obj.y * this.zoom / window.innerWidth;
        return new Vector2(x, y);
    }
    worldToScreenSize(obj) {
        let x = (obj.x / this.zoom) * window.innerWidth;
        let y = (obj.y / this.zoom) * window.innerWidth;
        return new Vector2(x, y);
    }
    draw() {
        this.pageElements.innerHTML = "";
        let i = 1;
        this.universe.bodies.forEach((body) => {
            let aspectRatio = window.innerWidth / window.innerHeight;
            let camToBody = this.position.minus(body.position);
            let pixelSize = this.screenToWorldSize(new Vector2(body.radius, body.radius));
            if (Math.abs(camToBody.x) - pixelSize.x < this.zoom / 2 && Math.abs(camToBody.y) - pixelSize.y < this.zoom / 2 / aspectRatio) {
                this.drawPageElement(body, i++);
            }
            else
                console.log("zizi");
        });
    }
    drawPageElement(body, id) {
        let p = document.createElement("div");
        p.className = "dot";
        p.id = id + "";
        let radius = Math.max(1, this.worldToScreenSize(new Vector2(body.radius, body.radius)).x);
        p.style.height = radius + "px";
        p.style.width = radius + "px";
        p.style.borderRadius = radius + "px";
        p.style.transform = "translate(-50%, -50%)";
        if (this.colorHelp) {
            let colorRate = Math.min(((body.mass) / 1000000000000) ** 0.1, 1);
            let colorB = colorRate * 255;
            let colorG = colorRate * 255;
            p.style.backgroundColor = `rgb(255, ${colorG}, ${colorB})`;
        }
        let screenPos = this.screenDistance(body.position);
        p.style.left = `${screenPos.x}px`;
        p.style.top = `${screenPos.y}px`;
        this.pageElements.appendChild(p);
    }
    screenDistance(position) {
        let centerDist = position.minus(this.position).kDot(window.innerWidth).kDivide(this.zoom);
        let windowVect = new Vector2(innerWidth / 2, innerHeight / 2);
        return centerDist.add(windowVect);
    }
    createPageElement(mass, radius, velocity, position) {
        // const p = document.createElement("div");
        // p.className = "dot";
        // p.id = this.universe.bodies.length + "";
        // p.style.left = `${position.x}px`;
        // p.style.top = `${position.y}px`;
        // this.pageElements.appendChild(p);
        this.universe.push(new Body(mass, radius, velocity, position));
        // document.body.appendChild(p);
    }
    createPageElementWithBody(body) {
        this.createPageElement(body.mass, body.radius, body.velocity, body.position);
    }
    gameLoop() {
        this.universe.updateUniverse();
        this.draw();
    }
}
