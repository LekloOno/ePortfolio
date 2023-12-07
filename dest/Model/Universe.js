import { Vector2 } from "./Vector2.js";
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
    getBodiesInRange(v1, v2) {
        let bodiesInRange = [];
        let a = new Vector2(Math.min(v1.x, v2.x), Math.min(v1.y, v2.y));
        let b = new Vector2(Math.max(v1.x, v2.x), Math.max(v1.y, v2.y));
        this._bodies.forEach((body) => {
            if (body.position.x <= b.x && body.position.x >= a.x && body.position.y <= b.y && body.position.y >= a.y) {
                bodiesInRange.push(body);
            }
        });
        return bodiesInRange;
    }
}
Universe.distanceMultiplier = 1000000000;
Universe.massMultiplier = 10000000000;
