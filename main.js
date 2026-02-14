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
createNewBtn.textContent = 'Create New Grid';
darkBtn.textContent = 'Dark';
whiteBtn.textContent = 'White';
randomBtn.textContent = 'Random Color';
resetBtn.textContent = 'Clear'

// div ids
header.id = 'header';
sketchPad.id = 'sketchPad';
padButtons.id = 'padButtons';

// sketchpad logic

let currentColor = 'black';
let currentMode = 'darken';

function createGrid(size) {

    sketchPad.innerHTML = '';

    for (let i = 0; i < size * size; i++) {

        const square = document.createElement('div');

        square.classList.add('square');

        // grid size
        square.style.width = `${100 / size}%`;
        square.style.height = `${100 / size}%`;

        // change grid color on hoover

        square.addEventListener('mouseover', () => {

            let h, s, l;

            // If no color yet, set initial one
            if (!square.dataset.h) {

                let baseColor;

                if (currentColor === 'black') {
                    baseColor = 'rgb(0,0,0)';
                } else if (currentColor === 'white') {
                    baseColor = 'rgb(255,255,255)';
                } else {
                    baseColor = randomColor();
                }

                const rgb = baseColor.match(/\d+/g).map(Number);
                [h, s, l] = rgbToHsl(rgb[0], rgb[1], rgb[2]);

            } else {
                h = Number(square.dataset.h);
                s = Number(square.dataset.s);
                l = Number(square.dataset.l);
            }

            // Reduce lightness by 10 each hover
            l = Math.max(l - 10, 0);

            // Store updated values
            square.dataset.h = h;
            square.dataset.s = s;
            square.dataset.l = l;

            square.style.backgroundColor = `hsl(${h}, ${s}%, ${l}%)`;
        });


        sketchPad.appendChild(square);
    }
}
createGrid(16);

// random color function

function randomColor() {
    const red = Math.floor(Math.random() * 256);
    const green = Math.floor(Math.random() * 256);
    const blue = Math.floor(Math.random() * 256);
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

// rgb to hsl for random colors opacity

function rgbToHsl(r, g, b) {
    r /= 255;
    g /= 255;
    b /= 255;

    const max = Math.max(r, g, b);
    const min = Math.min(r, g, b);
    let h, s, l = (max + min) / 2;

    if (max === min) {
        h = s = 0;
    } else {
        const d = max - min;
        s = l > 0.5 ? d / (2 - max - min) : d / (max + min);

        switch (max) {
            case r: h = (g - b) / d + (g < b ? 6 : 0); break;
            case g: h = (b - r) / d + 2; break;
            case b: h = (r - g) / d + 4; break;
        }

        h /= 6;
    }

    return [
        Math.round(h * 360),
        Math.round(s * 100),
        Math.round(l * 100)
    ];
}

