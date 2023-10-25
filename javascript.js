// parameters
const GRID_BOARD_SIZE = 600;
let DefaultGridNum = 50;
let curMode = 'pencil';
let pencilColor = 'black';
let gradientColor = 0;
let mouseDown = false;
const rangeBar = document.getElementById("gridSize-pan")
const gridSize = document.getElementById("gridSize")
const pencil = document.getElementById("pencil")
const rainbow = document.getElementById("rainbow")
const gradient = document.getElementById("gradient")
const eraser = document.getElementById("eraser")
const clear = document.getElementById("clear")
const colorPan = document.getElementById("color-pan")

// create grid box
plotGridBoard(DefaultGridNum);
rangeBar.value = DefaultGridNum;
gridSize.innerHTML = `${rangeBar.value} x ${rangeBar.value}`; // Display the default slider value

// add eventListener
document.body.onmousedown = (e) => {
    if (e.target.tagName !== 'INPUT' && e.target.type !== "range") e.preventDefault();
    mouseDown = true;
};
document.body.onmouseup = (e) => {
    // Update the current slider value (each time you drag the slider handle)
    if (e.target.tagName === 'INPUT' && e.target.type === "range") {
        DefaultGridNum = rangeBar.value;
        plotGridBoard(DefaultGridNum);
        gridSize.innerHTML = `${rangeBar.value} x ${rangeBar.value}`;
    }
    mouseDown = false;
}

pencil.addEventListener('click', (e) => {
    highlightButton(e.target.textContent);
    curMode = 'pencil';
})

rainbow.addEventListener('click', (e) => {
    highlightButton(e.target.textContent);
    curMode = 'rainbow';
})

gradient.addEventListener('click', (e) => {
    highlightButton(e.target.textContent);
    curMode = 'gradient';
})

eraser.addEventListener('click', (e) => {
    highlightButton(e.target.textContent);
    curMode = 'eraser';
})

colorPan.addEventListener('click', (e) => {
    e.stopPropagation();
})
clear.addEventListener('click', clearGrid)

function plotGridBoard(DefaultGridNum) {
    const gridBoard = document.querySelector(".gridBoard");
    const gridSize = GRID_BOARD_SIZE / DefaultGridNum;
    // remove existing grids before adding new grids
    while (gridBoard.firstChild) {
        gridBoard.removeChild(gridBoard.firstChild);
    }
    // adding new grids
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
    if (curMode === 'pencil') {
        grid.style.backgroundColor = colorPan.value;
    } else if (curMode == 'rainbow') {
        grid.style.backgroundColor = getRandomRGB();
    } else if (curMode == 'gradient') {
        grid.style.backgroundColor = `rgb(${gradientColor}, ${gradientColor}, ${gradientColor})`;
        gradientColor += 5
        gradientColor = (gradientColor < 256) ? gradientColor : 0; 
    } else if (curMode == 'eraser') {
        grid.style.backgroundColor = 'white';
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
    return 'rgba(' + o(r() * s) + ',' + o(r() * s) + ',' + o(r() * s) + ',' + r().toFixed(1) + ')';
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

// For mobile device to draw by touchdown
document.body.addEventListener('pointerdown', (e) => {
    if (e.target.tagName !== 'INPUT' && e.target.type !== "range") e.preventDefault();
    mouseDown = true;
}, false);

document.body.addEventListener('pointerup', (e) => {
    // Update the current slider value (each time you drag the slider handle)
    if (e.target.tagName === 'INPUT' && e.target.type === "range") {
        DefaultGridNum = rangeBar.value;
        plotGridBoard(DefaultGridNum);
        gridSize.innerHTML = `${rangeBar.value} x ${rangeBar.value}`;
    }
    mouseDown = false;
}, false);