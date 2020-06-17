function Player(isHuman, enemyBoard) {
  const attack = (row, column) => {
    if(isHuman) {
      return enemyBoard.receiveAttack(row, column)
    } else {
    return aiAttack();
  }
}

  function aiAttack() {
    while(true) {
      let row = Math.floor(Math.random() * 10);
      let column = Math.floor(Math.random() * 10);
      if(enemyBoard.board[row][column] !== 'X') {
        return enemyBoard.receiveAttack(row, column);
      }
    }
  }

  function hasWon() {
    return enemyBoard.allSunk();
  }
  return {
    isHuman,
    attack,
    hasWon
  }
}

export default Player