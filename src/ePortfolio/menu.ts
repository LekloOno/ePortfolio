import { ScrollItem } from "./ScrollItem.js";

const elements = document.getElementsByClassName("portfolio");
var sandboxMode = false;
let scrollY = 0;
let targetScrollY = 0;

let navCurrentColor = "rgb(100, 187, 178)"

const presNav = document.getElementById("presNav");

addEventListener("keypress", (event) => {
    if(event.key == "m") {
       Array.prototype.forEach.call(elements, (element) => {
        element.hidden = !sandboxMode;
       });
       sandboxMode = !sandboxMode;
    }
})

const intro = document.getElementById("intro");
intro?.remove();

let scrollItems: ScrollItem[] = [];

let introScroll;

if(intro != null){
    console.log("alo");
    introScroll = new ScrollItem(intro, 0, 0, innerHeight*0.4);
    introScroll.show(scrollY);
    scrollItems.push(introScroll);
}

addEventListener("wheel", (event) => {
    targetScrollY += (event.deltaY)*0.4;
    targetScrollY = Math.max(0, targetScrollY);
    
    
})

function updateScroll(){
    scrollY = scrollY + 0.06*(targetScrollY-scrollY);

    updateNav();

    Array.prototype.forEach.call(scrollItems, (element) => {
        element.show(scrollY);
        element.setPos(scrollY);
        element.setOpacity(scrollY);
    });
}

function updateNav(){
    if(presNav != null){
        if(scrollY > 600 && scrollY < 1500){
            presNav.style.backgroundPositionX = "10%";
            presNav.style.backgroundSize = "55px 1px";
            presNav.style.color = `${navCurrentColor}`;
            presNav.style.backgroundImage = `linear-gradient(${navCurrentColor}, ${navCurrentColor})`;
        } else {
            presNav.removeAttribute('style');
        }
        
    }
}

const id = setInterval(updateScroll, 10);

//Presentation Formations compétences expériences projets contacts