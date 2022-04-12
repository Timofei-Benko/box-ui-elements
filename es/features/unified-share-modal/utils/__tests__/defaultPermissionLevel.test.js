import getDefaultPermissionLevel from '../defaultPermissionLevel';
describe('features/unified-share-modal/utils/defaultPermissionLevel', function () {
  test('should return the default permission level when available', function () {
    var input = [{
      value: 'Editor',
      default: false
    }, {
      value: 'Viewer',
      default: true
    }, {
      value: 'Uploader',
      default: false
    }];
    var expected = 'Viewer';
    expect(getDefaultPermissionLevel(input)).toStrictEqual(expected);
  });
  test('should return Editor when default permission level is not available', function () {
    var input = [{
      value: 'Editor',
      default: false
    }, {
      value: 'Viewer',
      default: false
    }, {
      value: 'Uploader',
      default: false
    }];
    var expected = 'Editor';
    expect(getDefaultPermissionLevel(input)).toStrictEqual(expected);
  });
});