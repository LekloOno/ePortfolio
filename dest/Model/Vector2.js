export class Vector2 {
    constructor(x, y) {
        this._x = x;
        this._y = y;
        this._magnitude = this.squaredMagnitude() ** 0.5;
    }
    copy() {
        return new Vector2(this.x, this.y);
    }
    get x() {
        return this._x;
    }
    get y() {
        return this._y;
    }
    set x(x) {
        this._x = x;
        this._magnitude = this.squaredMagnitude() ** 0.5;
    }
    set y(y) {
        this._y = y;
        this._magnitude = this.squaredMagnitude() ** 0.5;
    }
    get magnitude() {
        return this._magnitude;
    }
    squaredMagnitude() {
        return this.x ** 2 + this.y ** 2;
    }
    negative() {
        return new Vector2(-this.x, -this.y);
    }
    normalized() {
        return new Vector2(this.x / this.magnitude, this.y / this.magnitude);
    }
    add(other) {
        return new Vector2(this.x + other.x, this.y + other.y);
    }
    minus(other) {
        return this.add(other.negative());
    }
    prod(other) {
        return new Vector2(this._x * other._x, this._y * other._y);
    }
    divide(other) {
        return new Vector2(this._x / other._x, this._y / other._y);
    }
    kProd(k) {
        return new Vector2(this._x * k, this._y * k);
    }
    kDivide(k) {
        return this.kProd(1 / k);
    }
    squaredDistance(other) {
        return this.minus(other).squaredMagnitude();
    }
    distance(other) {
        return this.minus(other).magnitude;
    }
    direction(other) {
        return this.minus(other).normalized();
    }
    dotProduct(other) {
        return this._x * other._x + this._y * other._y;
    }
}
Vector2.null = new Vector2(0, 0);
