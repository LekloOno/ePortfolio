import { ScrollItem } from "./ScrollItem.js";
const elements = document.getElementsByClassName("portfolio");
var sandboxMode = false;
let scrollY = 0;
let targetScrollY = 0;
let navCurrentColor = "rgb(100, 187, 178)";
const presNav = document.getElementById("presNav");
const formNav = document.getElementById("formNav");
const compNav = document.getElementById("compNav");
const projNav = document.getElementById("projNav");
const contNav = document.getElementById("contNav");
addEventListener("keypress", (event) => {
    if (event.key == "m") {
        Array.prototype.forEach.call(elements, (element) => {
            element.hidden = !sandboxMode;
        });
        sandboxMode = !sandboxMode;
    }
});
const intro = document.getElementById("intro");
const pres = document.getElementById("pres");
let scrollItems = [];
let introScroll;
let presScroll;
if (intro != null) {
    introScroll = new ScrollItem(intro, 0, 0, innerHeight * 0.4, true);
    introScroll.show(scrollY);
    scrollItems.push(introScroll);
}
if (pres != null) {
    presScroll = new ScrollItem(pres, 1000, innerHeight * 0.58, -200, false);
    pres.hidden = true;
    presScroll.show(scrollY);
    scrollItems.push(presScroll);
}
addEventListener("wheel", (event) => {
    if (sandboxMode)
        return;
    targetScrollY += (event.deltaY) * 0.4;
    targetScrollY = Math.max(0, targetScrollY);
});
function updateScroll() {
    scrollY = scrollY + 0.06 * (targetScrollY - scrollY);
    updateNav();
    Array.prototype.forEach.call(scrollItems, (element) => {
        element.show(scrollY);
        element.setPos(targetScrollY);
        element.setOpacity(scrollY);
        if (element.id == "intro") {
            element.htmlElement.style.backgroundSize = "10% " + (scrollY * 0.05 + 40) + "%";
            element.htmlElement.style.backgroundPositionY = (100 - (scrollY * 0.05)) + "%";
        }
    });
}
function updateNav() {
    navStyle(presNav, 1000, 2500);
    navStyle(formNav, 2500, 3500);
    navStyle(compNav, 3500, 4500);
    navStyle(projNav, 4500, 5500);
    navStyle(contNav, 5500, 6500);
}
function navStyle(navElement, start, end) {
    if (navElement != null) {
        if (scrollY > start && scrollY < end) {
            navElement.style.backgroundPositionX = "10%";
            navElement.style.backgroundSize = "55px 1px";
            navElement.style.color = `${navCurrentColor}`;
            navElement.style.backgroundImage = `linear-gradient(${navCurrentColor}, ${navCurrentColor})`;
        }
        else {
            navElement.removeAttribute('style');
        }
    }
}
const id = setInterval(updateScroll, 10);
//Presentation Formations compétences expériences projets contacts
