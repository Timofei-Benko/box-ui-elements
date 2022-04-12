function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

import React from 'react';
import { mount } from 'enzyme';
import { Link } from '../../../components/link';
import QuickSearchItem from '../QuickSearchItem';
describe('features/quick-search/QuickSearchItem', function () {
  var itemData = {
    iconType: 'boxnote',
    id: '321',
    name: 'hitesting.boxnote',
    nameWithMarkedQuery: 'hi<mark>test<mark>ing.boxnote',
    parentName: 'parent',
    type: 'file',
    updatedBy: 'Yo',
    updatedDate: 123
  };
  test('should render datalist item', function () {
    var wrapper = mount(React.createElement(QuickSearchItem, {
      className: "test",
      itemData: itemData,
      "data-resin-query": "test"
    }));
    expect(wrapper.find('DatalistItem').hasClass('quick-search-item')).toBe(true);
    expect(wrapper.find('DatalistItem').hasClass('test')).toBe(true);
    expect(wrapper.find('DatalistItem').prop('data-resin-query')).toEqual('test');
  });
  test.each([['file', 'txt', null, 1, false, '/file/321'], ['file', 'txt', 'http://www.google.com', 1, false, 'http://www.google.com'], ['file', 'boxnote', null, 1, true, '/notes/321'], ['file', 'boxnote', 'https://app.box.com/s/hi', 1, true, 'https://app.box.com/s/hi'], ['folder', null, null, 1, false, '/folder/321'], ['web_link', null, null, 1, true, '/web_link/321'], ['foo', 'text', null, 0, false, false]])('should render file type %s with %s extension correctly', function (type, extension, sharedLink, expectedHrefLength, expectedTargetBlank, expectedHref) {
    var itemDataType = _objectSpread({}, itemData, {
      extension: extension,
      type: type,
      sharedLink: sharedLink
    });

    var wrapper = mount(React.createElement(QuickSearchItem, {
      itemData: itemDataType,
      shouldNavigateOnItemClick: true
    }));
    var itemName = wrapper.find('a.item-name');
    expect(itemName.length).toEqual(expectedHrefLength);

    if (expectedHrefLength) {
      var _itemName$props = itemName.props(),
          target = _itemName$props.target,
          href = _itemName$props.href;

      if (expectedTargetBlank) {
        expect(target).toEqual('_blank');
      } else {
        expect(target).toEqual(undefined);
      }

      expect(href).toEqual(expectedHref);
    }
  });
  test('should render item icon', function () {
    var wrapper = mount(React.createElement(QuickSearchItem, {
      itemData: itemData
    }));
    var icon = wrapper.find('ItemIcon');
    expect(icon.prop('iconType')).toEqual(itemData.iconType);
    expect(icon.prop('title')).toBeTruthy();
  });
  test('should render item name', function () {
    var wrapper = mount(React.createElement(QuickSearchItem, {
      itemData: itemData,
      shouldNavigateOnItemClick: true
    }));
    var itemName = wrapper.find('a.item-name');
    var searchTerm = itemName.children();
    expect(itemName.prop('title')).toEqual(itemData.name);
    expect(itemName.text()).toEqual(itemData.name);
    expect(searchTerm.at(1).is('mark.search-term')).toBe(true);
    expect(searchTerm.at(1).text()).toEqual('test');
  });
  test('should render Link for item info when shouldNavigateOnItemClick is passed in', function () {
    var wrapper = mount(React.createElement(QuickSearchItem, {
      itemData: itemData,
      shouldNavigateOnItemClick: true
    }));
    var itemName = wrapper.find('a.item-name');
    var href = '/file/321';
    expect(itemName.prop('href')).toEqual(href);
    expect(wrapper.find('.item-name').contains(React.createElement(Link, {
      href: href
    })));
  });
  test('should render span for item info when shouldNavigateOnItemClick is not passed in', function () {
    var wrapper = mount(React.createElement(QuickSearchItem, {
      itemData: itemData
    }));
    var itemName = wrapper.find('.item-name');
    expect(itemName.prop('href')).toEqual(undefined);
    expect(wrapper.find('.item-name').contains(React.createElement("span", null)));
  });
  test('should render search matches with spaces properly', function () {
    var multiMarkItemData = _objectSpread({}, itemData, {
      nameWithMarkedQuery: 'hi<mark>test<mark>in<mark>g<mark>.boxnote'
    });

    var wrapper = mount(React.createElement(QuickSearchItem, {
      itemData: multiMarkItemData,
      shouldNavigateOnItemClick: true
    }));
    var itemName = wrapper.find('a.item-name');
    var searchTerm = itemName.children();
    expect(itemName.text()).toEqual(multiMarkItemData.name);
    expect(searchTerm.length).toEqual(5);
  });
  test('should render parent folder icon', function () {
    var wrapper = mount(React.createElement(QuickSearchItem, {
      itemData: itemData
    }));
    expect(wrapper.find('Folder16').prop('title')).toBeTruthy();
  });
  test('should render parent name', function () {
    var wrapper = mount(React.createElement(QuickSearchItem, {
      itemData: itemData
    }));
    expect(wrapper.find('.parent-folder').text()).toEqual(itemData.parentName);
  });
  test('should render parent name with parentFolderRenderer when specified', function () {
    // eslint-disable-next-line jsx-a11y/anchor-is-valid
    var renderer = function renderer(data) {
      return React.createElement("a", {
        className: "parent-folder"
      }, data.parentName);
    };

    var wrapper = mount(React.createElement(QuickSearchItem, {
      itemData: itemData,
      parentFolderRenderer: renderer
    }));
    expect(wrapper.find('a.parent-folder').text()).toEqual(itemData.parentName);
  });
  test('should not render parent folder or separator if no parentName or parentFolderRenderer', function () {
    var itemDataWithoutParent = _objectSpread({}, itemData, {
      parentName: undefined
    });

    var wrapper = mount(React.createElement(QuickSearchItem, {
      itemData: itemDataWithoutParent
    }));
    expect(wrapper.find('.item-subtext')).toMatchSnapshot();
  });
  test('should render updated text', function () {
    var wrapper = mount(React.createElement(QuickSearchItem, {
      itemData: itemData
    }));
    var updatedText = wrapper.find('.txt-ellipsis');
    expect(updatedText.prop('title')).toBeTruthy();
    expect(updatedText.text()).toBeTruthy();
  });
});