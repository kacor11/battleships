function Ship(length, shipOrientation, startingRow, startingColumn) {

  let ship = []
  const shipLength = length;

  if(shipOrientation === 'horizontal') {
    for(let i = 0; i < length; i++) {
      ship[i] = {
        row: startingRow, 
        column: startingColumn + i, 
        hit: 'O'
      }
    }
  } else {
    for(let i = 0; i < length; i++) {
      ship[i] = {
        row: startingRow + i, 
        column: startingColumn , 
        hit: 'O'
      }
    }
  }

  const hit = (row, column) => {
    let wasHit = false;
    const hitShip = [...ship];
    hitShip.forEach(part => {
      if(part.row === row && part.column === column && part.hit === 'O') {
        part.hit = 'X'
        wasHit = true;
      }
    })
    ship = hitShip;
    return wasHit;
  }

  const isSunk = () => ship.every(position => position.hit === "X"); 

  
  return {
    shipLength,
    shipOrientation,
    ship,
    hit,
    isSunk,
  }
}
export default Ship