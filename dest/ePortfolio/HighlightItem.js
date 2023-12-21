import { MathM } from "../MathM.js";
export class HiglightItem {
    constructor(element, startScroll, speed = 0.2, lerpSpeed = 0.06) {
        this._bgSize = 0;
        this._startScroll = startScroll;
        this._speed = speed;
        this._element = element;
        this._lerpSpeed = lerpSpeed;
    }
    update(scroll) {
        if (this._element != null) {
            this._bgSize = MathM.lerp(this._bgSize, Math.min(Math.max(((scroll - this._startScroll) * this._speed), 0), 100), this._lerpSpeed);
            this._element.style.backgroundSize = this._bgSize + "% 100%";
        }
    }
}
