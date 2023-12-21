import { MathM } from "../MathM.js";

export class ScrollItem {
    private _element: HTMLElement;
    private _shown: boolean;
    private _scrollShow: number;
    private _scrollHide: number;
    private _scrollMax: number;
    private _initPos: number;
    private _fade: boolean;
    id: String;

    private _realPos: number;

    constructor(element: HTMLElement, scrollShow: number, scrollMax: number, initPos: number, fade: boolean, scrollHide: number){
        this._element = element;
        this._scrollShow = scrollShow;
        this._scrollMax = scrollMax;
        this._shown = false;
        this._initPos = initPos;
        this._element.hidden = false;
        this._fade = fade;
        this.id = element.id;
        this._realPos = -600;

        this._scrollHide = scrollHide;
    }

    get htmlElement(): HTMLElement {
        return this._element;
    }

    show(scroll: number){
        if(!this._shown && scroll>=this._scrollShow){
            this._element.hidden = false;
            this._shown = true;
            this._element.style.bottom = this._initPos +"px";
        } else if (this._shown && scroll<this._scrollShow){
            this._element.hidden = true;
            this._shown = false;
        }
    }

    setPos(scroll: number){
        if(this._shown) {
            let pos = scroll-this._scrollShow;
            pos = Math.min(pos, this._scrollMax);
            this._realPos = MathM.lerp(this._realPos, pos, 0.1);
            this._element.style.bottom = this._realPos + this._initPos +"px";
        }
    }

    setOpacity(scroll: number){
        if(this._shown && this._fade) {
            let opacity = innerHeight - scroll+this._scrollHide;
            opacity = Math.min(Math.max(0, opacity), innerHeight);
            opacity /= innerHeight;
            this._element.style.opacity = opacity+"";
        }
    }
}