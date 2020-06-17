import Ship from './ship';
function Gameboard() {
  let board = Array(10).fill(null).map(() => (Array(10).fill(null)));
  let ships = [];

  const placeShip = (length, orientation, startingRow = Math.floor(Math.random() * 10), startingColumn = Math.floor(Math.random() * 10)) => {
    if(testPlacement(length, orientation , startingRow, startingColumn)) {
      const ship = Ship(length, orientation, startingRow, startingColumn)
      placeOnBoard(length, orientation, startingRow, startingColumn);
      ships.push(ship)
      return true;
    }
    return false;
  }

  const testPlacement = function(length, orientation, startingRow, startingColumn) {
    if(orientation === 'horizontal') {
      if(!startingColumn && startingColumn !==0 || startingColumn + length - 1 > 9) {
        return false
      }
      for(let i = 0; i < length; i++) {
        if(board[startingRow][i + startingColumn] !== null) {
          return false
        }
      }
    } else {
      if(!startingRow && startingRow !== 0|| startingRow + length - 1  > 9) {
        return false
      }
        for(let i = 0; i < length; i++) {
          if(board[i + startingRow][startingColumn] !== null) {
            return false
          }
       }
    }
    return true
  }

  const placeOnBoard = function (length, orientation, startingRow, startingColumn) {
    if(orientation === 'horizontal') {
      for(let i = 0; i < length; i++) {
        board[startingRow][i + startingColumn] = 'O';
      }
    } else {
      for(let i = 0; i < length; i++) {
        board[i + startingRow][startingColumn] = 'O';
      }
    }
  }
  const receiveAttack = (row, column) => {
    let shipWasHit = false;
    let shipWasSunk = false;
    let sunkShipCoords = [];
    console.log(ships)
    ships.forEach(ship => {
      if(ship.hit(row, column)) {
        shipWasHit = true
        shipWasSunk = ship.isSunk();
        if(shipWasSunk) {
          ship.ship.forEach(cell => {
            sunkShipCoords.push({row: cell.row, column: cell.column})
          })
        }
      }
    })
    board[row][column] = 'X';
    return { sunkShipCoords, shipWasSunk, shipWasHit, row, column };
  }

  const allSunk = () => ships.every(ship => ship.isSunk() === true)

  return {
    board,
    ships,
    placeShip,
    receiveAttack,
    allSunk,
    testPlacement
  }
}

export default Gameboard