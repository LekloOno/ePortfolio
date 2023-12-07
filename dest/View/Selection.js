import { Vector2 } from "../Model/Vector2.js";
export class Selection {
    constructor(game) {
        this._game = game;
        this._selectionVis = document.createElement("div");
        this._selectionVis.id = "selection";
        this._selectionVis.hidden = true;
        this._active = false;
        this._dragStartingPos = Vector2.null;
        this._game.pageElements.addEventListener("mousedown", (event) => {
            if (!event.ctrlKey && event.button == 0) {
                this._dragStartingPos = new Vector2(event.x, event.y);
                this.activate();
            }
        });
        addEventListener("mouseup", (event) => {
            if (event.button == 0 && this._active) {
                this.deactivate();
            }
        });
        addEventListener("mousemove", (event) => {
            if (this._active) {
                let xPos = Math.min(event.x, this._dragStartingPos.x);
                let yPos = Math.min(event.y, this._dragStartingPos.y);
                xPos = Math.max(0, xPos);
                yPos = Math.max(0, yPos);
                let xDistance = Math.abs(event.x - this._dragStartingPos.x);
                let yDistance = Math.abs(event.y - this._dragStartingPos.y);
                let height = Math.min(yDistance, innerHeight - yPos - 1);
                if (yPos == 0 && this._dragStartingPos.y != 0)
                    height = Math.min(height, Math.abs(yPos - this._dragStartingPos.y));
                let width = Math.min(xDistance, innerWidth - xPos - 1);
                if (xPos == 0 && this._dragStartingPos.x != 0)
                    width = Math.min(width, Math.abs(xPos - this._dragStartingPos.x));
                this._selectionVis.style.width = width + "px";
                this._selectionVis.style.height = height + "px";
                this._selectionVis.style.left = xPos + "px";
                this._selectionVis.style.top = yPos + "px";
            }
        });
    }
    get selectionVis() {
        return this._selectionVis;
    }
    activate() {
        this._active = true;
        this._selectionVis.hidden = false;
        this._selectionVis.style.width = "0px";
        this._selectionVis.style.height = "0px";
        this._selectionVis.style.left = this._dragStartingPos.x + "px";
        this._selectionVis.style.top = this._dragStartingPos.y + "px";
    }
    deactivate() {
        this._active = false;
        this._selectionVis.hidden = true;
    }
}
