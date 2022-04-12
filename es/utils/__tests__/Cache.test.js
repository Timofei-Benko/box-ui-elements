import Cache from '../Cache';
var cache;
describe('util/Cache', function () {
  beforeEach(function () {
    cache = new Cache();
  });
  test('should set, get and unset correctly', function () {
    cache.set('foo', 'bar');
    expect(cache.has('foo')).toBeTruthy();
    expect(cache.get('foo')).toBe('bar');
    cache.unset('foo');
    cache.unset('foo');
    expect(cache.has('foo')).toBeFalsy();
  });
  test('should set and get correctly with 0 value', function () {
    cache.set('foo', 0);
    expect(cache.has('foo')).toBeTruthy();
    expect(cache.get('foo')).toBe(0);
  });
  test('should return undefined when not set', function () {
    cache.set('foo1', 'bar1');
    cache.set('foo2', 'bar2');
    cache.set('foo3', 'bar3');
    expect(cache.get('foo1')).toBe('bar1');
    expect(cache.get('foo2')).toBe('bar2');
    expect(cache.get('foo3')).toBe('bar3');
    cache.unsetAll('foo');
    expect(cache.get('foo1')).toBeUndefined();
    expect(cache.get('foo2')).toBeUndefined();
    expect(cache.get('foo3')).toBeUndefined();
  });
  test('should properly unset all', function () {
    expect(cache.get('foobar')).toBeUndefined();
  });
  test('should merge correctly without mutating original object', function () {
    var origObj = {
      a: 1
    };
    var newObj = {
      b: 2
    };
    cache.set('foo', origObj);
    cache.merge('foo', newObj);
    var value = cache.get('foo');
    expect(1).toBe(value.a);
    expect(2).toBe(value.b);
    expect(value).not.toBe(origObj);
  });
  test('should not merge non existant items', function () {
    try {
      cache.merge('foo', {
        b: 2
      });
    } catch (e) {
      expect('Key foo not in cache!').toBe(e.message);
    }
  });
});