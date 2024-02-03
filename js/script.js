const gridContainer = document.querySelector("#grid-container");
const body = document.querySelector("body");
const clearBtn = document.querySelector("#clear-btn");
const slider = document.querySelector(".slider");
const colorPicker = document.querySelector("#color-picker")
const cells = [];

let mouseState = 0;
let selectedColor = "black";
let selectedColorDiv = document.querySelector(".black");

let numberOfColumns = 16;
let numberOfRows = 16;
let mouseDown = false;

setUpSlider();
createGrid();

document.body.onmousedown = () => (mouseDown = true);
document.body.onmouseup = () => (mouseDown = false);


body.addEventListener("mouseup", () => mouseState = 0);
body.addEventListener("mouseleave", () => mouseState = 0);
clearBtn.addEventListener("click", () => createGrid());
colorPicker.addEventListener("input", changeSelectedColor, false);
//document.querySelectorAll("#right-buttons-container > *").forEach(element => element.addEventListener("click", changeSelectedColor));
colorPicker.value = "#000000";
function createGrid(){
    deleteGrid();
    numberOfColumns = Math.round(slider.value*0.64); 
    numberOfRows = Math.round(slider.value*0.64);
    for (let i=0; i<numberOfColumns; i++) {
        const rowContainer = document.createElement("div");
        rowContainer.classList.add("row");
        rowContainer.classList.add("row" + i);
        rowContainer.style.height = String(450/numberOfRows) + "px";
        rowContainer.draggable = false;
        for (let j=0; j<numberOfColumns; j++) {
            const cell = document.createElement("div");
            cell.classList.add("cell");
            cell.classList.add("column" + j);
            rowContainer.appendChild(cell);
            cell.addEventListener("mousedown", changeColor);
            cell.addEventListener("mouseover", changeColor);
            cell.draggable = false;
        gridContainer.appendChild(rowContainer);
        }
    }
}

function changeColor(cell) {
    if(cell.type === "mouseover" && !mouseDown) return;
    cell.target.style.backgroundColor = selectedColor;
}

function changeSelectedColor(event) {
    selectedColor = event.target.value;
}

function deleteGrid() {
    rows = document.querySelectorAll(".row");
    if (rows[0]){
        rows.forEach(element => {
            element.remove();
        });
    };
}

function setUpSlider() {
    const output = document.getElementById("slider-output");
    slider.value = 16/0.64;
    output.innerHTML = Math.round(slider.value*0.64);
    slider.oninput = function() {
        output.innerHTML = Math.round(this.value*0.64);
      } 
}