const body = document.querySelector("body");
const gridContainer = document.querySelector("#grid-container");
const clearBtn = document.querySelector("#clear-btn");
const showGridBtn = document.querySelector("#show-grid-btn");
const autoDrawBtn = document.querySelector("#auto-draw-btn");
const slider = document.querySelector(".slider");
const colorPicker = document.querySelector("#color-picker");
const colorChangeButtons = document.querySelectorAll(".color-change-buttons");
const gridContainerWidth = window.getComputedStyle(gridContainer).width;

const activeButtonColor = "rgb(0, 20, 46)";
const inactiveButtonColor = "#352f44";

let mouseState = 0;
let selectedColor = "black";


let numberOfColumns = 16;
let numberOfRows = 16;
let mouseDown = false;
let mode = "defaultColorMode";
let showGrid = false;
let autoDraw = false;

document.body.onmousedown = () => (mouseDown = true);
document.body.onmouseup = () => (mouseDown = false);

body.addEventListener("mouseup", () => mouseState = 0);
body.addEventListener("mouseleave", () => mouseState = 0);

clearBtn.addEventListener("click", () => createGrid());
showGridBtn.addEventListener("click", toggleGrid);
autoDrawBtn.addEventListener("click", toggleAutoDraw);

colorChangeButtons.forEach((button) => button.addEventListener("click", changeColorMode));
colorChangeButtons.forEach((button) => button.addEventListener("click", changeButtonBackgroundColor));

colorPicker.addEventListener("input", changeSelectedColor, false);
colorPicker.value = "#000000";

createGrid();
setUpSlider();

function createGrid() {
    deleteGrid();
    numberOfColumns = Math.round(slider.value * 0.64);
    numberOfRows = Math.round(slider.value * 0.64);
    for (let i = 0; i < numberOfColumns; i++) {
        const rowContainer = document.createElement("div");
        rowContainer.classList.add("row");
        rowContainer.classList.add("row" + i);
        rowContainer.style.height = String(gridContainerWidth.split("p")[0] / numberOfRows) + "px";
        for (let j = 0; j < numberOfColumns; j++) {
            const cell = document.createElement("div");
            cell.classList.add("cell");
            cell.classList.add("column" + j);
            rowContainer.appendChild(cell);
            cell.addEventListener("mousedown", changeColor);
            cell.addEventListener("mouseover", changeColor);
            if (showGrid) {
                cell.style.borderStyle = "solid";
            }
            gridContainer.appendChild(rowContainer);
        }
    }
}

function deleteGrid() {
    rows = document.querySelectorAll(".row");
    if (rows[0]) {
        rows.forEach(element => {
            element.remove();
        });
    };
}

function setUpSlider() {
    const output = document.getElementById("slider-output");
    slider.value = 16 / 0.64;
    output.innerHTML = Math.round(slider.value * 0.64);
    slider.oninput = function() {
        output.innerHTML = Math.round(this.value * 0.64);
    }
}

function changeColor(cell) {
    if (!autoDraw && (cell.type === "mouseover" && !mouseDown)) {
        return
    }
    switch(mode) {
        case "defaultColorMode" : 
            cell.target.style.backgroundColor = selectedColor;
            break;
        case "eraserMode": 
            cell.target.style.backgroundColor = "white";
            break;
        case "rainbowMode": 
            cell.target.style.backgroundColor = `rgb(${getRandomInt(256)}, ${getRandomInt(256)}, ${getRandomInt(256)})`;
            break;
        case "greyscaleMode":         
            let rgb = window.getComputedStyle(cell.target).backgroundColor;
            rgb = calculateGreyScale(rgb);
            cell.target.style.backgroundColor = `rgb(${rgb[0]}, ${rgb[1]}, ${rgb[2]})`;
            break;
        }
}

function changeColorMode(event) {
    switch(event.target.id) {
        case "color-btn":
            mode = "defaultColorMode";
            break;
        case "eraser-btn":
            mode = "eraserMode";
            break;
        case "rainbow-btn":
            mode = "rainbowMode";
            break;
        case "greyscale-btn":
            mode = "greyscaleMode";
            break;
    }
}

function changeSelectedColor(event) {
    selectedColor = event.target.value;
}

function changeButtonBackgroundColor(event) {
    colorChangeButtons.forEach((button) => button.style.backgroundColor = inactiveButtonColor);
    event.target.style.backgroundColor = activeButtonColor;
}

function toggleGrid() {
    let cells = document.querySelectorAll(".cell");
    if (showGrid) {
        cells.forEach((cell) => cell.style.borderStyle = "none");
        showGrid = false;
        showGridBtn.style.backgroundColor = inactiveButtonColor;
    } else {
        cells.forEach((cell) => cell.style.borderStyle = "solid");
        showGrid = true;
        showGridBtn.style.backgroundColor = activeButtonColor;
    }
}

function toggleAutoDraw() {
    if (autoDraw) {
        autoDraw = false;
        autoDrawBtn.style.backgroundColor = inactiveButtonColor;
    } else {
        autoDraw = true;
        autoDrawBtn.style.backgroundColor = activeButtonColor;
    }
}

function calculateGreyScale(rgb) {
    rgb = rgb.substring(4, rgb.length-1)
    .replace(/ /g, '')
    .split(',');
    if(rgb[0] === rgb[1] && rgb[1] === rgb[2]) {
        rgb[0] = rgb[0] - 25;
        rgb[1] = rgb[1] - 25;
        rgb[2] = rgb[2] - 25;
    } else {
        rgb[0] = 245;
        rgb[1] = 245;
        rgb[2] = 245;
    } return rgb;
}

function getRandomInt(max) {
    return Math.floor(Math.random() * max);
}