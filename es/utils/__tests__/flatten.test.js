import FolderAPI from '../../api/Folder';
import FileAPI from '../../api/File';
import WebLinkAPI from '../../api/WebLink';
import Cache from '../Cache';
import flatten from '../flatten';
var list = [{
  id: '1',
  type: 'folder',
  name: 'folderName'
}, {
  id: '2',
  type: 'file',
  name: 'fileName'
}, {
  id: '3',
  type: 'web_link',
  name: 'weblinkName'
}];
var newList = [{
  id: '1',
  type: 'folder',
  name: 'folderNameNew'
}, {
  id: '2',
  type: 'file',
  name: 'fileNameNew'
}, {
  id: '3',
  type: 'web_link',
  name: 'weblinkNameNew'
}];
var cache = new Cache();
var file = new FileAPI({
  cache: cache
});
var folder = new FolderAPI({
  cache: cache
});
var weblink = new WebLinkAPI({
  cache: cache
});
describe('util/flatten', function () {
  test('should flatten the list and create new cache entries', function () {
    var items = flatten(list, folder, file, weblink);
    expect(items).toEqual(['folder_1', 'file_2', 'web_link_3']);
    expect(folder.getCache().get('folder_1')).toEqual(list[0]);
    expect(file.getCache().get('file_2')).toEqual(list[1]);
    expect(weblink.getCache().get('web_link_3')).toEqual(list[2]);
  });
  test('should flatten the list and merge into existing cache entries', function () {
    expect(folder.getCache().get('folder_1')).toEqual(list[0]);
    expect(file.getCache().get('file_2')).toEqual(list[1]);
    expect(weblink.getCache().get('web_link_3')).toEqual(list[2]);
    var items = flatten(newList, folder, file, weblink);
    expect(items).toEqual(['folder_1', 'file_2', 'web_link_3']);
    expect(folder.getCache().get('folder_1')).toEqual(newList[0]);
    expect(file.getCache().get('file_2')).toEqual(newList[1]);
    expect(weblink.getCache().get('web_link_3')).toEqual(newList[2]);
  });
  test('should throw with a bad type', function () {
    var badList = [{
      id: '1',
      type: 'foo'
    }];
    expect(flatten.bind(flatten, badList, folder, file, weblink)).toThrow(Error, /Unknown Type/);
  });
  test('should throw with a bad item when no id', function () {
    var badList = [{
      type: 'foo'
    }];
    expect(flatten.bind(flatten, badList, folder, file, weblink)).toThrow(Error, /Bad box item/);
  });
  test('should throw with a bad item when no type', function () {
    var badList = [{
      id: 'foo'
    }];
    expect(flatten.bind(flatten, badList, folder, file, weblink)).toThrow(Error, /Bad box item/);
  });
});