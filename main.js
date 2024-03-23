import "./style.scss"
import { initHLine } from "./header-line";
let root = document.documentElement;
let hLineProp = {
    root: root,
    container: document.getElementById("h-line-cont"),
    wrapper: document.getElementById("h-line-wrapper"),
    hline: document.getElementById("h-line"),
    navItems: Array.from(document.getElementsByClassName("hidden-nav-li"))
}

let hLine = initHLine(hLineProp);


