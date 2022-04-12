import AppActivity from '../AppActivity';
import { ERROR_CODE_DELETE_APP_ACTIVITY } from '../../constants';
import { APP_ACTIVITY_FIELDS_TO_FETCH } from '../../utils/fields';
var appActivity;
describe('api/AppActivity', function () {
  beforeEach(function () {
    appActivity = new AppActivity({});
  });
  afterEach(function () {
    appActivity.destroy();
    appActivity = null;
  });
  describe('mapAppActivityItem()', function () {
    test('should transform app activity entries to contain created_at instead of occurred_at', function () {
      var occurred_at = '2019-03-08T17:32:46.422Z';
      var entry = {
        occurred_at: occurred_at
      };
      var activityItem = appActivity.mapAppActivityItem(entry);
      expect(activityItem.created_at).toBe(occurred_at);
      expect(activityItem.occurred_at).toBeUndefined();
    });
    test('should add can_delete permission to the item, based on current permissions being tracked', function () {
      appActivity.permissions = {
        can_delete: true
      };
      var activityItem = appActivity.mapAppActivityItem({});
      expect(activityItem.permissions.can_delete).toBe(true); // reset

      appActivity.permissions = {};
    });
  });
  describe('getUrl()', function () {
    test('should return correct app activity api url base', function () {
      expect(appActivity.getUrl()).toBe('https://api.box.com/2.0/app_activities');
    });
  });
  describe('getDeleteUrl()', function () {
    test('should throw when not provided a file id', function () {
      expect(function () {
        appActivity.getDeleteUrl();
      }).toThrow();
    });
    test('should return correct url for app activity deletion', function () {
      expect(appActivity.getDeleteUrl('ACTIVITY_ID')).toBe('https://api.box.com/2.0/app_activities/ACTIVITY_ID');
    });
  });
  describe('successHandler()', function () {
    test('should do nothing if already destroyed', function () {
      appActivity.successCallback = jest.fn();
      appActivity.destroy();
      appActivity.successHandler({});
      expect(appActivity.successCallback).not.toBeCalled();
    });
    test('should invoke success callback with new list of app activities', function () {
      var data = {
        entries: []
      };
      appActivity.successCallback = jest.fn();
      appActivity.successHandler(data);
      expect(appActivity.successCallback).toBeCalledWith({
        entries: [],
        total_count: 0
      });
    });
  });
  describe('getAppActivity()', function () {
    test('should pass through params to marketGet()', function () {
      appActivity.markerGet = jest.fn();
      var id = '987654321';
      var successCallback = jest.fn();
      var errorCallback = jest.fn();
      var requestData = {
        fields: APP_ACTIVITY_FIELDS_TO_FETCH.toString(),
        item_id: id,
        item_type: 'file'
      };
      appActivity.getAppActivity(id, {}, successCallback, errorCallback);
      expect(appActivity.markerGet).toBeCalledWith({
        id: id,
        successCallback: successCallback,
        errorCallback: errorCallback,
        requestData: requestData
      });
    });
    test('should default to DEFAULT_LOCALE locale if none provided', function () {
      appActivity.markerGet = jest.fn();
      var id = '987654321';
      var successCallback = jest.fn();
      var errorCallback = jest.fn();
      var requestData = {
        fields: APP_ACTIVITY_FIELDS_TO_FETCH.toString(),
        item_id: id,
        item_type: 'file'
      };
      appActivity.getAppActivity(id, {}, successCallback, errorCallback);
      expect(appActivity.markerGet).toBeCalledWith({
        id: id,
        successCallback: successCallback,
        errorCallback: errorCallback,
        requestData: requestData
      });
    });
  });
  describe('deleteAppActivity()', function () {
    beforeEach(function () {
      appActivity.delete = jest.fn();
    });
    test('should set error code to delete app activity error', function () {
      appActivity.deleteAppActivity({
        id: '321',
        appActivityId: '123',
        successCallback: jest.fn(),
        errorCallback: jest.fn()
      });
      expect(appActivity.errorCode).toBe(ERROR_CODE_DELETE_APP_ACTIVITY);
    });
    test('should invoke delete', function () {
      appActivity.deleteAppActivity({
        id: '321',
        appActivityId: '123',
        successCallback: jest.fn(),
        errorCallback: jest.fn()
      });
      expect(appActivity.delete).toBeCalled();
    });
    test('should invoke getDeleteUrl() to create the correct URL to delete app activity', function () {
      appActivity.getDeleteUrl = jest.fn();
      appActivity.deleteAppActivity({
        id: '321',
        appActivityId: '123',
        successCallback: jest.fn(),
        errorCallback: jest.fn()
      });
      expect(appActivity.getDeleteUrl).toBeCalledWith('123');
    });
    test('should invoke delete with proper delete url for the app activity', function () {
      var id = '12345';
      var successCallback = jest.fn();
      var errorCallback = jest.fn();
      var deleteUrl = 'https://delete.my/app_activity/09876';
      appActivity.getDeleteUrl = jest.fn().mockReturnValue(deleteUrl);
      appActivity.deleteAppActivity({
        id: id,
        appActivityId: '123',
        successCallback: successCallback,
        errorCallback: errorCallback
      });
      expect(appActivity.delete).toBeCalledWith({
        id: id,
        url: deleteUrl,
        successCallback: successCallback,
        errorCallback: errorCallback
      });
    });
  });
});