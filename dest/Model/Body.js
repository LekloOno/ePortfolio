import { Vector2 } from "./Vector2.js";
export class Body {
    constructor(mass, radius, initVelocity, initPosition) {
        this._mass = mass;
        this._radius = radius;
        this._velocity = initVelocity;
        this._position = initPosition;
    }
    get position() {
        return this._position;
    }
    get mass() {
        return this._mass;
    }
    get radius() {
        return this._radius;
    }
    squaredDistance(other) {
        return this._position.squaredDistance(other._position);
    }
    distance(other) {
        return this._position.distance(other._position);
    }
    direction(other) {
        return this._position.direction(other._position);
    }
    updateVelocity(universe) {
        universe.bodies.forEach((body) => {
            if (this.squaredDistance(body) != 0) {
                const force = this.direction(body).kProd(universe.gravitationalConstant * this._mass * body._mass).kDivide(this.squaredDistance(body));
                this._velocity = this._velocity.add((force.kDivide(this._mass)).kProd(universe.physicsTimeStep));
            }
        });
    }
    updatePosition(universe) {
        this._position = this._position.add(this._velocity.kProd(universe.physicsTimeStep));
    }
}
Body.null = new Body(0, 0, Vector2.null, Vector2.null);
