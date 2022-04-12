import fuzzySearch from '../fuzzySearch';
describe('util/fuzzySearch', function () {
  test('should return true when search is equal to content', function () {
    expect(fuzzySearch('foo', 'foo')).toBe(true);
  });
  test('should return false when search is larger than the content', function () {
    expect(fuzzySearch('fooo', 'foo')).toBe(false);
  });
  test('should return true when doing a basic search', function () {
    expect(fuzzySearch('foo', 'foo bar')).toBe(true);
  });
  test('should enforce a default character limit', function () {
    expect(fuzzySearch('fo', 'foo bar')).toBe(false);
  });
  test('should allow character limit to be configured', function () {
    expect(fuzzySearch('fo', 'foo bar', 2)).toBe(true);
  });
  test('should return false when search is too broken up in content', function () {
    expect(fuzzySearch('fbr', 'foo barazaz')).toBe(false);
  });
  test('should return false when search is too broken up in longer content', function () {
    // 3 gaps
    expect(fuzzySearch('fooimuartles', 'footimus bartocles')).toBe(false);
  });
  test('should allow approximate number of gaps to be configured', function () {
    // 3 gaps
    expect(fuzzySearch('fooimuartles', 'footimus bartocles', 3, 3)).toBe(true);
  });
  test('should return true when search has more gaps than allowed, but has a large streak', function () {
    // 4 gaps
    expect(fuzzySearch('footimusatce', 'footimus bartocles')).toBe(true);
  });
  test('should handle gap numbers larger than the search term', function () {
    expect(fuzzySearch('foo', 'footimus bartocles', 3, 99999)).toBe(true);
  });
  test('should ignore whitespace in the search', function () {
    expect(fuzzySearch('f o o', 'foo bar')).toBe(true);
  });
  test('should match strings that appear continiously later', function () {
    expect(fuzzySearch('baz', 'foobar bazbat')).toBe(true);
  });
  test('should match strings that appear continiously later', function () {
    expect(fuzzySearch('baz', 'bufoobar bazbat')).toBe(true);
  });
  test('should ignore whitespace in the content', function () {
    expect(fuzzySearch('foo', 'f o o b a r')).toBe(true);
  });
  test('should do fuzzy searching', function () {
    expect(fuzzySearch('ooar', 'foo bar')).toBe(true);
  });
  test('should return false when content is empty', function () {
    expect(fuzzySearch('foo', '')).toBe(false);
  });
  test('should return false when search is empty', function () {
    expect(fuzzySearch('', 'foo bar')).toBe(false);
  });
});