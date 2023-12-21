import { ScrollItem } from "./ScrollItem.js";
import { MathM } from "../MathM.js";
import { HiglightItem } from "./HighlightItem.js";

const elements = document.getElementsByClassName("portfolio");
var sandboxMode = false;
let scrollY = 0;
let targetScrollY = 0;

let navCurrentColor = "rgb(100, 187, 178)"

const presNav = document.getElementById("presNav");
const formNav = document.getElementById("formNav");
const compNav = document.getElementById("compNav");
const projNav = document.getElementById("projNav");
const contNav = document.getElementById("contNav");


const presStart = 1000;
const formStart = 10900;
const compStart = 13000;
const projStart = 16000;
const contStart = 18000;

const scrollStarts:number [] = [1600, 2100, 2500, 3500, 4000, 5300, 5800, 6500, 7600, 7800, 8400, 8600, 8800, 9000];


var higlightItems: HiglightItem[] = [];

var i = 0;
Array.prototype.forEach.call(document.getElementsByClassName("highlight"), (element) => {
    higlightItems.push(new HiglightItem(element, scrollStarts[i], 0.6, 0.06));
    i++;
});

presNav?.addEventListener("click", (event) => {
    targetScrollY = presStart+2000;
});

formNav?.addEventListener("click", (event) => {
    targetScrollY = formStart;
});

compNav?.addEventListener("click", (event) => {
    targetScrollY = compStart;
});

projNav?.addEventListener("click", (event) => {
    targetScrollY = projStart;
});

contNav?.addEventListener("click", (event) => {
    targetScrollY = contStart;
});

var presBgLeftSize = 0;
var presBgBotSize = 0;

var conceptionBGSize = 0; 

addEventListener("keypress", (event) => {
    if(event.key == "m") {
       Array.prototype.forEach.call(elements, (element) => {
        element.hidden = !sandboxMode;
       });
       sandboxMode = !sandboxMode;
    }
})

const intro = document.getElementById("intro");


const pres = document.getElementById("pres1");
const pres2 = document.getElementById("pres2");
const pres3 = document.getElementById("pres3");

let scrollItems: ScrollItem[] = [];

const presScrolls: number[] = [1000, 4800, 7300];
const presFades: number[] = [4500, 7000, 10000];
i = 0;
Array.prototype.forEach.call(document.getElementsByClassName("scrollItem"), (element) => {
    console.log(i);
    let newScrollItem = new ScrollItem(element, presScrolls[i], innerHeight*0.58, -200, true, presFades[i]);
    newScrollItem.show(scrollY);
    scrollItems.push(newScrollItem);
    i++;
})

let introScroll: ScrollItem;
let presScroll: ScrollItem;

if(intro != null){
    introScroll = new ScrollItem(intro, 0, 0, innerHeight*0.3578, true, 0);
    introScroll.show(scrollY);
    scrollItems.push(introScroll);
}

addEventListener("wheel", (event) => {
    if(sandboxMode) return;
    targetScrollY += (event.deltaY)*0.4;
    targetScrollY = Math.max(0, targetScrollY);
    
    
})

function updateScroll(){
    scrollY = MathM.lerp(scrollY, targetScrollY, 0.06);

    updateNav();

    Array.prototype.forEach.call(scrollItems, (element) => {
        element.show(scrollY);
        element.setPos(targetScrollY);
        element.setOpacity(scrollY);
    });

    if(intro != null){
        intro.style.backgroundSize =  "10% " + (scrollY*0.05+40)+ "%";
        intro.style.backgroundPositionY =  (100-(scrollY*0.05))+ "%";   
    }

    if(pres != null){
        presBgLeftSize = MathM.lerp(presBgLeftSize, Math.min(Math.max(((targetScrollY-1500)*0.05),0), 45), 0.06);
        presBgBotSize = MathM.lerp(presBgBotSize, Math.min(Math.max(((scrollY-2600)*0.007),0), 4), 0.06);
        pres.style.backgroundSize =  "2px " + presBgLeftSize + "%" + ", " + presBgBotSize + "% 2px";
    }

    Array.prototype.forEach.call(higlightItems, (item) => {
        item.update(targetScrollY);
    });
}

function updateNav(){
    navStyle(presNav, presStart, formStart);
    navStyle(formNav, formStart, compStart);
    navStyle(compNav, compStart, projStart);
    navStyle(projNav, projStart, contStart);
    navStyle(contNav, contStart, 100000);
}

function navStyle(navElement: HTMLElement | null, start: number, end: number){
    if(navElement != null){
        if((targetScrollY >= start && targetScrollY < end)){
            navElement.style.backgroundPositionX = "10%";
            navElement.style.backgroundSize = "55px 1px";
            navElement.style.color = `${navCurrentColor}`;
            navElement.style.backgroundImage = `linear-gradient(${navCurrentColor}, ${navCurrentColor})`;
        } else {
            navElement.removeAttribute('style');
        }
    }

    
}

const id = setInterval(updateScroll, 10);

//Presentation Fo200rmations compétences expériences projets contacts