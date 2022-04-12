import FileAccessStats from '../FileAccessStats';
var accessStats;
describe('api/FileAccessStats', function () {
  beforeEach(function () {
    accessStats = new FileAccessStats({});
  });
  describe('getUrl()', function () {
    test('should throw when access stats api url without id', function () {
      expect(function () {
        accessStats.getUrl();
      }).toThrow();
    });
    test('should return correct access stats api url with id', function () {
      expect(accessStats.getUrl('foo')).toBe('https://api.box.com/2.0/file_access_stats/foo');
    });
  });
});