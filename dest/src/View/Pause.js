import { ActivationModule } from "../Model/ActivationModule.js";
export class Pause extends ActivationModule {
    constructor(game) {
        super();
        this._game = game;
        this._pause = document.createElement("div");
        this._pause.id = "pause";
        this._pause.textContent = "Pause";
        this._pause.hidden = true;
        addEventListener("keypress", (event) => {
            if (!this.activated)
                return;
            if (event.key == " ") {
                if (this._game.isRunning) {
                    this._pause.hidden = false;
                }
                else {
                    this._pause.hidden = true;
                }
                this._game.switchRunning();
            }
        });
    }
    get pause() {
        return this._pause;
    }
    activate() {
        this.activated = !this.activated;
        this._pause.hidden = !this.activated || this._game.isRunning;
    }
}
