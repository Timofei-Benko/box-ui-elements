function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

import { COMMENTS_FIELDS_TO_FETCH } from '../../utils/fields';
import Comments from '../Comments';
import { PERMISSION_CAN_COMMENT, PERMISSION_CAN_DELETE, PERMISSION_CAN_EDIT } from '../../constants';
var comments;
describe('api/Comments', function () {
  beforeEach(function () {
    comments = new Comments({});
  });
  describe('getUrl()', function () {
    test('should throw when version api url without id', function () {
      expect(function () {
        comments.getUrl();
      }).toThrow();
    });
    test('should return correct version api url with id', function () {
      expect(comments.getUrl('foo')).toBe('https://api.box.com/2.0/files/foo/comments');
    });
  });
  describe('commentsUrl()', function () {
    test('should add an id if provided', function () {
      expect(comments.commentsUrl('foo')).toBe('https://api.box.com/2.0/comments/foo');
    });
  });
  describe('successHandler()', function () {
    var comment = {
      type: 'comment',
      id: '123',
      created_at: 1234567890,
      message: 'NOT A TAGGED MESSAGE',
      tagged_message: '',
      created_by: {
        name: 'Akon',
        id: 11
      },
      modified_at: 1234567890,
      is_reply_comment: false
    };
    var taggedComment = {
      type: 'comment',
      id: '456',
      created_at: 1234567890,
      tagged_message: 'test @[123:Jeezy] @[10:Kanye West]',
      created_by: {
        name: 'Akon',
        id: 11
      },
      modified_at: 1234567890,
      is_reply_comment: true
    };
    beforeEach(function () {
      comments.format = jest.fn();
      comments.successCallback = jest.fn();
    });
    test('should call the success callback with no data if none provided from API', function () {
      comments.successHandler();
      expect(comments.successCallback).toBeCalledWith();
    });
    test('should return API response with properly formatted data', function () {
      var response = {
        total_count: 2,
        entries: [comment, taggedComment]
      };
      comments.successHandler(response);
      expect(comments.successCallback).toBeCalled();
      expect(comments.format.mock.calls.length).toBe(2);
    });
    test('should return properly formatted data if only one comment is returned from API', function () {
      comments.successHandler(comment);
      expect(comments.successCallback).toBeCalled();
      expect(comments.format).toBeCalledWith(comment);
    });
  });
  describe('CRUD operations', function () {
    var file = {
      id: 'foo',
      permissions: {}
    };
    var commentId = '123';
    var message = 'hello world';
    var successCallback = jest.fn();
    var errorCallback = jest.fn();
    beforeEach(function () {
      comments.get = jest.fn();
      comments.post = jest.fn();
      comments.put = jest.fn();
      comments.delete = jest.fn();
      comments.checkApiCallValidity = jest.fn(function () {
        return true;
      });
      comments.offsetGet = jest.fn();
      var url = 'https://www.foo.com/comments';
      comments.commentsUrl = jest.fn(function () {
        return url;
      });
    });
    describe('createComment()', function () {
      test('should check for valid comment permissions', function () {
        comments.createComment({
          file: file,
          message: message,
          successCallback: successCallback,
          errorCallback: errorCallback
        });
        expect(comments.checkApiCallValidity).toBeCalledWith(PERMISSION_CAN_COMMENT, file.permissions, file.id);
      });
      test('should post a well formed comment to the comments endpoint', function () {
        var requestData = {
          data: {
            item: {
              id: file.id,
              type: 'file'
            },
            message: message,
            taggedMessage: undefined
          },
          params: {
            fields: COMMENTS_FIELDS_TO_FETCH.toString()
          }
        };
        comments.createComment({
          file: file,
          message: message,
          successCallback: successCallback,
          errorCallback: errorCallback
        });
        expect(comments.post).toBeCalledWith({
          id: 'foo',
          url: comments.commentsUrl(),
          data: requestData,
          successCallback: successCallback,
          errorCallback: errorCallback
        });
      });
    });
    describe('updateComment()', function () {
      test('should check for valid comment edit permissions', function () {
        var permissions = _defineProperty({}, PERMISSION_CAN_EDIT, true);

        comments.updateComment({
          file: file,
          commentId: commentId,
          permissions: permissions,
          message: message,
          successCallback: successCallback,
          errorCallback: errorCallback
        });
        expect(comments.checkApiCallValidity).toBeCalledWith(PERMISSION_CAN_EDIT, permissions, file.id);
      });
      test('should put a well formed comment update to the comments endpoint', function () {
        var requestData = {
          data: {
            message: message
          }
        };
        comments.updateComment({
          file: file,
          commentId: commentId,
          message: message,
          successCallback: successCallback,
          errorCallback: errorCallback
        });
        expect(comments.put).toBeCalledWith({
          id: 'foo',
          url: comments.commentsUrl(commentId),
          data: requestData,
          successCallback: successCallback,
          errorCallback: errorCallback
        });
      });
    });
    describe('deleteComment()', function () {
      test('should check for valid comment delete permissions', function () {
        var permissions = _defineProperty({}, PERMISSION_CAN_DELETE, true);

        comments.deleteComment({
          file: file,
          commentId: commentId,
          permissions: permissions,
          successCallback: successCallback,
          errorCallback: errorCallback
        });
        expect(comments.checkApiCallValidity).toBeCalledWith(PERMISSION_CAN_DELETE, permissions, file.id);
      });
      test('should delete a comment from the comments endpoint', function () {
        comments.deleteComment({
          file: file,
          commentId: commentId,
          successCallback: successCallback,
          errorCallback: errorCallback
        });
        expect(comments.delete).toBeCalledWith({
          id: 'foo',
          url: comments.commentsUrl(commentId),
          successCallback: successCallback,
          errorCallback: errorCallback
        });
      });
    });
    describe('getComments()', function () {
      test('should check for valid comment permissions', function () {
        var permissions = _defineProperty({}, PERMISSION_CAN_COMMENT, true);

        comments.getComments(file.id, permissions, successCallback, errorCallback);
        expect(comments.checkApiCallValidity).toBeCalledWith(PERMISSION_CAN_COMMENT, permissions, file.id);
      });
      test('should return a list of comments from the comments endpoint', function () {
        var permissions = _defineProperty({}, PERMISSION_CAN_COMMENT, true);

        comments.getComments(file.id, permissions, successCallback, errorCallback);
        expect(comments.offsetGet).toBeCalledWith('foo', successCallback, errorCallback, undefined, undefined, COMMENTS_FIELDS_TO_FETCH, undefined);
      });
    });
  });
});