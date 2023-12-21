import { ScrollItem } from "./ScrollItem.js";
import { MathM } from "../MathM.js";
import { HiglightItem } from "./HighlightItem.js";
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
const presStart = 1000;
const formStart = 10900;
const compStart = 13000;
const projStart = 16000;
const contStart = 18000;
const scrollStarts = [1600, 2100, 2500, 3100, 3600, 4900, 5400, 6100, 7200, 7400, 8000, 8200, 8400, 8600];
var selected = "intro";
var higlightItems = [];
var i = 0;
Array.prototype.forEach.call(document.getElementsByClassName("highlight"), (element) => {
    higlightItems.push(new HiglightItem(element, scrollStarts[i], 0.6, 0.06));
    i++;
});
presNav === null || presNav === void 0 ? void 0 : presNav.addEventListener("click", (event) => {
    targetScrollY = presStart + 2000;
    selected = "pres";
});
formNav === null || formNav === void 0 ? void 0 : formNav.addEventListener("click", (event) => {
    targetScrollY = formStart;
    selected = "form";
});
compNav === null || compNav === void 0 ? void 0 : compNav.addEventListener("click", (event) => {
    targetScrollY = compStart;
    selected = "comp";
});
projNav === null || projNav === void 0 ? void 0 : projNav.addEventListener("click", (event) => {
    targetScrollY = projStart;
    selected = "proj";
});
contNav === null || contNav === void 0 ? void 0 : contNav.addEventListener("click", (event) => {
    targetScrollY = contStart;
    selected = "cont";
});
var presBgLeftSize = 0;
var presBgBotSize = 0;
var conceptionBGSize = 0;
addEventListener("keypress", (event) => {
    if (event.key == "m") {
        Array.prototype.forEach.call(elements, (element) => {
            element.hidden = !sandboxMode;
        });
        sandboxMode = !sandboxMode;
    }
});
const intro = document.getElementById("intro");
const pres = document.getElementById("pres1");
const pres2 = document.getElementById("pres2");
const pres3 = document.getElementById("pres3");
let scrollItems = [];
const presScrolls = [1000, 4500, 7200];
const presFades = [4100, 6800, 10000];
i = 0;
Array.prototype.forEach.call(document.getElementsByClassName("scrollItem"), (element) => {
    let newScrollItem = new ScrollItem(element, presScrolls[i], innerHeight * 0.58, -200, true, presFades[i]);
    newScrollItem.show(scrollY);
    scrollItems.push(newScrollItem);
    i++;
});
let introScroll;
let presScroll;
if (intro != null) {
    introScroll = new ScrollItem(intro, 0, 0, innerHeight * 0.3578, true, 0);
    introScroll.show(scrollY);
    scrollItems.push(introScroll);
}
addEventListener("wheel", (event) => {
    if (sandboxMode)
        return;
    targetScrollY += (event.deltaY) * 0.4;
    targetScrollY = Math.max(0, targetScrollY);
});
function updateScroll() {
    console.log(targetScrollY);
    scrollY = MathM.lerp(scrollY, targetScrollY, 0.06);
    if (targetScrollY < presStart)
        selected = "intro";
    if (targetScrollY >= presStart)
        selected = "pres";
    if (targetScrollY >= formStart)
        selected = "form";
    if (targetScrollY >= compStart)
        selected = "comp";
    if (targetScrollY >= projStart)
        selected = "proj";
    if (targetScrollY >= contStart)
        selected = "cont";
    updateNav();
    Array.prototype.forEach.call(scrollItems, (element) => {
        if (element.htmlElement.classList.contains(selected)) {
            element.update(scrollY, targetScrollY);
        }
        else {
            element.fakeUpdate();
        }
    });
    if (intro != null && selected == "intro") {
        intro.style.backgroundSize = "10% " + (scrollY * 0.05 + 40) + "%";
        intro.style.backgroundPositionY = (100 - (scrollY * 0.05)) + "%";
    }
    if (pres != null) {
        presBgLeftSize = MathM.lerp(presBgLeftSize, Math.min(Math.max(((targetScrollY - 1500) * 0.05), 0), 45), 0.06);
        presBgBotSize = MathM.lerp(presBgBotSize, Math.min(Math.max(((scrollY - 2600) * 0.007), 0), 4), 0.06);
        pres.style.backgroundSize = "2px " + presBgLeftSize + "%" + ", " + presBgBotSize + "% 2px";
    }
    Array.prototype.forEach.call(higlightItems, (item) => {
        item.update(targetScrollY);
    });
}
function updateNav() {
    navStyle(presNav, presStart, formStart);
    navStyle(formNav, formStart, compStart);
    navStyle(compNav, compStart, projStart);
    navStyle(projNav, projStart, contStart);
    navStyle(contNav, contStart, 100000);
}
function navStyle(navElement, start, end) {
    if (navElement != null) {
        if ((targetScrollY >= start && targetScrollY < end)) {
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
//Presentation Fo200rmations compétences expériences projets contacts
