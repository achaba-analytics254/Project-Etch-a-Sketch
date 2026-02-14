// Project: Etch-a-Sketch

// create container divs

const padContainer = document.getElementById('padContainer');
const header = document.createElement('div');
const sketchPad = document.createElement('div');
const padButtons = document.createElement('div');

// create elements
const h1 = document.createElement('h1');
const createNewBtn = document.createElement('button');
const darkBtn = document.createElement('button');
const whiteBtn = document.createElement('button');
const randomBtn = document.createElement('button');
const resetBtn = document.createElement('button');

// append divs and elements
padContainer.appendChild(header);
header.appendChild(h1);
header.appendChild(createNewBtn);
padContainer.appendChild(header);
padContainer.appendChild(sketchPad);
padContainer.appendChild(padButtons);
padButtons.appendChild(darkBtn);
padButtons.appendChild(whiteBtn);
padButtons.appendChild(randomBtn);
padButtons.appendChild(resetBtn);

// elements text content
h1.textContent = 'Etch-a-Sketch';
createNewBtn.textContent = 'Create New';
darkBtn.textContent = 'Dark';
whiteBtn.textContent = 'White';
randomBtn.textContent = 'Random';
resetBtn.textContent = 'Clear'

// div ids
header.id = 'header';
sketchPad.id = 'sketchPad';
padButtons.id = 'padButtons';

// sketchpad logic

let currentColor = 'black';

function createGrid(size) {

    sketchPad.innerHTML = '';

    for (let i = 0; i < size * size; i++) {

        const square = document.createElement('div');

        square.classList.add('square');

        square.style.width = `${100 / size}%`;
        square.style.height = `${100 / size}%`;

        square.addEventListener('mouseover', () => {

            square.addEventListener('mouseover', () => {
                if (currentColor === 'black') {
                    square.style.background = 'black';
                } else if (currentColor === 'white') {
                    square.style.background = 'white';
                } else if (currentColor === 'random') {
                    square.style.background = randomColor();
                }
            });

        });

        sketchPad.appendChild(square);
    }
}
createGrid(16);

// random color function

function randomColor() {
    const red = Math.floor(Math.random() * 360);
    const green = Math.floor(Math.random() * 360);
    const blue = Math.floor(Math.random() * 360);
    return `rgb(${red}, ${green}, ${blue})`;
}

// button events

createNewBtn.addEventListener('click', () => {
    const newGrid = prompt('Enter new grid (max 100)');
    if (newGrid > 0 && newGrid <= 100) {
        createGrid(newGrid);
    } else {
        alert('Too high, grid must be less than 100 and greater than 0.')
    }
});

resetBtn.addEventListener('click', () => {
    createGrid(16)
})

darkBtn.addEventListener('click', () => {
    currentColor = 'black';
})

whiteBtn.addEventListener('click', () => {
    currentColor = 'white';
})

randomBtn.addEventListener('click', () => {
    currentColor = 'random';
})

