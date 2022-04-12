function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

import React from 'react';
import cloneDeep from 'lodash/cloneDeep';
import { mount } from 'enzyme';
import noop from 'lodash/noop';
import * as utils from '../utils';
import { ContentExplorerComponent as ContentExplorer } from '../ContentExplorer';
import UploadDialog from '../../common/upload-dialog';
import CONTENT_EXPLORER_FOLDER_FIELDS_TO_FETCH from '../constants';
import { VIEW_MODE_GRID } from '../../../constants';
jest.mock('../../common/header/Header', function () {
  return 'mock-header';
});
jest.mock('../../common/sub-header/SubHeader', function () {
  return 'mock-subheader';
});
jest.mock('../Content', function () {
  return 'mock-content';
});
jest.mock('../../common/upload-dialog/UploadDialog', function () {
  return 'mock-uploaddialog';
});
jest.mock('../../common/create-folder-dialog/CreateFolderDialog', function () {
  return 'mock-createfolderdialog';
});
jest.mock('../DeleteConfirmationDialog', function () {
  return 'mock-deletedialog';
});
jest.mock('../RenameDialog', function () {
  return 'mock-renamedialog';
});
jest.mock('../ShareDialog', function () {
  return 'mock-sharedialog';
});
jest.mock('../PreviewDialog', function () {
  return 'mock-previewdialog';
});
describe('elements/content-explorer/ContentExplorer', function () {
  var rootElement;

  var getWrapper = function getWrapper() {
    var props = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    return mount(React.createElement(ContentExplorer, props), {
      attachTo: rootElement
    });
  };

  beforeEach(function () {
    rootElement = document.createElement('div');
    rootElement.appendChild(document.createElement('div'));
    document.body.appendChild(rootElement);
  });
  afterEach(function () {
    document.body.removeChild(rootElement);
  });
  describe('uploadSuccessHandler()', function () {
    test('should force reload the files list', function () {
      var wrapper = getWrapper();
      var instance = wrapper.instance();
      instance.setState({
        currentCollection: {
          id: '123'
        }
      });
      instance.fetchFolder = jest.fn();
      instance.uploadSuccessHandler();
      expect(instance.fetchFolder).toHaveBeenCalledWith('123', false);
    });
  });
  describe('changeViewMode()', function () {
    var localStoreViewMode = 'bce.defaultViewMode';
    test('should change to grid view', function () {
      var wrapper = getWrapper();
      var instance = wrapper.instance();
      instance.store.setItem = jest.fn();
      instance.changeViewMode(VIEW_MODE_GRID);
      expect(instance.store.setItem).toHaveBeenCalledWith(localStoreViewMode, VIEW_MODE_GRID);
    });
  });
  describe('fetchFolder()', function () {
    var getFolder = jest.fn();
    var getFolderAPI = jest.fn().mockReturnValue({
      getFolder: getFolder
    });
    var wrapper;
    var instance;
    test('should fetch folder without representations field if grid view is not enabled', function () {
      wrapper = getWrapper();
      instance = wrapper.instance();
      instance.api = {
        getFolderAPI: getFolderAPI
      };
      instance.setState = jest.fn();
      instance.fetchFolder();
      expect(instance.setState).toHaveBeenCalled();
      expect(getFolder).toHaveBeenCalledWith('0', 50, 0, 'name', 'ASC', expect.any(Function), expect.any(Function), {
        forceFetch: true,
        fields: CONTENT_EXPLORER_FOLDER_FIELDS_TO_FETCH
      });
    });
  });
  describe('fetchFolderSuccessCallback()', function () {
    var collection = {
      name: 'collection '
    };
    test('updateCollection should be called with a callback', function () {
      var wrapper = getWrapper();
      var instance = wrapper.instance();
      instance.closeModals = jest.fn();
      instance.updateCollection = jest.fn();
      instance.fetchFolderSuccessCallback(collection, false);
      expect(instance.closeModals).toHaveBeenCalled();
      expect(instance.updateCollection).toHaveBeenCalledWith(collection, undefined, expect.any(Function));
    });
  });
  describe('recentsSuccessCallback()', function () {
    var collection = {
      name: 'collection '
    };
    test('navigation event should not be triggered if argument set to false', function () {
      var wrapper = getWrapper();
      var instance = wrapper.instance();
      instance.updateCollection = jest.fn();
      instance.recentsSuccessCallback(collection, false);
      expect(instance.updateCollection).toHaveBeenCalledWith(collection);
    });
    test('navigation event should be triggered if argument set to true ', function () {
      var wrapper = getWrapper();
      var instance = wrapper.instance();
      instance.updateCollection = jest.fn();
      instance.recentsSuccessCallback(collection, true);
      expect(instance.updateCollection).toHaveBeenCalledWith(collection, undefined, instance.finishNavigation);
    });
  });
  describe('updateCollection()', function () {
    describe('selection', function () {
      var item1 = {
        id: 1
      };
      var item2 = {
        id: 2
      };
      var collection = {
        boxItem: {},
        id: '0',
        items: [item1, item2],
        name: 'name'
      };
      var wrapper;
      var instance;
      beforeEach(function () {
        wrapper = getWrapper();
        instance = wrapper.instance();
        instance.setState({
          currentCollection: collection,
          selected: undefined
        });
        instance.setState = jest.fn();
      });
      test('should set same collection and no selected item to state if no items present in collection', function () {
        var noItemsCollection = _objectSpread({}, collection, {
          items: undefined
        });

        var expectedCollection = _objectSpread({}, collection, {
          items: []
        });

        instance.updateCollection(noItemsCollection, {
          id: 3
        }).then(function () {
          expect(instance.setState).toHaveBeenCalledWith({
            currentCollection: expectedCollection,
            selected: undefined
          }, noop);
        });
      });
      test('should update the collection items selected to false even if selected item is not in the collection', function () {
        var expectedItem1 = {
          id: 1,
          selected: false,
          thumbnailUrl: null
        };
        var expectedItem2 = {
          id: 2,
          selected: false,
          thumbnailUrl: null
        };
        var expectedCollection = {
          boxItem: {},
          id: '0',
          items: [expectedItem1, expectedItem2],
          name: 'name'
        };
        instance.updateCollection(collection, {
          id: 3
        }).then(function () {
          expect(instance.setState).toHaveBeenCalledWith({
            currentCollection: expectedCollection,
            selected: undefined
          }, noop);
        });
      });
      test('should update the collection items selected to false except for the selected item in the collection', function () {
        var expectedItem1 = {
          id: 1,
          selected: false,
          thumbnailUrl: null
        };
        var expectedItem2 = {
          id: 2,
          selected: true,
          thumbnailUrl: null
        };
        var expectedCollection = {
          boxItem: {},
          id: '0',
          items: [expectedItem1, expectedItem2],
          name: 'name'
        };
        instance.updateCollection(collection, {
          id: 2
        }).then(function () {
          expect(instance.setState).toHaveBeenCalledWith({
            currentCollection: expectedCollection,
            selected: expectedItem2
          }, noop);
        });
      });
      test('should update the selected item in the collection', function () {
        var expectedItem1 = {
          id: 1,
          selected: false,
          thumbnailUrl: null
        };
        var expectedItem2 = {
          id: 2,
          selected: true,
          newProperty: 'newProperty',
          thumbnailUrl: null
        };
        var expectedCollection = {
          boxItem: {},
          id: '0',
          items: [expectedItem1, expectedItem2],
          name: 'name'
        };
        instance.updateCollection(collection, {
          id: 2,
          newProperty: 'newProperty'
        }).then(function () {
          expect(instance.setState).toHaveBeenCalledWith({
            currentCollection: expectedCollection,
            selected: _objectSpread({}, expectedItem2, {
              newProperty: 'newProperty'
            })
          }, noop);
        });
      });
    });
    describe('thumbnails', function () {
      var baseItem = {
        id: '1',
        selected: true,
        type: 'file'
      };
      var baseCollection = {
        boxItem: {},
        id: '0',
        items: [baseItem],
        name: 'collectionName',
        selected: baseItem
      };
      var thumbnailUrl = 'thumbnailUrl';
      var callback = jest.fn();
      var wrapper;
      var instance;
      var collection;
      var item;
      beforeEach(function () {
        collection = cloneDeep(baseCollection);
        item = cloneDeep(baseItem);
      });
      test('should add thumbnailUrl', function () {
        var getThumbnailUrl = jest.fn().mockReturnValue(thumbnailUrl);
        var getFileAPI = jest.fn().mockReturnValue({
          getThumbnailUrl: getThumbnailUrl
        });
        wrapper = getWrapper();
        instance = wrapper.instance();
        instance.api = {
          getFileAPI: getFileAPI
        };
        instance.setState = jest.fn();
        return instance.updateCollection(collection, item, callback).then(function () {
          var newSelected = _objectSpread({}, item, {
            thumbnailUrl: thumbnailUrl
          });

          var newCollection = _objectSpread({}, collection, {
            items: [newSelected]
          });

          expect(instance.setState).toHaveBeenCalledWith({
            currentCollection: newCollection,
            selected: newSelected
          }, callback);
        });
      });
      test('should not call attemptThumbnailGeneration if thumbnail is null', function () {
        var getThumbnailUrl = jest.fn().mockReturnValue(null);
        var getFileAPI = jest.fn().mockReturnValue({
          getThumbnailUrl: getThumbnailUrl
        });
        wrapper = getWrapper();
        instance = wrapper.instance();
        instance.api = {
          getFileAPI: getFileAPI
        };
        instance.setState = jest.fn();
        instance.attemptThumbnailGeneration = jest.fn();
        return instance.updateCollection(collection, item, callback).then(function () {
          expect(instance.attemptThumbnailGeneration).not.toHaveBeenCalled();
        });
      });
      test('should not call attemptThumbnailGeneration if isThumbnailReady is true', function () {
        var getThumbnailUrl = jest.fn().mockReturnValue(null);
        var getFileAPI = jest.fn().mockReturnValue({
          getThumbnailUrl: getThumbnailUrl
        });
        wrapper = getWrapper();
        instance = wrapper.instance();
        instance.api = {
          getFileAPI: getFileAPI
        };
        instance.setState = jest.fn();
        instance.attemptThumbnailGeneration = jest.fn();
        utils.isThumbnailReady = jest.fn().mockReturnValue(true);
        return instance.updateCollection(collection, item, callback).then(function () {
          expect(instance.attemptThumbnailGeneration).not.toHaveBeenCalled();
        });
      });
      test('should call attemptThumbnailGeneration if isThumbnailReady is false', function () {
        var getThumbnailUrl = jest.fn().mockReturnValue(thumbnailUrl);
        var getFileAPI = jest.fn().mockReturnValue({
          getThumbnailUrl: getThumbnailUrl
        });
        wrapper = getWrapper();
        instance = wrapper.instance();
        instance.api = {
          getFileAPI: getFileAPI
        };
        instance.setState = jest.fn();
        instance.attemptThumbnailGeneration = jest.fn();
        utils.isThumbnailReady = jest.fn().mockReturnValue(false);
        return instance.updateCollection(collection, item, callback).then(function () {
          expect(instance.attemptThumbnailGeneration).toHaveBeenCalled();
        });
      });
      test('should not call attemptThumbnailGeneration or getThumbnailUrl if item is not file', function () {
        var getThumbnailUrl = jest.fn().mockReturnValue(thumbnailUrl);
        var getFileAPI = jest.fn().mockReturnValue({
          getThumbnailUrl: getThumbnailUrl
        });
        wrapper = getWrapper();
        instance = wrapper.instance();
        instance.api = {
          getFileAPI: getFileAPI
        };
        instance.setState = jest.fn();
        instance.attemptThumbnailGeneration = jest.fn();
        utils.isThumbnailReady = jest.fn().mockReturnValue(false);
        collection.items[0].type = 'folder';
        return instance.updateCollection(collection, item, callback).then(function () {
          expect(instance.attemptThumbnailGeneration).not.toHaveBeenCalled();
          expect(getThumbnailUrl).not.toHaveBeenCalled();
        });
      });
    });
    describe('attemptThumbnailGeneration()', function () {
      var entry1 = {
        name: 'entry1',
        updated: false
      };
      var entry2 = {
        name: 'entry2',
        updated: false
      };
      var itemWithRepresentation = {
        representations: {
          entries: [entry1, entry2]
        }
      };
      var itemWithoutRepresentation = {
        name: 'item'
      };
      var wrapper;
      var instance;
      test('should not update item in collection if grid view is not enabled', function () {
        wrapper = getWrapper();
        instance = wrapper.instance();
        instance.updateItemInCollection = jest.fn();
        return instance.attemptThumbnailGeneration(itemWithRepresentation).then(function () {
          expect(instance.updateItemInCollection).not.toHaveBeenCalled();
        });
      });
      test('should not update item in collection if item does not have representation', function () {
        wrapper = getWrapper();
        instance = wrapper.instance();
        instance.updateItemInCollection = jest.fn();
        return instance.attemptThumbnailGeneration(itemWithoutRepresentation).then(function () {
          expect(instance.updateItemInCollection).not.toHaveBeenCalled();
        });
      });
      test('should not update item in collection if updated representation matches given representation', function () {
        wrapper = getWrapper();
        instance = wrapper.instance();
        instance.updateItemInCollection = jest.fn();
        instance.api = {
          getFileAPI: jest.fn().mockReturnValue({
            generateRepresentation: jest.fn().mockReturnValue(entry1)
          })
        };
        return instance.attemptThumbnailGeneration(itemWithRepresentation).then(function () {
          expect(instance.updateItemInCollection).not.toHaveBeenCalled();
        });
      });
      test('should update item in collection if representation is updated', function () {
        wrapper = getWrapper();
        instance = wrapper.instance();
        instance.updateItemInCollection = jest.fn();
        instance.api = {
          getFileAPI: jest.fn().mockReturnValue({
            generateRepresentation: jest.fn().mockReturnValue(_objectSpread({}, entry1, {
              updated: true
            }))
          })
        };
        return instance.attemptThumbnailGeneration(itemWithRepresentation).then(function () {
          expect(instance.updateItemInCollection).toHaveBeenCalledWith(_objectSpread({}, itemWithRepresentation, {
            representations: {
              entries: [_objectSpread({}, entry1, {
                updated: true
              }), entry2]
            }
          }));
        });
      });
    });
    describe('updateItemInCollection()', function () {
      var item1 = {
        id: '1',
        updated: false
      };
      var item2 = {
        id: '2',
        updated: false
      };
      var baseCollection = {
        items: [item1, item2]
      };
      var wrapper;
      var instance;
      beforeEach(function () {
        wrapper = getWrapper();
        instance = wrapper.instance();
        instance.setState({
          currentCollection: baseCollection
        });
        instance.setState = jest.fn();
      });
      test('should not update collection if matching id is not present in collection', function () {
        var item3 = {
          id: '3',
          updated: true
        };
        instance.updateItemInCollection(item3);
        expect(instance.setState).toHaveBeenCalledWith({
          currentCollection: baseCollection
        });
      });
      test('should update collection if matching id is present in collection', function () {
        var newItem2 = {
          id: '2',
          updated: true
        };
        instance.updateItemInCollection(newItem2);
        expect(instance.setState).toHaveBeenCalledWith({
          currentCollection: _objectSpread({}, baseCollection, {
            items: [item1, newItem2]
          })
        });
      });
    });
  });
  describe('lifecycle methods', function () {
    test('componentDidUpdate', function () {
      var props = {
        currentFolderId: '123'
      };
      var wrapper = getWrapper(props);
      var instance = wrapper.instance();
      instance.fetchFolder = jest.fn();
      wrapper.setProps({
        currentFolderId: '345'
      });
      expect(instance.fetchFolder).toBeCalledWith('345');
    });
  });
  describe('getMaxNumberOfGridViewColumnsForWidth()', function () {
    test('should be able to display 7 columns if isVeryLarge', function () {
      var wrapper = getWrapper({
        isVeryLarge: true
      });
      var instance = wrapper.instance();
      expect(instance.getMaxNumberOfGridViewColumnsForWidth()).toBe(7);
    });
    test('should only be able to display 5 columns if isLarge', function () {
      var wrapper = getWrapper({
        isLarge: true
      });
      var instance = wrapper.instance();
      expect(instance.getMaxNumberOfGridViewColumnsForWidth()).toBe(5);
    });
    test('should only be able to display 3 columns if isMedium', function () {
      var wrapper = getWrapper({
        isMedium: true
      });
      var instance = wrapper.instance();
      expect(instance.getMaxNumberOfGridViewColumnsForWidth()).toBe(3);
    });
    test('should only be able to display 1 column if isSmall', function () {
      var wrapper = getWrapper({
        isSmall: true
      });
      var instance = wrapper.instance();
      expect(instance.getMaxNumberOfGridViewColumnsForWidth()).toBe(1);
    });
  });
  describe('updateMetadata()', function () {
    test('should update metadata for given Box item, field, old and new values', function () {
      var item = {};
      var field = 'amount';
      var oldValue = 'abc';
      var newValue = 'pqr';
      var wrapper = getWrapper();
      var instance = wrapper.instance();
      instance.metadataQueryAPIHelper = {
        updateMetadata: jest.fn()
      };
      instance.updateMetadata(item, field, oldValue, newValue);
      expect(instance.metadataQueryAPIHelper.updateMetadata).toHaveBeenCalledWith(item, field, oldValue, newValue, expect.any(Function), instance.errorCallback);
    });
  });
  describe('updateMetadataSuccessCallback()', function () {
    test('should correctly update the current collection and set the state', function () {
      var boxItem = {
        id: 2
      };
      var field = 'amount';
      var newValue = 111.22;
      var collectionItem1 = {
        id: 1,
        metadata: {
          enterprise: {
            fields: [{
              name: 'name',
              key: 'name',
              value: 'abc',
              type: 'string'
            }, {
              name: 'amount',
              key: 'amount',
              value: 100.34,
              type: 'float'
            }]
          }
        }
      };
      var collectionItem2 = {
        id: 2,
        metadata: {
          enterprise: {
            fields: [{
              name: 'name',
              key: 'name',
              value: 'pqr',
              type: 'string'
            }, {
              name: 'amount',
              key: 'amount',
              value: 354.23,
              type: 'float'
            }]
          }
        }
      };
      var clonedCollectionItem2 = cloneDeep(collectionItem2);
      var nextMarker = 'markermarkermarkermarkermarkermarker';
      var currentCollection = {
        items: [collectionItem1, collectionItem2],
        nextMarker: nextMarker
      };
      var wrapper = getWrapper(); // update the metadata

      clonedCollectionItem2.metadata.enterprise.fields.find(function (item) {
        return item.key === field;
      }).value = newValue;
      var updatedItems = [collectionItem1, clonedCollectionItem2];
      wrapper.setState({
        currentCollection: currentCollection
      });
      var instance = wrapper.instance();
      instance.setState = jest.fn();
      instance.updateMetadataSuccessCallback(boxItem, field, newValue);
      expect(instance.setState).toHaveBeenCalledWith({
        currentCollection: {
          items: updatedItems,
          nextMarker: nextMarker,
          percentLoaded: 100
        }
      });
    });
  });
  describe('render()', function () {
    test('should render UploadDialog with contentUploaderProps', function () {
      var contentUploaderProps = {
        apiHost: 'https://api.box.com',
        chunked: false
      };
      var wrapper = getWrapper({
        canUpload: true,
        contentUploaderProps: contentUploaderProps
      });
      wrapper.setState({
        currentCollection: {
          permissions: {
            can_upload: true
          }
        }
      });
      var uploadDialogElement = wrapper.find(UploadDialog);
      expect(uploadDialogElement.length).toBe(1);
      expect(uploadDialogElement.prop('contentUploaderProps')).toEqual(contentUploaderProps);
    });
    test('should render test id for e2e testing', function () {
      var wrapper = getWrapper();
      expect(wrapper.find('[data-testid="content-explorer"]')).toHaveLength(1);
    });
  });
});