import FolderCollaborations from '../FolderCollaborations';
var folderCollaborations;
describe('api/FolderCollaborations', function () {
  beforeEach(function () {
    folderCollaborations = new FolderCollaborations({});
  });
  describe('getUrl()', function () {
    test('should throw when a folder ID is not provided', function () {
      expect(function () {
        folderCollaborations.getUrl();
      }).toThrow();
    });
    test('should return the correct collaborations API URL with the provided ID', function () {
      var MOCK_FOLDER_ID = '14237093';
      expect(folderCollaborations.getUrl(MOCK_FOLDER_ID)).toBe("https://api.box.com/2.0/folders/".concat(MOCK_FOLDER_ID, "/collaborations"));
    });
  });
});