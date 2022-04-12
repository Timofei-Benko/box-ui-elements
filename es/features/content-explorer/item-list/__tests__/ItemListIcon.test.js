import React from 'react';
import ItemListIcon from '../ItemListIcon';
describe('features/content-explorer/item-list/ItemListIcon', function () {
  var renderComponent = function renderComponent(props) {
    return shallow(React.createElement(ItemListIcon, props));
  };

  describe('render()', function () {
    test('should render default component', function () {
      var wrapper = renderComponent();
      expect(wrapper.find('FileIcon').length).toBe(1);
      expect(wrapper.prop('extension')).toEqual(undefined);
      expect(wrapper.prop('title')).toBeTruthy();
    });
    [// personalFolder
    {
      type: 'folder',
      hasCollaborations: false,
      isExternallyOwned: false
    }, // collabFolder
    {
      type: 'folder',
      hasCollaborations: true,
      isExternallyOwned: false
    }, // externalCollabFolder
    {
      type: 'folder',
      hasCollaborations: true,
      isExternallyOwned: true
    }].forEach(function (props) {
      test('should render correct folder icon', function () {
        var wrapper = renderComponent(props);
        expect(wrapper.find('FolderIcon').length).toBe(1);
        expect(wrapper.prop('isCollab')).toEqual(props.hasCollaborations);
        expect(wrapper.prop('isExternal')).toEqual(props.isExternallyOwned);
        expect(wrapper.prop('title')).toBeTruthy();
        expect(wrapper).toMatchSnapshot();
      });
    });
    test('should render correct file icon', function () {
      var extension = 'boxnote';
      var wrapper = renderComponent({
        type: 'file',
        extension: extension
      });
      expect(wrapper.find('FileIcon').length).toBe(1);
      expect(wrapper.prop('extension')).toEqual(extension);
      expect(wrapper.prop('title')).toBeTruthy();
    });
    test('should render correct bookmark icon', function () {
      var wrapper = renderComponent({
        type: 'web_link'
      });
      expect(wrapper.find('BookmarkIcon').length).toBe(1);
      expect(wrapper.prop('title')).toBeTruthy();
    });
  });
});