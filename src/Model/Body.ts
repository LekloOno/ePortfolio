import { Universe } from "./Universe";
import { Vector2 } from "./Vector2.js";

export class Body {
    private _position: Vector2;
    private _velocity: Vector2;
    private _mass: number;
    private _radius: number;

    static null: Body = new Body(0, 0, Vector2.null, Vector2.null);

    constructor(mass:number, radius:number, initVelocity: Vector2, initPosition: Vector2) {
        this._mass = mass;
        this._radius = radius;
        this._velocity = initVelocity;
        this._position = initPosition;
    }

    get position () {
        return this._position;
    }

    get mass () {
        return this._mass;
    }

    get radius () {
        return this._radius;
    }

    squaredDistance(other: Body) : number {
        return this._position.squaredDistance(other._position);
    }

    distance(other: Body) : number {
        return this._position.distance(other._position);
    }

    direction(other: Body) : Vector2 {
        return this._position.direction(other._position);
    }

    updateVelocity(universe: Universe) {
        universe.bodies.forEach((body: Body) => {

            if(this.squaredDistance(body) != 0) {
                const force: Vector2 = this.direction(body).kDot(universe.gravitationalConstant * this._mass * body._mass).kDivide(this.squaredDistance(body));
                this._velocity = this._velocity.add((force.kDivide(this._mass)).kDot(universe.physicsTimeStep));
            }
        });
    }

    updatePosition(universe: Universe) {
        this._position = this._position.add(this._velocity.kDot(universe.physicsTimeStep));
    }
}