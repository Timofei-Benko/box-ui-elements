function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _templateObject() {
  var data = _taggedTemplateLiteral(["\n        permissions             | showDelete\n        ", "  | ", "\n        ", " | ", "\n        ", " | ", "\n        ", " | ", "\n    "]);

  _templateObject = function _templateObject() {
    return data;
  };

  return data;
}

function _taggedTemplateLiteral(strings, raw) { if (!raw) { raw = strings.slice(0); } return Object.freeze(Object.defineProperties(strings, { raw: { value: Object.freeze(raw) } })); }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

import * as React from 'react';
import { shallow } from 'enzyme';
import AnnotationActivityMenu from '../AnnotationActivityMenu';
describe('elements/content-sidebar/ActivityFeed/annotations/AnnotationActivityMenu', function () {
  var defaults = {
    id: '123'
  };

  var getWrapper = function getWrapper() {
    var props = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    return shallow(React.createElement(AnnotationActivityMenu, _extends({}, defaults, props)));
  };

  test.each(_templateObject(), {
    canDelete: true
  }, true, {
    canDelete: false
  }, false, {
    canDelete: false
  }, false, {
    canDelete: false
  }, false)("for an activity with permissions $permissions and onEdit ($onEdit), should showDelete: $showDelete, showEdit: $showEdit", function (_ref) {
    var permissions = _ref.permissions,
        showDelete = _ref.showDelete;
    var wrapper = getWrapper(_objectSpread({}, permissions));
    expect(wrapper.find('[data-testid="delete-annotation-activity"]').length).toEqual(showDelete ? 1 : 0);
  });
  test('should render the edit annotation activity menu item if canEdit is true', function () {
    var wrapper = getWrapper({
      canEdit: true
    });
    expect(wrapper.exists('[data-testid="edit-annotation-activity"]')).toBe(true);
  });
  test('should render resin tags', function () {
    var wrapper = getWrapper({
      canDelete: true,
      canEdit: true
    });
    expect(wrapper.find("[data-testid='delete-annotation-activity']").props()).toMatchObject({
      'data-resin-itemid': '123',
      'data-resin-target': 'activityfeed-annotation-delete'
    });
    expect(wrapper.find("[data-testid='edit-annotation-activity']").props()).toMatchObject({
      'data-resin-itemid': '123',
      'data-resin-target': 'activityfeed-annotation-edit'
    });
  });
});