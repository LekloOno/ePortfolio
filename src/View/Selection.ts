import { Game } from "../Model/Game.js";
import { Vector2 } from "../Model/Vector2.js";
import { Body } from "../Model/Body.js";
import { ActivationModule } from "../Model/ActivationModule.js";

export class Selection extends ActivationModule {
    private _game: Game;
    private _selectionVis: HTMLDivElement;
    private _active: boolean;

    private _dragStartingPos: Vector2;
    private _selection: Body[];

    private _followingMessage: HTMLDivElement;
    
    constructor(game: Game){
        super();
        this._game = game;
        this._selectionVis = document.createElement("div");
        this._selectionVis.id = "selection";
        this._selectionVis.hidden = true;

        this._followingMessage = document.createElement("div");
        this._followingMessage.id = "following";
        this._followingMessage.innerHTML = "Following an object, press <b>F</b> to stop";
        this._followingMessage.hidden = true;

        this._active = false;
        this._dragStartingPos = Vector2.null;
        this._selection = [];

        this._game.pageElements.addEventListener("mousedown", (event) => {
            if(!this.activated) return;
            if(!event.ctrlKey && event.button == 0){
                this._dragStartingPos = new Vector2(event.x, event.y);
                this.enable();
            }
        });

        addEventListener("mouseup", (event) => {
            if(!this.activated) return;
            if(event.button == 0 && this._active){
                this.disable(new Vector2(event.x, event.y));
            }
        });

        addEventListener("mousemove", (event) => {
            if(!this.activated) return;
            if(this._active){
                let xPos = Math.min(event.x, this._dragStartingPos.x);
                let yPos = Math.min(event.y, this._dragStartingPos.y);

                xPos = Math.max(0, xPos);
                yPos = Math.max(0, yPos);

                let xDistance = Math.abs(event.x - this._dragStartingPos.x);
                let yDistance = Math.abs(event.y - this._dragStartingPos.y);

                let height = Math.min(yDistance, innerHeight-yPos-1);
                if(yPos == 0 && this._dragStartingPos.y != 0) height = Math.min(height, Math.abs(yPos-this._dragStartingPos.y));
                
                let width = Math.min(xDistance, innerWidth-xPos-1);
                if(xPos == 0 && this._dragStartingPos.x != 0) width = Math.min(width, Math.abs(xPos-this._dragStartingPos.x));

                this._selectionVis.style.width = width + "px";
                this._selectionVis.style.height = height + "px";
                this._selectionVis.style.left = xPos + "px";
                this._selectionVis.style.top = yPos + "px";

                this._selection = this._game.getBodiesInRange(new Vector2(event.x, event.y), this._dragStartingPos);
            }
        });

        addEventListener("keydown", (event) => {
            if(!this.activated) return;
            if(this._selection.length != 0 && event.key == "Delete") {
                this._selection.forEach((body: Body) => {
                    this._game.deleteBody(body);
                });

                this._selection = [];
                this._game.draw();
            } else if(event.key == "f") {
                if(this._selection.length === 1){
                    this._game.follow(this._selection[0]);
                } else {
                    this._game.stopFollowing();
                }
                this._followingMessage.hidden = !this._game.isFollowing;
            }
        });
    }

    get followingMessage() {
        return this._followingMessage;
    }

    get selectionVis() {
        return this._selectionVis;
    }

    get selection() {
        return this._selection;
    }

    enable(){
        this._active = true;
        this._selectionVis.hidden = false;

        this._selectionVis.style.width = "0px";
        this._selectionVis.style.height = "0px";
        this._selectionVis.style.left = this._dragStartingPos.x + "px";
        this._selectionVis.style.top = this._dragStartingPos.y + "px";
    }

    disable(mousePos: Vector2){
        this._active = false;
        this._selectionVis.hidden = true;
        
        this._selection = this._game.getBodiesInRange(mousePos, this._dragStartingPos);
    }

    activate(): void {
        this.activated = !this.activated;
        this._followingMessage.hidden = !this._game.isFollowing || !this.activated;
        this._selectionVis.hidden = !this.activated || !this._active;
        this._active = this.activated && this._active;
    }
}