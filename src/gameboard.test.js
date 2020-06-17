import Ship from './ship';
import Gameboard from './gameboard';

let gameBoard;

beforeEach( () => {
  gameBoard = Gameboard();
})

test('Creates gameboard', () => {
  expect(Array.isArray(gameBoard.board)).toBe(true);
  expect(gameBoard.board.length).toBe(10);
  expect(gameBoard.board[2][3]).toBe(null);
})

test('Can place ship horizontaly with starting position (row), (column)', () => {
  gameBoard.placeShip(3, 'horizontal', 5, 3)
  expect(gameBoard.board[5][2]).toBe(null);
  expect(gameBoard.board[5][3]).toBe('O');
  expect(gameBoard.board[5][4]).toBe('O');
  expect(gameBoard.board[5][5]).toBe('O');
  expect(gameBoard.board[5][6]).toBe(null);
})

test('Can place ship verticaly with starting position (row), (column)', () => {;
  gameBoard.placeShip(3, 'vertical', 3, 5);
  expect(gameBoard.board[2][5]).toBe(null)
  expect(gameBoard.board[3][5]).toBe('O');
  expect(gameBoard.board[4][5]).toBe('O');
  expect(gameBoard.board[5][5]).toBe('O');
  expect(gameBoard.board[6][5]).toBe(null);
})

test('Cant place ships on top of each other verticaly', () => {
  gameBoard.placeShip(3, 'vertical', 3, 5);
  gameBoard.placeShip(6, 'vertical', 3, 5);
  expect(gameBoard.ships.length).toBe(1)
  expect(gameBoard.board[2][5]).toBe(null)
  expect(gameBoard.board[3][5]).toBe('O')
  expect(gameBoard.board[4][5]).toBe('O')
  expect(gameBoard.board[5][5]).toBe('O')
  expect(gameBoard.board[6][5]).toBe(null)
  expect(gameBoard.board[7][5]).toBe(null)
})

test('Cant place ships on top of each other horizontaly', () => {
  gameBoard.placeShip(3, 'horizontal', 5, 5);
  gameBoard.placeShip(6, 'horizontal', 5, 5);
  expect(gameBoard.ships.length).toBe(1)
  expect(gameBoard.board[5][4]).toBe(null)
  expect(gameBoard.board[5][5]).toBe('O')
  expect(gameBoard.board[5][6]).toBe('O')
  expect(gameBoard.board[5][7]).toBe('O')
  expect(gameBoard.board[5][8]).toBe(null)
  expect(gameBoard.board[5][9]).toBe(null)
})

test('Cant place ships outside of the board', () => {
  gameBoard.placeShip(3, 'horizontal', 1, 5);
  gameBoard.placeShip(3, 'horizontal', 2, 8);
  gameBoard.placeShip(3, 'horizontal', 3, 9);
  gameBoard.placeShip(3, 'vertical', 7, 5);
  gameBoard.placeShip(3, 'vertical', 8, 6);
  gameBoard.placeShip(3, 'vertical', 9, 7);
  expect(gameBoard.ships.length).toBe(2);
})

test('can receive attack and decide if it hit ship', () => {
  gameBoard.placeShip(3, 'horizontal', 5, 3);
  expect(gameBoard.receiveAttack(5, 3).shipWasHit).toBe(true);
  expect(gameBoard.receiveAttack(5, 4).shipWasHit).toBe(true);
  expect(gameBoard.receiveAttack(5, 5).shipWasHit).toBe(true);
  expect(gameBoard.receiveAttack(7, 7).shipWasHit).toBe(false);
}) 

test('Reports if all ships sunk', () => {
  gameBoard.placeShip(3, 'horizontal', 5, 3);
  gameBoard.receiveAttack(5, 3);
  gameBoard.receiveAttack(5, 4);
  gameBoard.receiveAttack(5, 5);
  expect(gameBoard.allSunk()).toBe(true);
})

test('Doesnt report when there are ships left', () => {
  gameBoard.placeShip(3, 'horizontal', 5, 3);
  gameBoard.receiveAttack(5, 3);
  gameBoard.receiveAttack(5, 4);
  expect(gameBoard.allSunk()).toBe(false);
})