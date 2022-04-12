function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

import FileCollaborators from '../FileCollaborators';
var fileCollaborators;
describe('api/FileCollaborators', function () {
  beforeEach(function () {
    fileCollaborators = new FileCollaborators({});
  });
  describe('getUrl()', function () {
    test('should throw when collaborators api url without id', function () {
      expect(function () {
        fileCollaborators.getUrl();
      }).toThrow();
    });
    test('should return correct collaborators api url with id', function () {
      expect(fileCollaborators.getUrl('foo')).toBe('https://api.box.com/2.0/files/foo/collaborators');
    });
  });
  describe('successHandler()', function () {
    test('should return API response with properly formatted data', function () {
      var collaborator = {
        id: 123,
        name: 'Kanye West',
        login: 'foo@bar.com',
        type: 'user'
      };
      var response = {
        next_marker: null,
        entries: [collaborator]
      };
      fileCollaborators.successCallback = jest.fn();

      var formattedResponse = _objectSpread({}, response, {
        entries: [{
          id: 123,
          name: 'Kanye West',
          item: {
            id: 123,
            name: 'Kanye West',
            login: 'foo@bar.com',
            email: 'foo@bar.com',
            type: 'user'
          }
        }]
      });

      fileCollaborators.successHandler(response);
      expect(fileCollaborators.successCallback).toBeCalledWith(formattedResponse);
    });
  });
});