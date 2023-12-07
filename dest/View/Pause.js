export class Pause {
    constructor(game) {
        this._game = game;
        this._pause = document.createElement("div");
        this._pause.id = "pause";
        this._pause.textContent = "Pause";
        this._pause.hidden = true;
        addEventListener("keypress", (event) => {
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
}
