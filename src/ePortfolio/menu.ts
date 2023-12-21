import { ScrollItem } from "./ScrollItem.js";

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
const formStart = 3500;
const compStart = 5000;
const projStart = 6500;
const contStart = 7500;

presNav?.addEventListener("click", (event) => {
    targetScrollY = presStart+600;
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

function lerp(a: number, b: number, f: number){
    return a + f*(b-a);
}

addEventListener("keypress", (event) => {
    if(event.key == "m") {
       Array.prototype.forEach.call(elements, (element) => {
        element.hidden = !sandboxMode;
       });
       sandboxMode = !sandboxMode;
    }
})

const intro = document.getElementById("intro");
const pres = document.getElementById("pres");

let scrollItems: ScrollItem[] = [];

let introScroll: ScrollItem;
let presScroll: ScrollItem;

if(intro != null){
    introScroll = new ScrollItem(intro, 0, 0, innerHeight*0.4, true);
    introScroll.show(scrollY);
    scrollItems.push(introScroll);
}

if(pres != null){
    presScroll = new ScrollItem(pres, 1000, innerHeight*0.58, -200, false);
    pres.hidden= true;
    presScroll.show(scrollY);
    scrollItems.push(presScroll);
}

addEventListener("wheel", (event) => {
    if(sandboxMode) return;
    targetScrollY += (event.deltaY)*0.4;
    targetScrollY = Math.max(0, targetScrollY);
    
    
})

function updateScroll(){
    scrollY = lerp(scrollY, targetScrollY, 0.06);

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
        presBgLeftSize = lerp(presBgLeftSize, Math.min(Math.max(((targetScrollY-1500)*0.05),0), 45), 0.06);
        presBgBotSize = lerp(presBgBotSize, Math.min(Math.max(((scrollY-2600)*0.007),0), 4), 0.06);
        pres.style.backgroundSize =  "2px " + presBgLeftSize + "%" + ", " + presBgBotSize + "% 2px";
    }
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

//Presentation Formations compétences expériences projets contacts