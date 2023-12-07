import { Game } from "../../Model/Game.js";

export class ColorHelp {
    private _colorHelp: HTMLDivElement;
    private _colorHelpInput: HTMLInputElement;
    private _colorHelpLabel: HTMLLabelElement;
    private _game: Game;

    get colorHelp() {
        return this._colorHelp;
    }

    constructor(game: Game) {        
        this._game = game;

        this._colorHelp = document.createElement("div");
        this._colorHelp.id = "colorHelp"

        this._colorHelpInput = document.createElement("input");
        this._colorHelpInput.type = "checkbox";

        this._colorHelpLabel = document.createElement("label");
        this._colorHelpLabel.textContent = "Color Help ";
        
        this._colorHelpInput.addEventListener("change", (event) => {
            this._game.switchColorHelp();
            if(!this._game.isRunning) game.draw();
        });

        this._colorHelp.appendChild(this._colorHelpInput);
        this._colorHelp.appendChild(this._colorHelpLabel);
    }

}