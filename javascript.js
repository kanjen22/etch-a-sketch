// parameters
const GRID_BOARD_SIZE = 400;
let DefaultGridNum = 50;
let currentMode = 'pencil';
let mouseDown = false;
const eraser = document.getElementById("eraser")
const pencil = document.getElementById("pencil")
const clear = document.getElementById("clear")

// create grid box
plotGridBoard(DefaultGridNum);

// add eventListener
document.body.onmousedown = () => (mouseDown = true);
document.body.onmouseup = () => (mouseDown = false);
eraser.addEventListener('click', (e) => {
    highlightButton(e.target.textContent);
    currentMode = 'eraser';
})
pencil.addEventListener('click', (e) => {
    highlightButton(e.target.textContent);
    currentMode = 'pencil';
})
rainbow.addEventListener('click', (e) => {
    highlightButton(e.target.textContent);
    currentMode = 'rainbow';
})
clear.addEventListener('click', clearGrid)


function plotGridBoard(DefaultGridNum) {
    const gridBoard = document.querySelector(".gridBoard");
    const gridSize = GRID_BOARD_SIZE / DefaultGridNum;
    for (let r = 0; r < DefaultGridNum; r++) {
        const rowGridBox = document.createElement("div")
        rowGridBox.className = "rowGridBox";
        for (let c = 0; c < DefaultGridNum; c++) {
            const grid = createGrid(gridSize);
            rowGridBox.appendChild(grid);
        }
        gridBoard.appendChild(rowGridBox);
    }
}

function createGrid(gridSize) {
    const grid = document.createElement("div");
    grid.className = "grid";
    grid.style.cssText = `width: ${gridSize}px; height: ${gridSize}px;`;
    grid.addEventListener('mouseenter', changeColor)
    return grid
}

function changeColor(e) {
    if (!mouseDown) return
    grid = e.target;
    if (currentMode === 'pencil') {
        grid.style.backgroundColor = 'black';
    } else if (currentMode == 'eraser') {
        grid.style.backgroundColor = 'white';
    } else if (currentMode == 'rainbow') {
        grid.style.backgroundColor = getRandomRGB();
    }

}

function clearGrid() {
    const grids = document.querySelectorAll(".grid")
    grids.forEach((grid) => {
        grid.style.backgroundColor = "white";
    })
}

function getRandomRGB() {
    var o = Math.round, r = Math.random, s = 255;
    return 'rgba(' + o(r()*s) + ',' + o(r()*s) + ',' + o(r()*s) + ',' + r().toFixed(1) + ')';
}

function highlightButton(curBtn) {
    btns = document.querySelectorAll("button");
    btns.forEach((btn) => {
        if (btn.textContent === curBtn) {
            btn.style.backgroundColor = 'darkgrey';
        } else {
            btn.style.backgroundColor = 'white';
        }
    })
}


