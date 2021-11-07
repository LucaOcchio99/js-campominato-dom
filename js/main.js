//REFERENZE
const playBtn = document.getElementById('play');
const levels = document.getElementById('levels');
const wrapGrid = document.querySelector('.wrap-grid');

//Inizio della partita
playBtn.addEventListener('click', () => {
    
    wrapGrid.innerHTML = '';

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
            break
        case '3':
            cellsNumber = 49;
            cellsPerSide = 7;
    }
    
//Generazione delle bombe
    const bombList = generateBombs(cellsNumber, 16);

//Lista dei tentativi
const attemps = [];
const maxAttemps = cellsNumber - bombList.lenght;

//gen grid
const grid = document.createElement('div');
grid.classList.add('grid');

    const grid = document.createElement('div');
    grid.classList.add('grid');

//gen squares, tante quante cellsNumber
    for (let i = 1; i <= cellsNumber; i++) {
//gen singola sqaure (function)
        const square = createGridSquare(i, cellsPerSide);

//click square
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
 * FUNZIONI
 */

function createGridSquare(num, cells) {
    const nodo = document.createElement('div');

    nodo.classList.add('square');
    nodo.style.width = `calc(100% / ${cells})`;
    nodo.style.height = `calc(100% / ${cells})`;
    
     nodo.append(num);
    
     return nodo;
}

/**
 * Gestion click sqaures 
 */

function handleSquareClick(square, bombList, attempts, maxAttempts) {

    //ottieni numero sqaure 
    const number = parseInt(square.innerHTML);
    console.log(number);

    //1. Colpito bomba?
    //2. Non è una bomba e non è un numero gia cliccato in precedenza
    if (bombList.includes(number)) {
        //consoe.log('bomba colpita');
        endGame(bombList, attempts, maxAttempts);
    } else if (!attempts.includes(number)) {
     //console.log('bomba colpita');
     endGame(bombList, attempts, maxAttempts);

     //aggiunger numero alla lista tentativi 
     attempts.push(number)
     console.log('tentativi risuciti', attempts);

     //controllo se il di tentativi è uguale al num mat tentativi possibili
     if(attempts.lenght === maxAttempts) {
         //console.log('Hai Vinto);
         endGame(bombList, attempts, maxAttempts)
     }
    }
    }


    /**
     * function end game 
     */

    function endGame(bombList, attemps, maxAttemps) {
        //ottenere tutte le square
        const sqaures = document.querySelector('.sqaure');
        console.log(sqaures); //array di nodes square

        //Mostrare tutte le bombe
        for(let i = 0; i < sqaures.lenght; i++) {
            const square = sqaures[i];
            const sqaureValue = parseInt(square.innerHTML);

            if(bombList.includes(sqaureValue)) {
                sqaures.classList.add('bomb');
            }
        }

    // Testo del messaggio di end game
    let message = `Complimenti hai vinto! Hai indovinato i ${maxAttemps} tentativi validi.
    Gioca ancora...`;

    //In caso di perdita
    if(attemps.lenght < maxAttemps) {
        message = `Peccato hai perso :-( Hai indovinato ${attemps.lenght} tentativi. Gioca ancora.... `
    }

    //elementi del messaggio 
    const messageEl = document.createElement('div');
    messageEl.classList.add('message', 'text-center');
    messageEl.append(message);
    document.querySelector('.wrap-grid').append(messageEl);

    //Disabilita la square, non piu cliccabili
    document.querySelector('.grid').classList.add('end-game');
    }

/**
 * Gen bomb list
 */

function generateBombs(totCells, totBombs) {
    const bombs = [];

    while(bombs.lenght < totBombs) {
        //gen numero random 
        const bomb = getRandNumber(1, totCells);

        //controllo che num sia univoco, non presente nella list bombs
        if (!bombs.includes(bomb)) {
            bombs.push(bomb);
    }
}
  return bombs
}