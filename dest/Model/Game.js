import { Universe } from "./Universe.js";
import { Vector2 } from "./Vector2.js";
import { Body } from "./Body.js";
import { Selection } from "../View/Selection.js";
export class Game {
    constructor(position, zoom) {
        this._running = true;
        this._colorHelp = false;
        this.position = position;
        this._targetZoom = 0;
        this._zoom = 0;
        this._zoomLerpSpeed = 0.05;
        this._visibleSize = Vector2.null;
        this.setZoom(zoom);
        this._universe = new Universe();
        this._pageElements = document.createElement("div");
        this._pageElements.id = "universe";
        document.body.appendChild(this._pageElements);
        this._intervalId = this.getIntervalId();
        this._selection = new Selection(this);
        this._following = false;
        this._followed = Body.null;
    }
    get visibleSize() {
        return this._visibleSize;
    }
    get targetZoom() {
        return this._targetZoom;
    }
    get universe() {
        return this._universe;
    }
    get pageElements() {
        return this._pageElements;
    }
    get colorHelp() {
        return this._colorHelp;
    }
    get selection() {
        return this._selection;
    }
    get isRunning() {
        return this._running;
    }
    get zoom() {
        return this._zoom;
    }
    setZoom(zoom) {
        this._targetZoom = zoom;
    }
    switchColorHelp() {
        this._colorHelp = !this._colorHelp;
    }
    switchRunning() {
        this._running = !this._running;
    }
    follow(body) {
        if (this._following && this._followed == body) {
            this.stopFollowing();
            return;
        }
        this._followed = body;
        this._following = true;
    }
    stopFollowing() {
        this._following = false;
    }
    clearInterval() {
        clearInterval(this._intervalId);
    }
    setInterval() {
        this._intervalId = this.getIntervalId();
    }
    getIntervalId() {
        let thisGame = this;
        return setInterval(function () { thisGame.gameLoop(); }, this._universe.physicsTimeStep);
    }
    pointedZoom(amount, mousePos) {
        let nextZoom = this._targetZoom + amount;
        let worldPos = this.screenToRealWorld(mousePos);
        if (!this._following) {
            this._zoom = nextZoom;
            this.position = worldPos.minus(worldPos.minus(this.position).kProd(nextZoom).kDivide(this._targetZoom));
            this._visibleSize = new Vector2(this._targetZoom, this._targetZoom / (innerWidth / innerHeight));
        }
        this.setZoom(nextZoom);
    }
    screenToRealWorld(pos) {
        let x = this.position.x - this._zoom / 2 + (pos.x * this._zoom / window.innerWidth);
        let yZoom = this._zoom / (window.innerWidth / window.innerHeight);
        let y = this.position.y - yZoom / 2 + (pos.y * yZoom / window.innerHeight);
        return new Vector2(x, y);
    }
    screenToWorldSize(obj) {
        let x = obj.x * this._zoom / window.innerWidth;
        let y = obj.y * this._zoom / window.innerWidth;
        return new Vector2(x, y);
    }
    worldToScreenSize(obj) {
        let x = (obj.x / this._zoom) * window.innerWidth;
        let y = (obj.y / this._zoom) * window.innerWidth;
        return new Vector2(x, y);
    }
    draw() {
        this._pageElements.innerHTML = "";
        let i = 1;
        this._universe.bodies.forEach((body) => {
            let aspectRatio = window.innerWidth / window.innerHeight;
            let camToBody = this.position.minus(body.position);
            let pixelSize = this.screenToWorldSize(new Vector2(body.radius, body.radius));
            if (Math.abs(camToBody.x) - pixelSize.x < this._zoom / 2 && Math.abs(camToBody.y) - pixelSize.y < this._zoom / 2 / aspectRatio) {
                this.drawPageElement(body, i++);
            }
        });
    }
    drawPageElement(body, id) {
        var _a;
        let p = document.createElement("div");
        p.className = "dot";
        let radius = Math.max(1, this.worldToScreenSize(new Vector2(body.radius, body.radius)).x);
        p.style.height = radius + "px";
        p.style.width = radius + "px";
        p.style.borderRadius = radius + "px";
        p.style.transform = "translate(-50%, -50%)";
        if (this._colorHelp) {
            let colorRate = Math.min(((body.mass) / 1000000000000) ** 0.1, 1);
            let colorB = colorRate * 255;
            let colorG = colorRate * 255;
            p.style.backgroundColor = `rgb(255, ${colorG}, ${colorB})`;
        }
        if ((_a = this._selection.selection) === null || _a === void 0 ? void 0 : _a.includes(body)) {
            p.id = "selected";
        }
        let screenPos = this.screenDistance(body.position);
        p.style.left = `${screenPos.x}px`;
        p.style.top = `${screenPos.y}px`;
        this._pageElements.appendChild(p);
    }
    screenDistance(position) {
        let centerDist = position.minus(this.position).kProd(window.innerWidth).kDivide(this._zoom);
        let windowVect = new Vector2(innerWidth / 2, innerHeight / 2);
        return centerDist.add(windowVect);
    }
    createPageElement(mass, radius, velocity, position) {
        this.createPageElementWithBody(new Body(mass, radius, velocity, position));
    }
    createPageElementWithBody(body) {
        this._universe.push(body);
    }
    getBodiesInRange(a, b) {
        return this._universe.getBodiesInRange(this.screenToRealWorld(a), this.screenToRealWorld(b));
    }
    deleteBody(body) {
        return this._universe.deleteBody(body);
    }
    gameLoop() {
        if (this._running)
            this._universe.updateUniverse();
        if (this._following) {
            this._zoom = this._zoomLerpSpeed * this._targetZoom + (1 - this._zoomLerpSpeed) * this._zoom;
            this._visibleSize = new Vector2(this._zoom, this._zoom / (innerWidth / innerHeight));
            this.position = this._followed.position;
        }
        this.draw();
    }
}
