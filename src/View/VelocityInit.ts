import { Game } from "../Model/Game.js";
import { Vector2 } from "../Model/Vector2.js";

export class VelocityInit {
    private _game: Game;
    private _dragStartingPos: Vector2;

    private _active: boolean;
    private _velocityVis: HTMLDivElement;

    constructor(game: Game){
        this._game = game;
        this._dragStartingPos = Vector2.null;

        this._velocityVis = document.createElement("div");
        this._velocityVis.id = "velocityInit";
        this._velocityVis.hidden = true;
        this._active = false;

        this._game.pageElements.addEventListener("mousedown", (event) => {
            if(event.ctrlKey && event.button == 0){
                this._dragStartingPos = new Vector2(event.x, event.y);
                this.activate();
            }
        });

        this._game.pageElements.addEventListener("mouseup", (event) => {
            if(this._active && event.button == 0) {
                this.deactivate(new Vector2(event.x, event.y));
            }
        });

        this._game.pageElements.addEventListener("mousemove", (event) => {
            if(this._active) {
                let mousePos = new Vector2(event.x, event.y);
                let dir = this._dragStartingPos.minus(mousePos);
                let dotProd = Vector2.right.dotProduct(dir);
                let angle = Math.acos(dotProd/(dir.magnitude));
                angle *= Math.sign(dir.y);
                this._velocityVis.style.width = dir.magnitude+"px";
                this._velocityVis.style.transform = 'rotate('+angle+'rad)';
                this._velocityVis.style.transform += 'translate(-100%,-100%)';

                console.log(Vector2.up.dotProduct(dir));
                let trans = Vector2.up.dotProduct(dir);
            }
        });
    }

    get velocityVis() {
        return this._velocityVis;
    }

    activate(){
        this._active = true;
        this._velocityVis.hidden = false;

        this._velocityVis.style.width = "5px";
        this._velocityVis.style.height = "5px";
        this._velocityVis.style.left = this._dragStartingPos.x + "px";
        this._velocityVis.style.top = this._dragStartingPos.y + "px";
    }

    deactivate(mousePos: Vector2){
        this._active = false;
        this._velocityVis.hidden = true;
    }
}