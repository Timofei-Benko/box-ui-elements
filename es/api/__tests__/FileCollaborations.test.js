import FileCollaborations from '../FileCollaborations';
var fileCollaborations;
describe('api/FileCollaborations', function () {
  beforeEach(function () {
    fileCollaborations = new FileCollaborations({});
  });
  describe('getUrl()', function () {
    test('should throw when a file ID is not provided', function () {
      expect(function () {
        fileCollaborations.getUrl();
      }).toThrow();
    });
    test('should return the correct collaborations API URL with the provided ID', function () {
      var MOCK_FILE_ID = '14237093';
      expect(fileCollaborations.getUrl(MOCK_FILE_ID)).toBe("https://api.box.com/2.0/files/".concat(MOCK_FILE_ID, "/collaborations"));
    });
  });
});