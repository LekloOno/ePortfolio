export class MassControl {
    private _mass: number;
    private _maxMass: number;
    
    private _massControl: HTMLDivElement;
    private _massSlider: HTMLInputElement;
    private _massInput: HTMLInputElement;

    constructor(initMass = 100000, _maxMass = 1000000000000){
        this._mass = 100000;
        this._maxMass = 1000000000000;
        this._massSlider = this.buildMassSlider();
        this._massInput = this.buildMassInput();
        this._massControl = this.buildMassControl();
    }

    get massControl() {
        return this._massControl;
    }

    get mass(){
        return this._mass;
    }

    buildMassControl(): HTMLDivElement {
        let _massControl = document.createElement("div");
        _massControl.id = "_mass";
        _massControl.textContent = "Mass ";
        
        this._massSlider.addEventListener("change", (event) => {this.onChange_massSlider();});
        this._massInput.addEventListener("change", (event) => {this.onChange_massInput();});

        _massControl.appendChild(this._massSlider);
        _massControl.appendChild(this._massInput);

        return _massControl;
    }

    buildMassSlider(): HTMLInputElement {
        let _massSlider = document.createElement("input");
        _massSlider.id = "_massSlider";
        _massSlider.type = "range";
        _massSlider.min = "10";
        _massSlider.max = "1000";
        
        return _massSlider;
    }

    buildMassInput(): HTMLInputElement {
        let _massInput = document.createElement("input");
        _massInput.id = "_massInput";
        _massInput.type = "number";

        return _massInput;
    }
    
    onChange_massSlider(){
        let val = Number(this._massSlider.value)/1000;
        let exp = val**10;
        this._mass = (exp)*this._maxMass;
        this._massInput.value = Math.round(this._mass)+"";
    }
    
    onChange_massInput(){
        let val = Number(this._massInput.value);
        if(isNaN(val)) return;

        let sliderVal = Math.max(Math.min((val/this._maxMass)**0.1, 1), 0) * 1000;
        this._massSlider.value = sliderVal+"";
        this._mass = val;
    }
}