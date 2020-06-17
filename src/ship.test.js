import Ship from './ship';

let testShip;

beforeEach(() => {
  testShip = Ship(5, 'vertical', 5, 5);
})

test('Creates ship object', () => {
  expect(typeof testShip).toBe('object')
})

test('Ship object has shipLength and hit and isSunk methods', () => {
  expect(testShip).toHaveProperty('shipLength', 'shipOrientation', 'ship', 'hit', 'isSunk')
})

test('Ship is getting hit', () => {
  expect(testShip.hit(7, 5)).toEqual(true)
})

test('Ship doesnt sink when not hit on every position', () => {
  testShip.hit(5,5)
  testShip.hit(6,5)
  testShip.hit(7,5)
  expect(testShip.isSunk()).toBe(false);
})

test('Ship sunks when hit on every position', () => {
  testShip.hit(5,5)
  testShip.hit(6,5)
  testShip.hit(7,5)
  testShip.hit(8,5)
  testShip.hit(9,5)
  expect(testShip.isSunk()).toBe(true);
})


