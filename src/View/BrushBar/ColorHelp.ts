import { Game } from "../../Model/Game.js";

export class ColorHelp {
    private _colorHelp: HTMLInputElement;
    private _colorHelpLabel: HTMLLabelElement;
    private _game: Game;

    get colorHelp() {
        return this._colorHelp;
    }

    constructor(game: Game){        
        this._game = game;

        this._colorHelp = document.createElement("input");
        this._colorHelp.id = "colorHelp";
        this._colorHelp.type = "checkbox";

        this._colorHelpLabel = document.createElement("label");
        this._colorHelpLabel.textContent = "Color Help ";
        
        this._colorHelp.addEventListener("change", (event) => {
            this._game.switchColorHelp();
            if(!this._game.isRunning) game.draw();
        });
    }

}