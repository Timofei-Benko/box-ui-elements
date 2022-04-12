import { collapseFeedState } from '../activityFeedUtils';
import { PLACEHOLDER_USER } from '../../../../../constants';
describe('collapseFeedState', function () {
  var mario = {
    id: '1',
    name: 'mario'
  };
  var luigi = {
    id: '2',
    name: 'luigi'
  };
  var version1 = {
    type: 'file_version',
    version_number: '2',
    modified_by: mario
  };
  test('should return empty array if no input', function () {
    expect(collapseFeedState()).toEqual([]);
  });
  test('should keep file_version & comment distinct', function () {
    var origFeed = [{
      type: 'comment'
    }, {
      type: 'file_version'
    }];
    var expFeed = origFeed;
    var collapsedFeed = collapseFeedState(origFeed);
    expect(collapsedFeed).toEqual(expFeed);
  });
  test('should collapse two file_version items into 1', function () {
    var version2 = {
      type: 'file_version',
      version_number: '1',
      modified_by: luigi
    };
    var origFeed = [version1, version2];
    var expFeed = [{
      type: 'file_version',
      version_number: '1',
      modified_by: luigi,
      created_at: undefined,
      id: undefined,
      trashed_at: undefined,
      version_start: 1,
      version_end: 2,
      collaborators: {
        '1': mario,
        '2': luigi
      },
      versions: [version1, version2]
    }];
    var collapsedFeed = collapseFeedState(origFeed);
    expect(collapsedFeed).toEqual(expFeed);
  });
  test('should collapse two file_version items and handle null users', function () {
    var version2 = {
      type: 'file_version',
      version_number: '1',
      modified_by: null
    };
    var origFeed = [version1, version2];
    var expFeed = [{
      type: 'file_version',
      version_number: '1',
      modified_by: PLACEHOLDER_USER,
      created_at: undefined,
      id: undefined,
      trashed_at: undefined,
      version_start: 1,
      version_end: 2,
      collaborators: {
        '1': mario,
        '2': PLACEHOLDER_USER
      },
      versions: [version1, version2]
    }];
    var collapsedFeed = collapseFeedState(origFeed);
    expect(collapsedFeed).toEqual(expFeed);
  });
});