import Cache from '../../utils/Cache';
import AnnotationsAPI from '../Annotations';
import APIFactory from '../APIFactory';
import ChunkedUploadAPI from '../uploads/MultiputUpload';
import PlainUploadAPI from '../uploads/PlainUpload';
import FolderAPI from '../Folder';
import FileAPI from '../File';
import WebLinkAPI from '../WebLink';
import SearchAPI from '../Search';
import RecentsAPI from '../Recents';
import VersionsAPI from '../Versions';
import CommentsAPI from '../Comments';
import TasksNewAPI from '../tasks/TasksNew';
import TaskCollaboratorsAPI from '../tasks/TaskCollaborators';
import TaskLinksAPI from '../tasks/TaskLinks';
import FileAccessStatsAPI from '../FileAccessStats';
import MetadataAPI from '../Metadata';
import FileCollaboratorsAPI from '../FileCollaborators';
import MarkerBasedGroupsAPI from '../MarkerBasedGroups';
import MarkerBasedUsersAPI from '../MarkerBasedUsers';
import GroupsAPI from '../Groups';
import UsersAPI from '../Users';
import BoxEditAPI from '../box-edit';
import MetadataQueryAPI from '../MetadataQuery';
import FileCollaborationsAPI from '../FileCollaborations';
import FolderCollaborationsAPI from '../FolderCollaborations';
import { DEFAULT_HOSTNAME_API, DEFAULT_HOSTNAME_UPLOAD } from '../../constants';
var factory;
describe('api/APIFactory', function () {
  beforeEach(function () {
    factory = new APIFactory({});
  });
  describe('getCache()', function () {
    test('should return a cache instance', function () {
      expect(factory.getCache()).toBeInstanceOf(Cache);
    });
  });
  describe('destroy()', function () {
    test('should destroy all APIs', function () {
      factory.fileAPI = {
        destroy: jest.fn()
      };
      factory.folderAPI = {
        destroy: jest.fn()
      };
      factory.weblinkAPI = {
        destroy: jest.fn()
      };
      factory.searchAPI = {
        destroy: jest.fn()
      };
      factory.plainUploadAPI = {
        destroy: jest.fn()
      };
      factory.chunkedUploadAPI = {
        destroy: jest.fn()
      };
      factory.recentsAPI = {
        destroy: jest.fn()
      };
      factory.versionsAPI = {
        destroy: jest.fn()
      };
      factory.metadataAPI = {
        destroy: jest.fn()
      };
      factory.markerBasedGroupsAPI = {
        destroy: jest.fn()
      };
      factory.markerBasedUserssAPI = {
        destroy: jest.fn()
      };
      factory.groupsAPI = {
        destroy: jest.fn()
      };
      factory.usersAPI = {
        destroy: jest.fn()
      };
      factory.tasksNewAPI = {
        destroy: jest.fn()
      };
      factory.taskLinksAPI = {
        destroy: jest.fn()
      };
      factory.taskCollaboratorsAPI = {
        destroy: jest.fn()
      };
      factory.boxEditAPI = {
        destroy: jest.fn()
      };
      factory.metadataQueryAPI = {
        destroy: jest.fn()
      };
      factory.annotationsAPI = {
        destroy: jest.fn()
      };
      factory.fileCollaborationsAPI = {
        destroy: jest.fn()
      };
      factory.folderCollaborationsAPI = {
        destroy: jest.fn()
      };
      factory.destroy();
      expect(factory.fileAPI).toBeUndefined();
      expect(factory.folderAPI).toBeUndefined();
      expect(factory.weblinkAPI).toBeUndefined();
      expect(factory.searchAPI).toBeUndefined();
      expect(factory.plainUploadAPI).toBeUndefined();
      expect(factory.chunkedUploadAPI).toBeUndefined();
      expect(factory.recentsAPI).toBeUndefined();
      expect(factory.versionsAPI).toBeUndefined();
      expect(factory.metadataAPI).toBeUndefined();
      expect(factory.taskCollaboratorsAPI).toBeUndefined();
      expect(factory.taskLinksAPI).toBeUndefined();
      expect(factory.tasksNewAPI).toBeUndefined();
      expect(factory.markerBasedGroupsAPI).toBeUndefined();
      expect(factory.markerBasedUsersAPI).toBeUndefined();
      expect(factory.groupsAPI).toBeUndefined();
      expect(factory.usersAPI).toBeUndefined();
      expect(factory.metadataQueryAPI).toBeUndefined();
      expect(factory.annotationsAPI).toBeUndefined();
      expect(factory.fileCollaborationsAPI).toBeUndefined();
      expect(factory.folderCollaborationsAPI).toBeUndefined();
    });
    test('should not destroy cache by default', function () {
      var cache = factory.options.cache;
      cache.set('foo', 'bar');
      factory.destroy();
      expect(factory.options.cache).toBe(cache);
      expect(factory.options.cache.get('foo')).toBe('bar');
    });
    test('should destroy cache when asked', function () {
      var cache = factory.options.cache;
      cache.set('foo', 'bar');
      factory.destroy(true);
      expect(factory.options.cache).not.toBe(cache);
      expect(factory.options.cache.get('foo')).toBeUndefined();
    });
  });
  describe('getAPI()', function () {
    test('should return file api when type is file', function () {
      expect(factory.getAPI('file')).toBeInstanceOf(FileAPI);
    });
    test('should return folder api when type is folder', function () {
      expect(factory.getAPI('folder')).toBeInstanceOf(FolderAPI);
    });
    test('should return web link api when type is web_link', function () {
      expect(factory.getAPI('web_link')).toBeInstanceOf(WebLinkAPI);
    });
    test('should throw error when type is incorrect', function () {
      expect(factory.getAPI.bind(factory, 'foo')).toThrow(Error, /Unknown Type/);
    });
  });
  describe('getFileAPI()', function () {
    test('should call destroy and return file API', function () {
      var spy = jest.spyOn(factory, 'destroy');
      var fileAPI = factory.getFileAPI();
      expect(spy).toBeCalled();
      expect(fileAPI).toBeInstanceOf(FileAPI);
      expect(fileAPI.options.cache).toBeInstanceOf(Cache);
      expect(fileAPI.options.apiHost).toBe(DEFAULT_HOSTNAME_API);
      expect(fileAPI.options.uploadHost).toBe(DEFAULT_HOSTNAME_UPLOAD);
    });
  });
  describe('getWebLinkAPI()', function () {
    test('should call destroy and return web link API', function () {
      var spy = jest.spyOn(factory, 'destroy');
      var webLinkAPI = factory.getWebLinkAPI();
      expect(spy).toBeCalled();
      expect(webLinkAPI).toBeInstanceOf(WebLinkAPI);
      expect(webLinkAPI.options.cache).toBeInstanceOf(Cache);
      expect(webLinkAPI.options.apiHost).toBe(DEFAULT_HOSTNAME_API);
      expect(webLinkAPI.options.uploadHost).toBe(DEFAULT_HOSTNAME_UPLOAD);
    });
  });
  describe('getPlainUploadAPI()', function () {
    test('should call destroy and return plain upload API', function () {
      var spy = jest.spyOn(factory, 'destroy');
      var plainUploadAPI = factory.getPlainUploadAPI();
      expect(spy).toBeCalled();
      expect(plainUploadAPI).toBeInstanceOf(PlainUploadAPI);
      expect(plainUploadAPI.options.cache).toBeInstanceOf(Cache);
      expect(plainUploadAPI.options.apiHost).toBe(DEFAULT_HOSTNAME_API);
      expect(plainUploadAPI.options.uploadHost).toBe(DEFAULT_HOSTNAME_UPLOAD);
    });
  });
  describe('getChunkedUploadAPI()', function () {
    test('should call destroy and return chunked upload API', function () {
      var spy = jest.spyOn(factory, 'destroy');
      var chunkedUploadAPI = factory.getChunkedUploadAPI();
      expect(spy).toBeCalled();
      expect(chunkedUploadAPI).toBeInstanceOf(ChunkedUploadAPI);
      expect(chunkedUploadAPI.options.cache).toBeInstanceOf(Cache);
      expect(chunkedUploadAPI.options.apiHost).toBe(DEFAULT_HOSTNAME_API);
      expect(chunkedUploadAPI.options.uploadHost).toBe(DEFAULT_HOSTNAME_UPLOAD);
    });
  });
  describe('getFolderAPI()', function () {
    test('should call destroy and return folder API', function () {
      var spy = jest.spyOn(factory, 'destroy');
      var folderAPI = factory.getFolderAPI();
      expect(spy).toBeCalled();
      expect(folderAPI).toBeInstanceOf(FolderAPI);
      expect(folderAPI.options.cache).toBeInstanceOf(Cache);
      expect(folderAPI.options.apiHost).toBe(DEFAULT_HOSTNAME_API);
      expect(folderAPI.options.uploadHost).toBe(DEFAULT_HOSTNAME_UPLOAD);
    });
  });
  describe('getSearchAPI()', function () {
    test('should call destroy and return search API', function () {
      var spy = jest.spyOn(factory, 'destroy');
      var searchAPI = factory.getSearchAPI();
      expect(spy).toBeCalled();
      expect(searchAPI).toBeInstanceOf(SearchAPI);
      expect(searchAPI.options.cache).toBeInstanceOf(Cache);
      expect(searchAPI.options.apiHost).toBe(DEFAULT_HOSTNAME_API);
      expect(searchAPI.options.uploadHost).toBe(DEFAULT_HOSTNAME_UPLOAD);
    });
  });
  describe('getRecentsAPI()', function () {
    test('should call destroy and return recents API', function () {
      var spy = jest.spyOn(factory, 'destroy');
      var recentsAPI = factory.getRecentsAPI();
      expect(spy).toBeCalled();
      expect(recentsAPI).toBeInstanceOf(RecentsAPI);
      expect(recentsAPI.options.cache).toBeInstanceOf(Cache);
      expect(recentsAPI.options.apiHost).toBe(DEFAULT_HOSTNAME_API);
      expect(recentsAPI.options.uploadHost).toBe(DEFAULT_HOSTNAME_UPLOAD);
    });
  });
  describe('getVersionsAPI()', function () {
    test('should call destroy and return versions API', function () {
      var spy = jest.spyOn(factory, 'destroy');
      var versionsAPI = factory.getVersionsAPI(true);
      expect(spy).toBeCalled();
      expect(versionsAPI).toBeInstanceOf(VersionsAPI);
      expect(versionsAPI.options.cache).toBeInstanceOf(Cache);
      expect(versionsAPI.options.apiHost).toBe(DEFAULT_HOSTNAME_API);
      expect(versionsAPI.options.uploadHost).toBe(DEFAULT_HOSTNAME_UPLOAD);
    });
    test('should not call destroy and return versions API', function () {
      var spy = jest.spyOn(factory, 'destroy');
      var versionsAPI = factory.getVersionsAPI();
      expect(spy).not.toHaveBeenCalled();
      expect(versionsAPI).toBeInstanceOf(VersionsAPI);
      expect(versionsAPI.options.cache).toBeInstanceOf(Cache);
      expect(versionsAPI.options.apiHost).toBe(DEFAULT_HOSTNAME_API);
      expect(versionsAPI.options.uploadHost).toBe(DEFAULT_HOSTNAME_UPLOAD);
    });
  });
  describe('getCommentsAPI()', function () {
    test('should call destroy and return comments API', function () {
      var spy = jest.spyOn(factory, 'destroy');
      var commentsAPI = factory.getCommentsAPI(true);
      expect(spy).toBeCalled();
      expect(commentsAPI).toBeInstanceOf(CommentsAPI);
      expect(commentsAPI.options.cache).toBeInstanceOf(Cache);
      expect(commentsAPI.options.apiHost).toBe(DEFAULT_HOSTNAME_API);
      expect(commentsAPI.options.uploadHost).toBe(DEFAULT_HOSTNAME_UPLOAD);
    });
    test('should not call destroy and return comments API', function () {
      var spy = jest.spyOn(factory, 'destroy');
      var commentsAPI = factory.getCommentsAPI();
      expect(spy).not.toHaveBeenCalled();
      expect(commentsAPI).toBeInstanceOf(CommentsAPI);
      expect(commentsAPI.options.cache).toBeInstanceOf(Cache);
      expect(commentsAPI.options.apiHost).toBe(DEFAULT_HOSTNAME_API);
      expect(commentsAPI.options.uploadHost).toBe(DEFAULT_HOSTNAME_UPLOAD);
    });
  });
  describe('getTasksNewAPI()', function () {
    test('should call destroy and return tasksNew API', function () {
      var spy = jest.spyOn(factory, 'destroy');
      var tasksNewAPI = factory.getTasksNewAPI(true);
      expect(spy).toBeCalled();
      expect(tasksNewAPI).toBeInstanceOf(TasksNewAPI);
      expect(tasksNewAPI.options.cache).toBeInstanceOf(Cache);
      expect(tasksNewAPI.options.apiHost).toBe(DEFAULT_HOSTNAME_API);
      expect(tasksNewAPI.options.uploadHost).toBe(DEFAULT_HOSTNAME_UPLOAD);
    });
    test('should not call destroy and return tasksNew API', function () {
      var spy = jest.spyOn(factory, 'destroy');
      var tasksNewApi = factory.getTasksNewAPI();
      expect(spy).not.toHaveBeenCalled();
      expect(tasksNewApi).toBeInstanceOf(TasksNewAPI);
      expect(tasksNewApi.options.cache).toBeInstanceOf(Cache);
      expect(tasksNewApi.options.apiHost).toBe(DEFAULT_HOSTNAME_API);
      expect(tasksNewApi.options.uploadHost).toBe(DEFAULT_HOSTNAME_UPLOAD);
    });
  });
  describe('getTaskCollaboratorsAPI()', function () {
    test('should call destroy and return taskCollaborators API', function () {
      var spy = jest.spyOn(factory, 'destroy');
      var tasksCollaboratorsAPI = factory.getTaskCollaboratorsAPI(true);
      expect(spy).toBeCalled();
      expect(tasksCollaboratorsAPI).toBeInstanceOf(TaskCollaboratorsAPI);
      expect(tasksCollaboratorsAPI.options.cache).toBeInstanceOf(Cache);
      expect(tasksCollaboratorsAPI.options.apiHost).toBe(DEFAULT_HOSTNAME_API);
      expect(tasksCollaboratorsAPI.options.uploadHost).toBe(DEFAULT_HOSTNAME_UPLOAD);
    });
    test('should not call destroy and return taskCollaborators API', function () {
      var spy = jest.spyOn(factory, 'destroy');
      var taskCollaboratorsApi = factory.getTaskCollaboratorsAPI();
      expect(spy).not.toHaveBeenCalled();
      expect(taskCollaboratorsApi).toBeInstanceOf(TaskCollaboratorsAPI);
      expect(taskCollaboratorsApi.options.cache).toBeInstanceOf(Cache);
      expect(taskCollaboratorsApi.options.apiHost).toBe(DEFAULT_HOSTNAME_API);
      expect(taskCollaboratorsApi.options.uploadHost).toBe(DEFAULT_HOSTNAME_UPLOAD);
    });
  });
  describe('getTaskLinksAPI()', function () {
    test('should call destroy and return taskLinks API', function () {
      var spy = jest.spyOn(factory, 'destroy');
      var tasksLinksAPI = factory.getTaskLinksAPI(true);
      expect(spy).toBeCalled();
      expect(tasksLinksAPI).toBeInstanceOf(TaskLinksAPI);
      expect(tasksLinksAPI.options.cache).toBeInstanceOf(Cache);
      expect(tasksLinksAPI.options.apiHost).toBe(DEFAULT_HOSTNAME_API);
      expect(tasksLinksAPI.options.uploadHost).toBe(DEFAULT_HOSTNAME_UPLOAD);
    });
    test('should not call destroy and return taskLinks API', function () {
      var spy = jest.spyOn(factory, 'destroy');
      var taskLinksApi = factory.getTaskLinksAPI();
      expect(spy).not.toHaveBeenCalled();
      expect(taskLinksApi).toBeInstanceOf(TaskLinksAPI);
      expect(taskLinksApi.options.cache).toBeInstanceOf(Cache);
      expect(taskLinksApi.options.apiHost).toBe(DEFAULT_HOSTNAME_API);
      expect(taskLinksApi.options.uploadHost).toBe(DEFAULT_HOSTNAME_UPLOAD);
    });
  });
  describe('getFileAccessStatsAPI()', function () {
    test('should call destroy and return versions API', function () {
      var spy = jest.spyOn(factory, 'destroy');
      var fileAccessStatsAPI = factory.getFileAccessStatsAPI(true);
      expect(spy).toBeCalled();
      expect(fileAccessStatsAPI).toBeInstanceOf(FileAccessStatsAPI);
      expect(fileAccessStatsAPI.options.cache).toBeInstanceOf(Cache);
      expect(fileAccessStatsAPI.options.apiHost).toBe(DEFAULT_HOSTNAME_API);
      expect(fileAccessStatsAPI.options.uploadHost).toBe(DEFAULT_HOSTNAME_UPLOAD);
    });
    test('should not call destroy and return versions API', function () {
      var spy = jest.spyOn(factory, 'destroy');
      var fileAccessStatsAPI = factory.getFileAccessStatsAPI();
      expect(spy).not.toHaveBeenCalled();
      expect(fileAccessStatsAPI).toBeInstanceOf(FileAccessStatsAPI);
      expect(fileAccessStatsAPI.options.cache).toBeInstanceOf(Cache);
      expect(fileAccessStatsAPI.options.apiHost).toBe(DEFAULT_HOSTNAME_API);
      expect(fileAccessStatsAPI.options.uploadHost).toBe(DEFAULT_HOSTNAME_UPLOAD);
    });
  });
  describe('getMetadataAPI()', function () {
    test('should call destroy and return metadata API', function () {
      var spy = jest.spyOn(factory, 'destroy');
      var metadataAPI = factory.getMetadataAPI(true);
      expect(spy).toBeCalled();
      expect(metadataAPI).toBeInstanceOf(MetadataAPI);
      expect(metadataAPI.options.cache).toBeInstanceOf(Cache);
      expect(metadataAPI.options.apiHost).toBe(DEFAULT_HOSTNAME_API);
      expect(metadataAPI.options.uploadHost).toBe(DEFAULT_HOSTNAME_UPLOAD);
    });
    test('should not call destroy and return metadata API', function () {
      var spy = jest.spyOn(factory, 'destroy');
      var metadataAPI = factory.getMetadataAPI();
      expect(spy).not.toHaveBeenCalled();
      expect(metadataAPI).toBeInstanceOf(MetadataAPI);
      expect(metadataAPI.options.cache).toBeInstanceOf(Cache);
      expect(metadataAPI.options.apiHost).toBe(DEFAULT_HOSTNAME_API);
      expect(metadataAPI.options.uploadHost).toBe(DEFAULT_HOSTNAME_UPLOAD);
    });
  });
  describe('getFileCollaboratorsAPI()', function () {
    test('should call destroy and return file collaborators API', function () {
      var spy = jest.spyOn(factory, 'destroy');
      var fileCollaboratorsAPI = factory.getFileCollaboratorsAPI(true);
      expect(spy).toBeCalled();
      expect(fileCollaboratorsAPI).toBeInstanceOf(FileCollaboratorsAPI);
      expect(fileCollaboratorsAPI.options.cache).toBeInstanceOf(Cache);
      expect(fileCollaboratorsAPI.options.apiHost).toBe(DEFAULT_HOSTNAME_API);
      expect(fileCollaboratorsAPI.options.uploadHost).toBe(DEFAULT_HOSTNAME_UPLOAD);
    });
    test('should not call destroy and return file collaborators API', function () {
      var spy = jest.spyOn(factory, 'destroy');
      var fileCollaboratorsAPI = factory.getFileCollaboratorsAPI();
      expect(spy).not.toHaveBeenCalled();
      expect(fileCollaboratorsAPI).toBeInstanceOf(FileCollaboratorsAPI);
      expect(fileCollaboratorsAPI.options.cache).toBeInstanceOf(Cache);
      expect(fileCollaboratorsAPI.options.apiHost).toBe(DEFAULT_HOSTNAME_API);
      expect(fileCollaboratorsAPI.options.uploadHost).toBe(DEFAULT_HOSTNAME_UPLOAD);
    });
  });
  describe('getMarkerBasedGroupsAPI()', function () {
    test('should call destroy and return markerBasedGroups API', function () {
      var spy = jest.spyOn(factory, 'destroy');
      var markerBasedGroupsAPI = factory.getMarkerBasedGroupsAPI(true);
      expect(spy).toBeCalled();
      expect(markerBasedGroupsAPI).toBeInstanceOf(MarkerBasedGroupsAPI);
      expect(markerBasedGroupsAPI.options.cache).toBeInstanceOf(Cache);
      expect(markerBasedGroupsAPI.options.apiHost).toBe(DEFAULT_HOSTNAME_API);
      expect(markerBasedGroupsAPI.options.uploadHost).toBe(DEFAULT_HOSTNAME_UPLOAD);
    });
    test('should not call destroy and return markerBasedGroups API', function () {
      var spy = jest.spyOn(factory, 'destroy');
      var markerBasedGroupsAPI = factory.getMarkerBasedGroupsAPI();
      expect(spy).not.toHaveBeenCalled();
      expect(markerBasedGroupsAPI).toBeInstanceOf(MarkerBasedGroupsAPI);
      expect(markerBasedGroupsAPI.options.cache).toBeInstanceOf(Cache);
      expect(markerBasedGroupsAPI.options.apiHost).toBe(DEFAULT_HOSTNAME_API);
      expect(markerBasedGroupsAPI.options.uploadHost).toBe(DEFAULT_HOSTNAME_UPLOAD);
    });
  });
  describe('getMarkerBasedUsersAPI()', function () {
    test('should call destroy and return markerBasedUsers API', function () {
      var spy = jest.spyOn(factory, 'destroy');
      var markerBasedUsers = factory.getMarkerBasedUsersAPI(true);
      expect(spy).toBeCalled();
      expect(markerBasedUsers).toBeInstanceOf(MarkerBasedUsersAPI);
      expect(markerBasedUsers.options.cache).toBeInstanceOf(Cache);
      expect(markerBasedUsers.options.apiHost).toBe(DEFAULT_HOSTNAME_API);
      expect(markerBasedUsers.options.uploadHost).toBe(DEFAULT_HOSTNAME_UPLOAD);
    });
    test('should not call destroy and return users API', function () {
      var spy = jest.spyOn(factory, 'destroy');
      var markerBasedUsers = factory.getMarkerBasedUsersAPI();
      expect(spy).not.toHaveBeenCalled();
      expect(markerBasedUsers).toBeInstanceOf(MarkerBasedUsersAPI);
      expect(markerBasedUsers.options.cache).toBeInstanceOf(Cache);
      expect(markerBasedUsers.options.apiHost).toBe(DEFAULT_HOSTNAME_API);
      expect(markerBasedUsers.options.uploadHost).toBe(DEFAULT_HOSTNAME_UPLOAD);
    });
  });
  describe('getGroupsAPI()', function () {
    test('should call destroy and return groups API', function () {
      var spy = jest.spyOn(factory, 'destroy');
      var groupsAPI = factory.getGroupsAPI(true);
      expect(spy).toBeCalled();
      expect(groupsAPI).toBeInstanceOf(GroupsAPI);
      expect(groupsAPI.options.cache).toBeInstanceOf(Cache);
      expect(groupsAPI.options.apiHost).toBe(DEFAULT_HOSTNAME_API);
      expect(groupsAPI.options.uploadHost).toBe(DEFAULT_HOSTNAME_UPLOAD);
    });
    test('should not call destroy and return groups API', function () {
      var spy = jest.spyOn(factory, 'destroy');
      var groupsAPI = factory.getGroupsAPI();
      expect(spy).not.toHaveBeenCalled();
      expect(groupsAPI).toBeInstanceOf(GroupsAPI);
      expect(groupsAPI.options.cache).toBeInstanceOf(Cache);
      expect(groupsAPI.options.apiHost).toBe(DEFAULT_HOSTNAME_API);
      expect(groupsAPI.options.uploadHost).toBe(DEFAULT_HOSTNAME_UPLOAD);
    });
  });
  describe('getUsersAPI()', function () {
    test('should call destroy and return users API', function () {
      var spy = jest.spyOn(factory, 'destroy');
      var usersAPI = factory.getUsersAPI(true);
      expect(spy).toBeCalled();
      expect(usersAPI).toBeInstanceOf(UsersAPI);
      expect(usersAPI.options.cache).toBeInstanceOf(Cache);
      expect(usersAPI.options.apiHost).toBe(DEFAULT_HOSTNAME_API);
      expect(usersAPI.options.uploadHost).toBe(DEFAULT_HOSTNAME_UPLOAD);
    });
    test('should not call destroy and return users API', function () {
      var spy = jest.spyOn(factory, 'destroy');
      var usersAPI = factory.getUsersAPI();
      expect(spy).not.toHaveBeenCalled();
      expect(usersAPI).toBeInstanceOf(UsersAPI);
      expect(usersAPI.options.cache).toBeInstanceOf(Cache);
      expect(usersAPI.options.apiHost).toBe(DEFAULT_HOSTNAME_API);
      expect(usersAPI.options.uploadHost).toBe(DEFAULT_HOSTNAME_UPLOAD);
    });
  });
  describe('getBoxEditAPI()', function () {
    test('should not call destroy and return box edit API', function () {
      var boxEditAPI = factory.getBoxEditAPI();
      expect(boxEditAPI).toBeInstanceOf(BoxEditAPI);
    });
  });
  describe('getMetadataQueryAPI()', function () {
    test('should call destroy and return versions API', function () {
      var spy = jest.spyOn(factory, 'destroy');
      var metadataQueryAPI = factory.getMetadataQueryAPI(true);
      expect(spy).toBeCalled();
      expect(metadataQueryAPI).toBeInstanceOf(MetadataQueryAPI);
      expect(metadataQueryAPI.options.cache).toBeInstanceOf(Cache);
      expect(metadataQueryAPI.options.apiHost).toBe(DEFAULT_HOSTNAME_API);
      expect(metadataQueryAPI.options.uploadHost).toBe(DEFAULT_HOSTNAME_UPLOAD);
    });
    test('should not call destroy and return versions API', function () {
      var spy = jest.spyOn(factory, 'destroy');
      var metadataQueryAPI = factory.getMetadataQueryAPI();
      expect(spy).not.toHaveBeenCalled();
      expect(metadataQueryAPI).toBeInstanceOf(MetadataQueryAPI);
      expect(metadataQueryAPI.options.cache).toBeInstanceOf(Cache);
      expect(metadataQueryAPI.options.apiHost).toBe(DEFAULT_HOSTNAME_API);
      expect(metadataQueryAPI.options.uploadHost).toBe(DEFAULT_HOSTNAME_UPLOAD);
    });
  });
  describe('getAnnotationsAPI', function () {
    test('should call destroy and return annotations API', function () {
      var spy = jest.spyOn(factory, 'destroy');
      var annotationsAPI = factory.getAnnotationsAPI(true);
      expect(spy).toBeCalled();
      expect(annotationsAPI).toBeInstanceOf(AnnotationsAPI);
      expect(annotationsAPI.options.cache).toBeInstanceOf(Cache);
      expect(annotationsAPI.options.apiHost).toBe(DEFAULT_HOSTNAME_API);
      expect(annotationsAPI.options.uploadHost).toBe(DEFAULT_HOSTNAME_UPLOAD);
    });
    test('should not call destroy and return annotations API', function () {
      var spy = jest.spyOn(factory, 'destroy');
      var annotationsAPI = factory.getAnnotationsAPI();
      expect(spy).not.toHaveBeenCalled();
      expect(annotationsAPI).toBeInstanceOf(AnnotationsAPI);
      expect(annotationsAPI.options.cache).toBeInstanceOf(Cache);
      expect(annotationsAPI.options.apiHost).toBe(DEFAULT_HOSTNAME_API);
      expect(annotationsAPI.options.uploadHost).toBe(DEFAULT_HOSTNAME_UPLOAD);
    });
  });
  describe('getFileCollaborationsAPI', function () {
    test('should call destroy and return file collaborations API', function () {
      var spy = jest.spyOn(factory, 'destroy');
      var fileCollaborationsAPI = factory.getFileCollaborationsAPI(true);
      expect(spy).toBeCalled();
      expect(fileCollaborationsAPI).toBeInstanceOf(FileCollaborationsAPI);
      expect(fileCollaborationsAPI.options.cache).toBeInstanceOf(Cache);
      expect(fileCollaborationsAPI.options.apiHost).toBe(DEFAULT_HOSTNAME_API);
      expect(fileCollaborationsAPI.options.uploadHost).toBe(DEFAULT_HOSTNAME_UPLOAD);
    });
    test('should not call destroy and return file collaborations API', function () {
      var spy = jest.spyOn(factory, 'destroy');
      var fileCollaborationsAPI = factory.getFileCollaborationsAPI();
      expect(spy).not.toBeCalled();
      expect(fileCollaborationsAPI).toBeInstanceOf(FileCollaborationsAPI);
      expect(fileCollaborationsAPI.options.cache).toBeInstanceOf(Cache);
      expect(fileCollaborationsAPI.options.apiHost).toBe(DEFAULT_HOSTNAME_API);
      expect(fileCollaborationsAPI.options.uploadHost).toBe(DEFAULT_HOSTNAME_UPLOAD);
    });
  });
  describe('getFolderCollaborationsAPI', function () {
    test('should call destroy and return file collaborations API', function () {
      var spy = jest.spyOn(factory, 'destroy');
      var folderCollaborationsAPI = factory.getFolderCollaborationsAPI(true);
      expect(spy).toBeCalled();
      expect(folderCollaborationsAPI).toBeInstanceOf(FolderCollaborationsAPI);
      expect(folderCollaborationsAPI.options.cache).toBeInstanceOf(Cache);
      expect(folderCollaborationsAPI.options.apiHost).toBe(DEFAULT_HOSTNAME_API);
      expect(folderCollaborationsAPI.options.uploadHost).toBe(DEFAULT_HOSTNAME_UPLOAD);
    });
    test('should not call destroy and return file collaborations API', function () {
      var spy = jest.spyOn(factory, 'destroy');
      var folderCollaborationsAPI = factory.getFolderCollaborationsAPI();
      expect(spy).not.toBeCalled();
      expect(folderCollaborationsAPI).toBeInstanceOf(FolderCollaborationsAPI);
      expect(folderCollaborationsAPI.options.cache).toBeInstanceOf(Cache);
      expect(folderCollaborationsAPI.options.apiHost).toBe(DEFAULT_HOSTNAME_API);
      expect(folderCollaborationsAPI.options.uploadHost).toBe(DEFAULT_HOSTNAME_UPLOAD);
    });
  });
});