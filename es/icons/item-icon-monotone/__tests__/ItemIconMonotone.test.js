function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

import React from 'react';
import { shallow } from 'enzyme';
import ItemIconMonotone from '../ItemIconMonotone';
describe('icons/item-icon-monotone/ItemIconMonotone', function () {
  var getWrapper = function getWrapper() {
    var props = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    return shallow(React.createElement(ItemIconMonotone, _extends({
      iconType: ""
    }, props)));
  };

  describe('render()', function () {
    [{
      iconType: 'audio'
    }, {
      iconType: 'bookmark'
    }, {
      iconType: 'boxnote'
    }, {
      iconType: 'code'
    }, {
      iconType: 'default'
    }, {
      iconType: 'document'
    }, {
      iconType: 'dwg'
    }, {
      iconType: 'excel-spreadsheet'
    }, {
      iconType: 'folder-collab'
    }, {
      iconType: 'folder-external'
    }, {
      iconType: 'folder-plain'
    }, {
      iconType: 'google-docs'
    }, {
      iconType: 'google-sheets'
    }, {
      iconType: 'google-slides'
    }, {
      iconType: 'illustrator'
    }, {
      iconType: 'image'
    }, {
      iconType: 'indesign'
    }, {
      iconType: 'keynote'
    }, {
      iconType: 'numbers'
    }, {
      iconType: 'pages'
    }, {
      iconType: 'pdf'
    }, {
      iconType: 'photoshop'
    }, {
      iconType: 'powerpoint-presentation'
    }, {
      iconType: 'presentation'
    }, {
      iconType: 'spreadsheet'
    }, {
      iconType: 'text'
    }, {
      iconType: 'threed'
    }, {
      iconType: 'folder-plain'
    }, {
      iconType: 'vector'
    }, {
      iconType: 'video'
    }, {
      iconType: 'word-document'
    }, {
      iconType: 'zip'
    }, {
      iconType: ''
    }].forEach(function (_ref) {
      var iconType = _ref.iconType;
      test('should render default component', function () {
        var wrapper = getWrapper({
          iconType: iconType
        });
        expect(wrapper).toMatchSnapshot();
      });
      test('should render component with additional props', function () {
        var wrapper = getWrapper({
          className: 'test',
          dimension: 10,
          iconType: iconType,
          title: 'title'
        });
        expect(wrapper).toMatchSnapshot();
      });
    });
  });
});