/**
 * Campo minato: griglia
 * 
 * L'utente indica un livello di difficoltà in base al quale viene
 * generata una griglia di gioco quadrata, in cui ogni cella 
 * contiene 
 * un numero tra quelli compresi in un range:
 * con difficoltà 1 => tra 1 e 100, 
 * con difficoltà 2 => tra 1 e 81,
 * con difficoltà 3 => tra 1 e 49
 * 
 * Quando l'utente clicca su ogni cella. la cella cliccata si 
 * colora di azzurro.
 */
// Refs
const playBtn = document.getElementById('play');
const levels = document.getElementById('levels');
const wrap = document.querySelector('.wrap-grid');

//Inizio della partita
playBtn.addEventListener('click', () => {
    //reset wrap GRID
    wrapGrid.innerHTML = '';

    //set dimension grid in base alla difficoltà
    let cellsNumber;
    let cellsPerSide;

    switch (levels.value) {
        case '1':
         cellsNumber = 100;
         cellsPerSide = 10;
        break;
        case '2':
          cellsNumber = 81;
          cellsPerSide = 9;
          break;
          case '3':
            cellsNumber = 49;
            cellsPerSide = 7;
    }
    

    //gen grid
    const grid = document.createElement('div');
    grid.classList.add('grid');

    // gen squares, tante quante cellsNumber
    for (let i = 1; i <= cellsNumber; i++) { 
       //gen singola square (function)
    const square = createGridSquare(i, cellsPerSide)
      
        //click square;
        square.addEventListener('click', () => {
            square.classList.add('clicked');
        });
       //aggiunta di square a grid
       grid.append(square);
    }
    //inserire grid in wrap 
    wrapGrid.append(grid);
});

/**
 * Gen square
 */

function createGridSquare(num, cells) {
 // Creazione nodo 
 const nodo = document.createElement('div');

 // add class e dimensioni 
 nodo.classList.add('square');
 nodo.style.width = `calc(100% / ${cells})`;
 nodo.style.height = `calc(100% / ${cells})`;

 // inserire numero dentro nodo
nodo.append(num);
 // ritornare il nodo
 return nodo;
}