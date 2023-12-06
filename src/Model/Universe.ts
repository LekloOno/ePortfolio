import { Body } from "./Body";

export class Universe {
    static distanceMultiplier:number = 1000000000;
    static massMultiplier:number = 10000000000;
    private _gravitationalConstant: number;
    private _physicsTimeStep: number;

    private _bodies: Body[];

    constructor(gravConst = -0.000000000068, physStep = 10) {
        this._gravitationalConstant = gravConst;
        this._physicsTimeStep = physStep;
        this._bodies = [];
    }

    get gravitationalConstant() {
        return this._gravitationalConstant;
    }

    get physicsTimeStep() {
        return this._physicsTimeStep;
    }

    get bodies() {
        return this._bodies;
    }

    push(body: Body) {
        this.bodies.push(body);
    }

    updateUniverse() {
        this.bodies.forEach((value: Body) => {
            value.updateVelocity(this);
        });

        this.bodies.forEach((value: Body) => {
            value.updatePosition(this);
        });
    }
}