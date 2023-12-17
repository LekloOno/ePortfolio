export abstract class ActivationModule {
    protected activated: boolean;
    constructor(){
        this.activated = false;
    }

    abstract activate(): void;
}