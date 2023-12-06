export class ColorHelp {
    get colorHelp() {
        return this._colorHelp;
    }
    constructor(game) {
        this._game = game;
        this._colorHelp = document.createElement("input");
        this._colorHelp.id = "colorHelp";
        this._colorHelp.type = "checkbox";
        this._colorHelpLabel = document.createElement("label");
        this._colorHelpLabel.textContent = "Color Help ";
        this._colorHelp.addEventListener("change", (event) => {
            this._game.colorHelp = this._colorHelp.checked;
            if (!this._game.run)
                game.draw();
        });
    }
}
