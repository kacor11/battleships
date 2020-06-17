import Player from './player';

test('creates new player object', () => {
  const testPlayer = Player();
  expect(typeof testPlayer).toBe('object')
})

test('creates new AI oponent', () => {
  const testPlayer = Player(false);
  expect(testPlayer.isHuman).toBe(false)
})

test('Register player attack', () => {
  const testPlayer = Player(true);
  testPlayer.attack(5, 5)
  expect()
})