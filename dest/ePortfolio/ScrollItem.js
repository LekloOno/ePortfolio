export class ScrollItem {
    constructor(element, scrollShow, scrollMax, initPos, fade) {
        this._element = element;
        this._scrollShow = scrollShow;
        this._scrollMax = scrollMax;
        this._shown = false;
        this._initPos = initPos;
        this._element.hidden = false;
        this._fade = fade;
        this.id = element.id;
        this._realPos = -600;
    }
    get htmlElement() {
        return this._element;
    }
    show(scroll) {
        if (!this._shown && scroll >= this._scrollShow) {
            this._element.hidden = false;
            this._shown = true;
            this._element.style.bottom = this._initPos + "px";
        }
        else if (this._shown && scroll < this._scrollShow) {
            this._element.hidden = true;
            this._shown = false;
        }
    }
    setPos(scroll) {
        if (this._shown) {
            let pos = scroll - this._scrollShow;
            pos = Math.min(pos, this._scrollMax);
            this._realPos = this._realPos + 0.1 * (pos - this._realPos);
            this._element.style.bottom = this._realPos + this._initPos + "px";
        }
    }
    setOpacity(scroll) {
        if (this._shown && this._fade) {
            let opacity = innerHeight - scroll + this._scrollShow;
            opacity = Math.min(Math.max(0, opacity), innerHeight);
            opacity /= innerHeight;
            this._element.style.opacity = opacity + "";
        }
    }
}
