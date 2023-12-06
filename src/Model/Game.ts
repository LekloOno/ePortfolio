import { Universe } from "./Universe.js";
import { Vector2 } from "./Vector2.js";
import { Body } from "./Body.js"

export class Game {
    position: Vector2;
    zoom: number; //Horizontal length/2
    universe: Universe;
    pageElements: HTMLDivElement;

    colorHelp: boolean;
    run: boolean;

    intervalId;

    constructor(position: Vector2, zoom: number){
        this.run = true;
        this.colorHelp = false;
        this.position = position;
        this.zoom = zoom;
        this.universe = new Universe();
        this.pageElements = document.createElement("div");
        this.pageElements.id = "universe";
        document.body.appendChild(this.pageElements);

        let b = this;
        this.intervalId = setInterval(function() {b.gameLoop();}, this.universe.physicsTimeStep);
    }

    pointedZoom(amount: number, mousePos: Vector2){
        let nextZoom: number = this.zoom + amount;
        let worldPos: Vector2 = this.screenToRealWorld(mousePos);

        let v: Vector2 = worldPos.minus(worldPos.minus(this.position).kDot(nextZoom).kDivide(this.zoom));
        
        this.zoom = nextZoom;

        this.position = v;
    }

    screenToRealWorld(pos: Vector2): Vector2 {
        let x = this.position.x - this.zoom/2 + (pos.x * this.zoom/window.innerWidth);
        let yZoom = this.zoom/(window.innerWidth/window.innerHeight);
        let y = this.position.y - yZoom/2 + (pos.y * yZoom/window.innerHeight);
        return new Vector2(x, y);
    }

    screenToWorldSize(obj: Vector2): Vector2 {
        let x = obj.x*this.zoom/window.innerWidth;
        let y = obj.y*this.zoom/window.innerWidth;
        return new Vector2(x, y);
    }

    worldToScreenSize(obj: Vector2): Vector2 {
        let x = (obj.x/this.zoom)*window.innerWidth;
        let y = (obj.y/this.zoom)*window.innerWidth;
        return new Vector2(x, y);
    }

    draw(){
        this.pageElements.innerHTML = "";

        let i = 1;
        this.universe.bodies.forEach((body) => {
            let aspectRatio: number = window.innerWidth/window.innerHeight;

            let camToBody: Vector2 = this.position.minus(body.position);

            let pixelSize: Vector2 = this.screenToWorldSize(new Vector2(body.radius, body.radius));

            if(Math.abs(camToBody.x)-pixelSize.x < this.zoom/2 && Math.abs(camToBody.y)-pixelSize.y < this.zoom/2/aspectRatio){
                this.drawPageElement(body, i++);
            }
        })
    }

    drawPageElement(body: Body, id: number){
        let p = document.createElement("div");
        p.className = "dot";
        p.id = id + "";
        let radius: number = Math.max(1, this.worldToScreenSize(new Vector2(body.radius, body.radius)).x);
        p.style.height = radius+"px";
        p.style.width = radius+"px";
        p.style.borderRadius = radius+"px";
        p.style.transform = "translate(-50%, -50%)";
        if(this.colorHelp){
            let colorRate = Math.min(((body.mass)/1000000000000)**0.1, 1);
            let colorB = colorRate * 255;
            let colorG = colorRate*255;
            p.style.backgroundColor = `rgb(255, ${colorG}, ${colorB})`;
        }

        let screenPos: Vector2 = this.screenDistance(body.position);

        p.style.left = `${screenPos.x}px`;
        p.style.top = `${screenPos.y}px`;

        this.pageElements.appendChild(p);
    }

    screenDistance(position: Vector2): Vector2 {
        let centerDist: Vector2 = position.minus(this.position).kDot(window.innerWidth).kDivide(this.zoom);
        let windowVect: Vector2 = new Vector2(innerWidth/2, innerHeight/2);

        return centerDist.add(windowVect);
    }

    createPageElement(mass: number, radius: number, velocity: Vector2, position: Vector2){
        // const p = document.createElement("div");
        // p.className = "dot";
        // p.id = this.universe.bodies.length + "";
        // p.style.left = `${position.x}px`;
        // p.style.top = `${position.y}px`;

        // this.pageElements.appendChild(p);
        this.universe.push(new Body(mass, radius, velocity, position));
        
        // document.body.appendChild(p);
    }

    createPageElementWithBody(body: Body){
        this.createPageElement(body.mass, body.radius, body.velocity, body.position);
    }

    gameLoop(){
        this.universe.updateUniverse();

        this.draw();
    }
}