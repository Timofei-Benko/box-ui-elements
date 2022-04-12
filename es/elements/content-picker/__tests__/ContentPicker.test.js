import React from 'react';
import { mount } from 'enzyme';
import { ContentPickerComponent as ContentPicker } from '../ContentPicker';
import UploadDialog from '../../common/upload-dialog';
jest.mock('../../common/header/Header', function () {
  return 'mock-header';
});
jest.mock('../../common/sub-header/SubHeader', function () {
  return 'mock-subheader';
});
jest.mock('../Footer', function () {
  return 'mock-footer';
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
describe('elements/content-picker/ContentPicker', function () {
  var rootElement;

  var getWrapper = function getWrapper(props) {
    return mount(React.createElement(ContentPicker, props), {
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
    test('should reload the files list', function () {
      var wrapper = getWrapper({});
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
    test('should clear selected items on navigation', function () {
      var wrapper = getWrapper({
        clearSelectedItemsOnNavigation: true
      });
      var selectedItems = [{
        folder_123: {
          id: '123',
          type: 'folder',
          name: 'Folder 123',
          selected: true
        }
      }];
      var collection = {
        id: '222',
        name: 'Collection'
      };
      wrapper.instance().setState({
        selected: selectedItems
      });
      wrapper.instance().fetchFolderSuccessCallback(collection, true);
      expect(wrapper.instance().state.selected).toEqual({});
    });
  });
});