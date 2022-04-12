import { decode } from '../keys';
describe('decode()', function () {
  test('should return empty when no key', function () {
    expect(decode({
      key: ''
    })).toBe('');
  });
  test('should return empty when modifier and key are same', function () {
    expect(decode({
      key: 'Control',
      ctrlKey: true
    })).toBe('');
  });
  test('should return correct wtesth ctrl modifier', function () {
    expect(decode({
      key: '1',
      ctrlKey: true
    })).toBe('Control+1');
  });
  test('should return correct wtesth shift modifier', function () {
    expect(decode({
      key: '1',
      shiftKey: true
    })).toBe('Shift+1');
  });
  test('should return correct wtesth meta modifier', function () {
    expect(decode({
      key: '1',
      metaKey: true
    })).toBe('Meta+1');
  });
  test('should return space key', function () {
    expect(decode({
      key: ' '
    })).toBe('Space');
  });
  test('should return right arrow key', function () {
    expect(decode({
      key: 'Right'
    })).toBe('ArrowRight');
  });
  test('should return left arrow key', function () {
    expect(decode({
      key: 'Left'
    })).toBe('ArrowLeft');
  });
  test('should return up arrow key', function () {
    expect(decode({
      key: 'Up'
    })).toBe('ArrowUp');
  });
  test('should return down arrow key', function () {
    expect(decode({
      key: 'Down'
    })).toBe('ArrowDown');
  });
  test('should return esc key', function () {
    expect(decode({
      key: 'U+001B'
    })).toBe('Escape');
  });
  test('should decode correct UTF8 key', function () {
    expect(decode({
      key: 'U+0041'
    })).toBe('A');
  });
});