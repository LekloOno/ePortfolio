import { Game } from "../../Model/Game";
import { ColorHelp } from "./ColorHelp";
import { MassControl } from "./MassControl";
import { RadiusControl } from "./RadiusControl";

export class BrushBar {
    brushBar: HTMLDivElement;
    private _massControl: MassControl;
    private _radiusControl: RadiusControl;
    private _colorHelp: ColorHelp;

    constructor(game: Game){
        this.brushBar = document.createElement("div");
        this.brushBar.id = "sandBoxBrush";

        this._massControl = new MassControl();
        this._radiusControl = new RadiusControl();
        this._colorHelp = new ColorHelp(game);
        this.buildBrushBar();
    }

    buildBrushBar(){
        this.brushBar.append(this._massControl.massControl);
        this.brushBar.append(this._radiusControl.radiusControl);
        this.brushBar.append(this._colorHelp.colorHelp);
    }
}