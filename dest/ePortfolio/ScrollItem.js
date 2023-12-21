export class ScrollItem {
    constructor(element, scrollShow, scrollMax, initPos) {
        this._element = element;
        this._scrollShow = scrollShow;
        this._scrollMax = scrollMax;
        this._shown = false;
        this._initPos = initPos;
        //console.log("alo");
        this._element.hidden = false;
        document.body.appendChild(this._element);
    }
    show(scroll) {
        if (!this._shown && scroll > this._scrollShow) {
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
            pos = Math.max(pos, this._scrollMax);
            this._element.style.bottom = pos + this._initPos + "px";
        }
    }
    setOpacity(scroll) {
        if (this._shown) {
            let opacity = innerHeight - scroll + this._scrollShow;
            opacity = Math.min(Math.max(0, opacity), innerHeight);
            opacity /= innerHeight;
            this._element.style.opacity = opacity + "";
        }
    }
}
