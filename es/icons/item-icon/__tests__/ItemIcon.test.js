function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

import React from 'react';
import { shallow } from 'enzyme';
import ItemIcon from '../ItemIcon';
describe('icons/item-icon/ItemIcon', function () {
  var getWrapper = function getWrapper() {
    var props = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    return shallow(React.createElement(ItemIcon, _extends({
      iconType: ""
    }, props)));
  };

  describe.each(['audio', 'bookmark', 'boxnote', 'code', 'default', 'document', 'docuworks-binder', 'docuworks-file', 'dwg', 'excel-spreadsheet', 'folder-collab', 'folder-external', 'folder-plain', 'google-docs', 'google-sheets', 'google-slides', 'illustrator', 'image', 'indesign', 'keynote', 'numbers', 'pages', 'pdf', 'photoshop', 'powerpoint-presentation', 'presentation', 'spreadsheet', 'text', 'threed', 'vector', 'video', 'word-document', 'zip'])('render()', function (iconType) {
    test("should render ".concat(iconType, " component"), function () {
      var wrapper = getWrapper({
        iconType: iconType
      });
      expect(wrapper).toMatchSnapshot();
    });
    test("should render ".concat(iconType, " component with additional props"), function () {
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