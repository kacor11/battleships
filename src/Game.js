function playGame(player, computerPlayer) {

  let humanNext = true; 
  let fields = document.querySelectorAll('.computer-space');
  fields.forEach(field => field.addEventListener('click', makeAttack));
  

  function makeAttack(event) {
    const row = Number(event.target.dataset.row);
    const column = Number(event.target.dataset.column);
    const { sunkShipCoords, shipWasSunk, shipWasHit} = player.attack(row, column);
    shipWasHit ? event.target.classList.add('fire') : event.target.classList.add('water');
    if(shipWasSunk) {
      sunkShipCoords.forEach(cell => {
        document.querySelector(`.computer-space[data-row="${cell.row}"][data-column="${cell.column}"]`).classList.add('sunk')
      })
    }
    event.target.removeEventListener('click', makeAttack);
    if(player.hasWon()) {
      const enemyBoard = document.querySelector('.enemy-board');
      const winImg = document.createElement('img');
      winImg.classList.add('success')
      winImg.src = '../src/assets/success.jpg';
      enemyBoard.appendChild(winImg);
    } else {
      computerTurn()
    }
      
  }
  function computerTurn() {
    const { sunkShipCoords, shipWasSunk, shipWasHit, row, column} = computerPlayer.attack();
      let domNode = document.querySelector(`.my-space[data-row="${row}"][data-column="${column}"]`)
      shipWasHit ? domNode.classList.add('fire') : domNode.classList.add('water'); 
      if(shipWasSunk) {
        sunkShipCoords.forEach(cell => {
          document.querySelector(`.my-space[data-row="${cell.row}"][data-column="${cell.column}"]`).classList.add('sunk')
        })
      }
      if(computerPlayer.hasWon()) {
        const enemyBoard = document.querySelector('.enemy-board');
        const lossImg = document.createElement('img');
        lossImg.classList.add('failure')
        lossImg.src = '../src/assets/failure.jpg';
        enemyBoard.appendChild(lossImg);
      }
  }
}

export default playGame