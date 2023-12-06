export class BrushBar {
    brushBar: HTMLDivElement;
    mass: number;
    maxMass: number;
    
    private massControl: HTMLDivElement;
    private massSlider: HTMLInputElement;
    private massInput: HTMLInputElement;

    constructor(initMass = 100000, maxMass = 1000000000000){
        this.brushBar = document.createElement("div");
        this.brushBar.id = "sandBoxBrush";
        this.mass = 100000;
        this.maxMass = 1000000000000;
        this.massSlider = this.buildMassSlider();
        this.massInput = this.buildMassInput();
        this.massControl = this.buildMassControl();

        this.buildBrushBar();
    }

    buildMassControl(): HTMLDivElement {
        let massControl = document.createElement("div");
        massControl.id = "mass";
        massControl.textContent = "Mass ";
        
        this.massSlider.addEventListener("change", (event) => {this.onChange_massSlider();});
        this.massInput.addEventListener("change", (event) => {this.onChange_massInput();});

        this.massControl.appendChild(this.massSlider);
        this.massControl.appendChild(this.massInput);

        return massControl;
    }

    buildMassSlider(): HTMLInputElement {
        let massSlider = document.createElement("input");
        massSlider.id = "massSlider";
        massSlider.type = "range";
        massSlider.min = "10";
        massSlider.max = "1000";
        
        return massSlider;
    }

    buildMassInput(): HTMLInputElement {
        let massInput = document.createElement("input");
        massInput.id = "massInput";
        massInput.type = "number";

        return massInput;
    }
    
    onChange_massSlider(){
        let val = Number(this.massSlider.value)/1000;
        let exp = val**10;
        this.mass = (exp)*this.maxMass;
        this.massInput.value = Math.round(this.mass)+"";
    }
    
    onChange_massInput(){
        let val = Number(this.massInput.value);
        if(isNaN(val)) return;

        let sliderVal = Math.max(Math.min((val/this.maxMass)**0.1, 1), 0) * 1000;
        this.massSlider.value = sliderVal+"";
        this.mass = val;
    }


    buildBrushBar(){
        this.brushBar.append(this.massControl);
    }
}