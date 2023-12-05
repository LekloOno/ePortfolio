import { Universe } from "./Universe";
import { Vector2 } from "./Vector2";

export class Body {
    position: Vector2;
    velocity: Vector2;
    mass: number;
    radius: number;

    constructor(mass:number, radius:number, initVelocity: Vector2, initPosition: Vector2) {
        this.mass = mass;
        this.radius = radius;
        this.velocity = initVelocity;
        this.position = initPosition;
    }

    squaredDistance(other: Body) : number {
        return this.position.squaredDistance(other.position);
    }

    distance(other: Body) : number {
        return this.position.distance(other.position);
    }

    direction(other: Body) : Vector2 {
        return this.position.direction(other.position);
    }

    updateVelocity(universe: Universe){
        universe.bodies.forEach((body: Body) => {

            if(this.squaredDistance(body) != 0) {
                const force: Vector2 = this.direction(body).kDot(universe.gravitationalConstant * this.mass * body.mass).kDivide(this.squaredDistance(body));
                this.velocity = this.velocity.add((force.kDivide(this.mass)).kDot(universe.physicsTimeStep));
            }
        });
    }

    updatePosition(universe: Universe){
        this.position = this.position.add(this.velocity.kDot(universe.physicsTimeStep));
    }
}