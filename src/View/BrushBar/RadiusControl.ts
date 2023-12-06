export class RadiusControl {
    private _radius: number;
    private _maxRadius: number;

    private _radiusControl: HTMLDivElement;
    private _radiusSlider: HTMLInputElement;
    private _radiusInput: HTMLInputElement; 
    
    constructor(radius = 10, maxRadius = 50) {
        this._radius = radius;
        this._maxRadius = maxRadius;

        this._radiusSlider = this.buildRadiusSlider();
        this._radiusInput = this.buildRadiusInput();

        this._radiusControl = this.buildRadiusControl();
    }

    get radiusControl() {
        return this._radiusControl;
    }

    get radius() {
        return this._radius;
    }

    buildRadiusControl(): HTMLDivElement {
        let radiusControl = document.createElement("div");
        radiusControl.id = "radius";
        radiusControl.textContent = "Radius ";

        this._radiusSlider.addEventListener("change", (event) => { this.onChange_radiusSlider()});
        this._radiusInput.addEventListener("change", (event) => { this.onChange_radiusInput()});

        radiusControl.appendChild(this._radiusSlider);
        radiusControl.appendChild(this._radiusInput);

        return radiusControl;
    }

    buildRadiusSlider(): HTMLInputElement {
        let radiusSlider = document.createElement("input");
        radiusSlider.id = "radiusSlider";
        radiusSlider.type = "range";
        radiusSlider.min = "0";
        radiusSlider.max = "1000";

        return radiusSlider;
    }

    buildRadiusInput(): HTMLInputElement {
        let radiusInput = document.createElement("input");
        radiusInput.id = "radiusInput";
        radiusInput.type = "number";

        return radiusInput;
    }

    onChange_radiusSlider() {
        let val = Number(this._radiusSlider.value)/1000;
        let exp = val;
        this._radius = (exp)*this._maxRadius;
        this._radiusInput.value = Math.round(this._radius)+"";
    }

    onChange_radiusInput() {
        let val = Number(this._radiusInput.value);
        if(isNaN(val)) return;

        let sliderVal = Math.max(Math.min((val/this._maxRadius)**0.1, 1), 0) * 1000;
        this._radiusSlider.value = sliderVal+"";
        this._radius = val;
    }
}