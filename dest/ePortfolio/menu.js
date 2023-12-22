var _a, _b;
import { ScrollItem } from "./ScrollItem.js";
import { MathM } from "../MathM.js";
import { HiglightItem } from "./HighlightItem.js";
const elements = document.getElementsByClassName("portfolio");
var sandboxMode = false;
let scrollY = 0;
let targetScrollY = 0;
let navCurrentColor = "rgb(100, 187, 178)";
const comp = document.getElementById("comp");
const proj = document.getElementById("proj");
const ePortFol = (_a = document.getElementById("ePortFolio")) === null || _a === void 0 ? void 0 : _a.getElementsByClassName("projectIcon")[0];
const ePortFolPopup = document.getElementById("ePortfolioPopup");
ePortFol === null || ePortFol === void 0 ? void 0 : ePortFol.addEventListener("click", (event) => {
    if (ePortFolPopup)
        ePortFolPopup.hidden = false;
});
ePortFolPopup === null || ePortFolPopup === void 0 ? void 0 : ePortFolPopup.addEventListener("click", (event) => {
    ePortFolPopup.hidden = true;
});
const dlfdc = (_b = document.getElementById("DLFDC")) === null || _b === void 0 ? void 0 : _b.getElementsByClassName("projectIcon")[0];
const dlfdcPopup = document.getElementById("DLFDCPopup");
dlfdc === null || dlfdc === void 0 ? void 0 : dlfdc.addEventListener("click", (event) => {
    if (dlfdcPopup)
        dlfdcPopup.hidden = false;
});
dlfdcPopup === null || dlfdcPopup === void 0 ? void 0 : dlfdcPopup.addEventListener("click", (event) => {
    dlfdcPopup.hidden = true;
});
const presNav = document.getElementById("presNav");
const formNav = document.getElementById("formNav");
const compNav = document.getElementById("compNav");
const projNav = document.getElementById("projNav");
const contNav = document.getElementById("contNav");
const presStart = 1000;
const formStart = 10900;
const compStart = 14000;
const projStart = 20000;
const contStart = 24000;
const realPresStart = presStart + 2000;
const realFormStart = formStart + 1080;
const realCompStart = compStart + 1500;
const realProjStart = projStart + 1000;
const realContStart = contStart + 1000;
var autoScroll = false;
var autoScrollTarget = "none";
const scrollStarts = [1600, 2100, 2500, 3100, 3600, 4900, 5400, 6100, 7200, 7400, 8000, 8200, 8400, 8600,
    15250, 15300, 15350,
    15250, 15300, 15350,
    15300, 15350, 15400,
];
var selected = "intro";
var higlightItems = [];
var i = 0;
Array.prototype.forEach.call(document.getElementsByClassName("highlight"), (element) => {
    higlightItems.push(new HiglightItem(element, scrollStarts[i], 0.6, 0.06));
    i++;
});
Array.prototype.forEach.call(document.getElementsByClassName("highlight3"), (element) => {
    higlightItems.push(new HiglightItem(element, scrollStarts[i], 0.6, 0.06, 30));
    i++;
});
presNav === null || presNav === void 0 ? void 0 : presNav.addEventListener("click", (event) => {
    if (selected == "intro") {
        autoScroll = true;
        autoScrollTarget = "pres";
        return;
    }
    targetScrollY = presStart + 2000;
    selected = "pres";
});
formNav === null || formNav === void 0 ? void 0 : formNav.addEventListener("click", (event) => {
    autoScroll = false;
    if (targetScrollY < realFormStart)
        castWheelEvent(realFormStart - targetScrollY);
    else
        targetScrollY = realFormStart;
    selected = "form";
});
compNav === null || compNav === void 0 ? void 0 : compNav.addEventListener("click", (event) => {
    autoScroll = false;
    if (targetScrollY < realCompStart)
        castWheelEvent(realCompStart - targetScrollY);
    else
        targetScrollY = realCompStart;
    selected = "comp";
});
projNav === null || projNav === void 0 ? void 0 : projNav.addEventListener("click", (event) => {
    autoScroll = false;
    if (targetScrollY < realProjStart)
        castWheelEvent(realProjStart - targetScrollY);
    else
        targetScrollY = realProjStart;
    selected = "proj";
});
contNav === null || contNav === void 0 ? void 0 : contNav.addEventListener("click", (event) => {
    autoScroll = false;
    if (targetScrollY < realContStart)
        castWheelEvent(realContStart - targetScrollY);
    else
        targetScrollY = realContStart;
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
addEventListener("keypress", (event) => {
    if (event.key == "s") {
        autoScroll = !autoScroll;
    }
});
const intro = document.getElementById("intro");
const pres = document.getElementById("pres1");
const pres2 = document.getElementById("pres2");
const pres3 = document.getElementById("pres3");
let scrollItems = [];
const presScrolls = [1000, 4500, 7200,
    11500, 11950, 12400,
    14000];
const presFades = [4100, 6800, 10000,
    11800, 12250, 12700,
    16000];
const presAnchor = [innerHeight * 0.5, innerHeight * 0.5, innerHeight * 0.5,
    innerHeight * 0.95, innerHeight * 0.95, innerHeight * 0.95,
    innerHeight];
const initPosistions = [-200, -200, -200,
    -200, -200, -200,
    500];
i = 0;
Array.prototype.forEach.call(document.getElementsByClassName("scrollItem"), (element) => {
    let newScrollItem = new ScrollItem(element, presScrolls[i], presAnchor[i], -200, true, presFades[i]);
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
addEventListener('wheel', (event) => {
    if (sandboxMode)
        return;
    var speed = event.deltaY;
    //if(selected == "form" && targetScrollY > formStart && targetScrollY < compStart) speed *= 0.3;
    targetScrollY += speed;
    targetScrollY = Math.max(0, targetScrollY);
});
function updateScroll() {
    if (autoScroll) {
        if ((autoScrollTarget == selected && autoScrollTarget == "pres" && scrollY > (presStart + 2800)) || targetScrollY > formStart + 1040) {
            autoScroll = false;
            autoScrollTarget = "none";
            return;
        }
        castWheelEvent(6);
    }
    scrollY = MathM.lerp(scrollY, targetScrollY, 0.06);
    var prevSelected = selected;
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
        pres.style.backgroundSize = "5px " + presBgLeftSize + "%" + ", " + presBgBotSize + "% 5px";
    }
    if (comp != null) {
        let redLayer = document.getElementById("navRedLayer");
        if (redLayer != null) {
            redLayer.hidden = scrollY < compStart + 900;
        }
        if (scrollY < 18000) {
            comp.style.height = Math.max(0, scrollY - compStart) + "px";
            comp.style.bottom = Math.max(0, scrollY - 18000) + "px";
        }
        else {
            let flex = document.getElementById("compFlexContainer");
            if (flex) {
                console.log("oué");
                flex.style.height = Math.min(48, 48 + (18000 - scrollY) * 0.01) + "%";
            }
            //comp.style.height = Math.max(0, 36000-scrollY-compStart)+"px";
            //comp.style.bottom = scrollY-18000+"px";
        }
    }
    if (proj != null) {
        if (scrollY < 25000) {
            proj.style.height = Math.max(0, scrollY - projStart) + "px";
            proj.style.bottom = Math.max(0, scrollY - 25000) + "px";
        }
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
function castWheelEvent(speed) {
    const wheelEvent = new WheelEvent('wheel', {
        deltaX: 0, // Horizontal scroll amount
        deltaY: speed, // Vertical scroll amount
        deltaZ: 0, // Deprecated, set to 0
        deltaMode: WheelEvent.DOM_DELTA_PIXEL, // Use pixels for delta values
        bubbles: true, // Allow event to bubble
        cancelable: true, // Allow event to be canceled
        composed: true, // Allow event to cross the shadow DOM boundary
    });
    // Pass event to element
    document.body.dispatchEvent(wheelEvent);
}
