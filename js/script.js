const mainContainer = document.querySelector(".main-container");
const body = document.querySelector("body");
console.log(body);
let mouseState = 0;

let numberOfColumns = 8;
let numberOfRows = 8;

body.addEventListener("mouseup", () => mouseState = 0);
body.addEventListener("mouseleave", () => mouseState = 0);

createGrid();

function createGrid(){
    for (let i=0; i<numberOfColumns; i++) {
        const rowContainer = document.createElement("div");
        rowContainer.classList.add("row");
        rowContainer.classList.add("row" + i);
        rowContainer.style.height = String(960/numberOfRows) + "px";
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
    c.style.backgroundColor = "black";
    mouseState = 1;
}

function mouseOver(c) {
    if (mouseState === 1) {
        c.style.backgroundColor = "black";
    }
}

