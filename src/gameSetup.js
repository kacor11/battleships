import Player from './player'
import Gameboard from './gameboard'
import playGame from './Game'

function gameSetup() {

  let resetButton = document.querySelector('.reset')
  let playerBoard = Gameboard();
  let computerBoard = Gameboard();
  let player = Player(true, computerBoard);
  let computerPlayer = Player(false, playerBoard);
  let ships = [[5, 'horizontal', 'carrier'], [4, 'horizontal', 'battleship'], [3, 'horizontal', 'destroyer'], [2, 'horizontal', 'patrolboat'], [3, 'horizontal', 'submarine']];
  drawDomPlayerBoard();
  drawDomComputerBord();
  shipPlacement();




function shipPlacement() {
  aiShipPlacement();
  let dragged
  let shipLeftOffset
  let shipTopOffset
  
  function dragAndDropListeners() {
    document.addEventListener('click', togleShipOrientation)
    document.addEventListener('dragstart', dragStart);
    document.addEventListener("dragover", dragOver);
    document.addEventListener("drop", placeShipOnBoard);
    resetButton.addEventListener('click', removeListenersAndRestart)
  }

  const removeListenersAndRestart = function() {
    document.removeEventListener('click', togleShipOrientation)
    document.removeEventListener('dragstart', dragStart);
    document.removeEventListener("dragover", dragOver);
    document.removeEventListener("drop", placeShipOnBoard);
    resetButton.removeEventListener('click', removeListenersAndRestart)
    restartGame()
  }
  const dragStart = function(event) {
    dragged = event.target;
    shipTopOffset = Math.floor((event.clientY - event.target.getBoundingClientRect().top) / 38)
    shipLeftOffset = Math.floor((event.clientX - event.target.getBoundingClientRect().left) / 38)
    console.log(shipTopOffset)
  }
  const dragOver = function(event) {
    event.preventDefault();
  }
  const placeShipOnBoard = function(event) {
    event.preventDefault();
    if(event.target.className === 'my-space') {
      handleShipPlacement();
      if(ships.length === 0) {
        document.removeEventListener('click', togleShipOrientation)
        document.removeEventListener('dragstart', dragStart);
        document.removeEventListener("dragover", dragOver);
        document.removeEventListener("drop", placeShipOnBoard);
        playGame(player, computerPlayer)
      }
    }
  }
  const handleShipPlacement = function() {  
    let columnNumber = Number(event.target.dataset.column);
    let rowNumber = Number(event.target.dataset.row);
    const startShipDomCell = document.elementFromPoint(event.clientX - shipLeftOffset * 38, event.clientY - shipTopOffset * 38);
    const startShipDomCellRow =  Number(startShipDomCell.dataset.row);
    const startShipDomCellColumn =  Number(startShipDomCell.dataset.column)
    ships.forEach((ship, index) => {
      const [length, orientation, type] = ship;
      if(dragged.classList.contains(type)) {
        if(playerBoard.placeShip(length, orientation, startShipDomCellRow, startShipDomCellColumn)) {
          ships.splice(index, 1);
          event.target.parentNode.appendChild( dragged );
          dragged.style.left = (columnNumber * 38 + 2 * columnNumber - shipLeftOffset * 38) + 'px';
          dragged.style.top = (rowNumber * 38 + 2 * rowNumber - shipTopOffset * 38) + 'px';
        }
      }
    })
  }

  function aiShipPlacement() {
    let shipLengthsArray = [2, 3, 3, 4, 5];
    while(computerBoard.ships.length < 5) {
      const position = randomShipPosition()
      const { orientation, row, column } = position;
      if(computerBoard.placeShip(shipLengthsArray[0], orientation, row, column)) {
        shipLengthsArray.splice(0, 1);
      }

    }
    function randomShipPosition() {
      const orientation = Math.floor(Math.random() * 2) + 1 === 1 ? 'horizontal' : 'vertical';
      const row = Math.floor(Math.random() * 10)   
      const column = Math.floor(Math.random() * 10) 
      return { orientation, row, column }
    }
  }
  const togleShipOrientation = function(event) {
    if(event.target.classList.contains('ship') && document.querySelector('.ship-box').contains(event.target)) {
      let ship = event.target;
      let [name, type, orientation] = ship.classList;
      orientation === 'horizontal' ? ship.src = `../src/assets/${type}-vertical.png` : ship.src = `../src/assets/${type}.png`;
      ships.forEach(ship => {
        if(ship[2] === type) {
          ship[1] === 'horizontal' ? ship[1] = 'vertical' : ship[1] = 'horizontal';
        }
      })
      ship.classList.toggle('horizontal');
      ship.classList.toggle('vertical');
      let temp = ship.height;
      ship.height = ship.width;
      ship.width = temp;     
    }
  }
  dragAndDropListeners();
}

  function drawDomPlayerBoard() {
    const playerDomBoard = document.querySelector('.player-board')
    for(let row = 0; row < 10; row++) {
      for(let column = 0; column < 10; column++) {
        const div = document.createElement('div');
        div.classList.add('my-space');
        div.dataset.row = row;
        div.dataset.column = column;
        playerDomBoard.appendChild(div);      
      }
    }
  }

  
  function drawDomComputerBord() {
    const enemyBoard = document.querySelector('.enemy-board')
    for(let row = 0; row < 10; row++) {
      for(let column = 0; column < 10; column++) {
        const div = document.createElement('div');
        div.classList.add('computer-space');
        div.dataset.row = row;
        div.dataset.column = column;
        enemyBoard.appendChild(div);      
      }
    }
  }

function restartGame() {
  const playerDomBoard = document.querySelector('.player-board');
  const enemyBoard = document.querySelector('.enemy-board');
  const domShips = document.querySelectorAll('.ship');
  domShips.forEach(ship => {
    ship.src = `../src/assets/${ship.classList[1]}.png`
    const shipBox = document.querySelector(`.${ship.classList[1]}-box`)
    if(ship.height > ship.width) {
      const temp = ship.height;
      ship.height = ship.width;
      ship.width = temp;
    }
    ship.removeAttribute('style');
    shipBox.appendChild(ship);
  })
  playerDomBoard.innerHTML = '';
  enemyBoard.innerHTML = '';
  drawDomPlayerBoard();
  drawDomComputerBord();
  playerBoard = Gameboard();
  computerBoard = Gameboard();
  ships = [[5, 'horizontal', 'carrier'], [4, 'horizontal', 'battleship'], [3, 'horizontal', 'destroyer'], [2, 'horizontal', 'patrolboat'], [3, 'horizontal', 'submarine']];
  player = Player(true, computerBoard);
  computerPlayer = Player(false, playerBoard);
  shipPlacement();
}


}

export default gameSetup 