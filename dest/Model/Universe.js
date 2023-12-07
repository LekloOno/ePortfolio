export class Universe {
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
    push(body) {
        this._bodies.push(body);
    }
    updateUniverse() {
        this._bodies.forEach((body) => {
            body.updateVelocity(this);
        });
        this._bodies.forEach((body) => {
            body.updatePosition(this);
        });
    }
}
Universe.distanceMultiplier = 1000000000;
Universe.massMultiplier = 10000000000;
