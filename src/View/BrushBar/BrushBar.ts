import { Game } from "../../Model/Game.js";
import { ColorHelp } from "./ColorHelp.js";
import { MassControl } from "./MassControl.js";
import { RadiusControl } from "./RadiusControl.js";

export class BrushBar {
    private _brushBar: HTMLDivElement;
    private _massControl: MassControl;
    private _radiusControl: RadiusControl;
    private _colorHelp: ColorHelp;

    private _shortcutMore: HTMLButtonElement;
    private _shortcutsHelp: HTMLDivElement;

    get brushBar() {
        return this._brushBar;
    }

    get mass() {
        return this._massControl.mass;
    }

    get radius() {
        return this._radiusControl.radius;
    }

    constructor(game: Game) {
        this._shortcutsHelp = document.createElement("div");
        this._shortcutsHelp.id = "shortcutsHelp";
        this._shortcutsHelp.hidden = true;

        this._shortcutMore = document.createElement("button");
        this._shortcutMore.textContent = "Show Help";

        this._brushBar = document.createElement("div");
        this._brushBar.id = "sandBoxBrush";

        this._massControl = new MassControl();
        this._radiusControl = new RadiusControl();
        this._colorHelp = new ColorHelp(game);
        this.buildBrushBar();
    }

    buildBrushBar() {
        this._brushBar.append(this._massControl.massControl);
        this._brushBar.append(this._radiusControl.radiusControl);
        this._brushBar.append(this._colorHelp.colorHelp);

        
        let createHelp = document.createElement("p");
        let velHelp = document.createElement("p");
        let selectHelp = document.createElement("p");
        let deleteHelp = document.createElement("p");
        let followHelp = document.createElement("p");
        let zoomHelp = document.createElement("p");
        let moveHelp = document.createElement("p");
        let pauseHelp = document.createElement("p");

        
        createHelp.innerHTML = "<br>Press <b>Left Click</b> to create a celestial body";
        selectHelp.innerHTML = "Hold <b>Left Click</b> to select bodies";
        velHelp.innerHTML = "Hold <b>Ctrl</b> while holding <b>Left Click</b> in any direction<br>to create a body with an initial velocity";
        deleteHelp.innerHTML = "Press <b>Delete</b> to delete the selection";
        followHelp.innerHTML = "Press <b>F</b> to follow the selected body (only one selection)";
        zoomHelp.innerHTML = "Use <b>Scroll Wheel</b> to zoom in and out";
        moveHelp.innerHTML = "Drag click <b>Scroll Wheel</b> to move around";
        pauseHelp.innerHTML = "Press <b>Space</b> to pause the simulation";

        
        this._shortcutsHelp.appendChild(createHelp);
        this._shortcutsHelp.appendChild(velHelp);
        this._shortcutsHelp.appendChild(selectHelp);
        this._shortcutsHelp.appendChild(deleteHelp);
        this._shortcutsHelp.appendChild(followHelp);
        this._shortcutsHelp.appendChild(zoomHelp);
        this._shortcutsHelp.appendChild(moveHelp);
        this._shortcutsHelp.appendChild(pauseHelp);

        this._brushBar.appendChild(this._shortcutsHelp);

        this._brushBar.appendChild(this._shortcutMore);
        this._shortcutMore.addEventListener('click', () => {
            if(this._shortcutsHelp.hidden){
                this._shortcutMore.textContent = 'Hide Help';
            } else {
                this._shortcutMore.textContent = 'Show Help';
            }

            this._shortcutsHelp.hidden = !this._shortcutsHelp.hidden;
            this._shortcutMore.blur();
        })
    }
}