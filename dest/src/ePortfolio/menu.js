"use strict";
const elements = document.getElementsByClassName("portfolio");
var sandboxMode = false;
addEventListener("keypress", (event) => {
    if (event.key == "m") {
        Array.prototype.forEach.call(elements, (element) => {
            element.hidden = !sandboxMode;
        });
        sandboxMode = !sandboxMode;
    }
});
//Presentation Formations compétences expériences projets contacts
