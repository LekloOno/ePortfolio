import { Game } from "../Model/Game.js";

export class Pause {
    private _game: Game;
    private _pause;
    

    constructor(game: Game){
        this._game = game;
        this._pause = document.createElement("div");
        this._pause.id = "pause";
        this._pause.textContent = "Pause";
        this._pause.hidden = true;

        addEventListener("keypress", (event) => {
            if(event.key == " "){
                if(this._game.isRunning){
                    this._game.clearInterval();
                    this._pause.hidden = false;
                } else {
                    this._game.setInterval();
                    this._pause.hidden = true;
                }
                game.switchRunning();
            }
        })
    }

    get pause() {
        return this._pause;
    }
}