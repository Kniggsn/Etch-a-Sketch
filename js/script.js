const mainContainer = document.querySelector(".main-container");
const body = document.querySelector("body");
const clearBtn = document.querySelector("#clear-btn");
const cells = [];

let mouseState = 0;
let selectedColor = "black";
let selectedColorDiv = document.querySelector(".black");

let numberOfColumns = 16;
let numberOfRows = 16;

body.addEventListener("mouseup", () => mouseState = 0);
body.addEventListener("mouseleave", () => mouseState = 0);
clearBtn.addEventListener("click", () => createGrid());
document.querySelectorAll(".right-buttons-container > *").forEach(element => element.addEventListener("click", changeSelectedColor));

createGrid();

function createGrid(){
    deleteGrid();
    for (let i=0; i<numberOfColumns; i++) {
        const rowContainer = document.createElement("div");
        rowContainer.classList.add("row");
        rowContainer.classList.add("row" + i);
        rowContainer.style.height = String(600/numberOfRows) + "px";
        rowContainer.draggable = false;
        for (let j=0; j<numberOfColumns; j++) {
            const cell = document.createElement("div");
            cell.classList.add("cell");
            cell.classList.add("column" + j);
            setBorderThickness(i, j, cell);
            rowContainer.appendChild(cell);
            cell.addEventListener("mousedown", () => mouseDown(cell));
            cell.addEventListener("mouseover", () => mouseOver(cell));
            cell.draggable = false;
        mainContainer.appendChild(rowContainer);
    }
}
}

function setBorderThickness(i, j, cell) {
    if(i === 0) {
        cell.style.borderTopWidth = "3px";
    }
    if(j == 0) {
        cell.style.borderLeftWidth = "3px";
    }
    if(i === numberOfColumns-1) {
        cell.style.borderBottomWidth = "3px";
    }
    if(j == numberOfRows-1) {
        cell.style.borderRightWidth = "3px";
    }
}

function mouseDown(c) {
    c.style.backgroundColor = selectedColor;
    mouseState = 1;
}

function mouseOver(c) {
    if (mouseState === 1) {
        c.style.backgroundColor = selectedColor;
    }
}

function changeSelectedColor(element) {
    selectedColorDiv.style.borderWidth = "1px";
    selectedColor = window.getComputedStyle(element.target).getPropertyValue("background-color");
    element.target.style.borderWidth = "3px";
    selectedColorDiv = element.target;
}

function deleteGrid() {
    rows = document.querySelectorAll(".row");
    if (rows[0]){
        rows.forEach(element => {
            element.remove();
        });
    };
}