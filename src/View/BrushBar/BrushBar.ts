import { MassControl } from "./MassControl";

export class BrushBar {
    brushBar: HTMLDivElement;
    private _massControl: MassControl;

    constructor(initMass = 100000, maxMass = 1000000000000){
        this.brushBar = document.createElement("div");
        this.brushBar.id = "sandBoxBrush";

        this._massControl = new MassControl();
        this.buildBrushBar();
    }

    buildBrushBar(){
        this.brushBar.append(this._massControl.massControl);
    }
}