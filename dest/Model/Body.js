export class Body {
    constructor(mass, radius, initVelocity, initPosition) {
        this.mass = mass;
        this.radius = radius;
        this.velocity = initVelocity;
        this.position = initPosition;
    }
    squaredDistance(other) {
        return this.position.squaredDistance(other.position);
    }
    distance(other) {
        return this.position.distance(other.position);
    }
    direction(other) {
        return this.position.direction(other.position);
    }
    updateVelocity(universe) {
        universe.bodies.forEach((body) => {
            if (this.squaredDistance(body) != 0) {
                const force = this.direction(body).kDot(universe.gravitationalConstant * this.mass * body.mass).kDivide(this.squaredDistance(body));
                this.velocity = this.velocity.add((force.kDivide(this.mass)).kDot(universe.physicsTimeStep));
            }
        });
    }
    updatePosition(universe) {
        this.position = this.position.add(this.velocity.kDot(universe.physicsTimeStep));
    }
}
