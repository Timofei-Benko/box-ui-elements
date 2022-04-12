import size from '../size';
describe('util/size', function () {
  test('should return 0 bytes when undefined', function () {
    expect(size()).toBe('0 Byte');
  });
  test('should return 0 bytes when 0', function () {
    expect(size(0)).toBe('0 Byte');
  });
  test('should return 1 Bytes', function () {
    expect(size(1)).toBe('1 Bytes');
  });
  test('should return 1 KB', function () {
    expect(size(1024)).toBe('1 KB');
  });
  test('should return 1 MB', function () {
    expect(size(1024 * 1024)).toBe('1 MB');
  });
  test('should return 1 GB', function () {
    expect(size(1024 * 1024 * 1024)).toBe('1 GB');
  });
  test('should return 1 TB', function () {
    expect(size(1024 * 1024 * 1024 * 1024)).toBe('1 TB');
  });
  test('should return 1 PB', function () {
    expect(size(1024 * 1024 * 1024 * 1024 * 1024)).toBe('1 PB');
  });
});