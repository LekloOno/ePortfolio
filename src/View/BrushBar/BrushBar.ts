import { MassControl } from "./MassControl";
import { RadiusControl } from "./RadiusControl";

export class BrushBar {
    brushBar: HTMLDivElement;
    private _massControl: MassControl;
    private _radiusControl: RadiusControl;

    constructor(initMass = 100000, maxMass = 1000000000000){
        this.brushBar = document.createElement("div");
        this.brushBar.id = "sandBoxBrush";

        this._massControl = new MassControl();
        this._radiusControl = new RadiusControl();
        this.buildBrushBar();
    }

    buildBrushBar(){
        this.brushBar.append(this._massControl.massControl);
        this.brushBar.append(this._radiusControl.radiusControl);
    }
}