function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

import React from 'react';
import { shallow } from 'enzyme';
import classificationColorsMap from '../../classification/classificationColorsMap';
import UnifiedShareModalTitle from '../UnifiedShareModalTitle';
describe('features/unified-share-modal/HeaderTitle', function () {
  var wrapper;
  var defaultItem = {
    canUserSeeClassification: false,
    classification: 'internal',
    bannerPolicy: {
      body: 'test'
    },
    id: '111',
    name: 'test file',
    type: 'file',
    grantedPermissions: {
      itemShare: true
    },
    hideCollaborators: false
  };

  var getWrapper = function getWrapper() {
    var props = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    return shallow(React.createElement(UnifiedShareModalTitle, _extends({
      item: defaultItem
    }, props)));
  };

  beforeEach(function () {
    wrapper = getWrapper();
  });
  test('should not render classification label when canUserSeeClassification is false', function () {
    expect(wrapper.find('Classification')).toHaveLength(0);
    expect(wrapper).toMatchSnapshot();
  });
  test('should render classification label when canUserSeeClassification is true', function () {
    var itemWithSeeClassification = _objectSpread({}, defaultItem, {
      canUserSeeClassification: true
    });

    wrapper = shallow(React.createElement(UnifiedShareModalTitle, {
      item: itemWithSeeClassification
    }));
    expect(wrapper.find('Classification')).toHaveLength(1);
  });
  test('should render classification label with fill and stroke colors that match the classification color id', function () {
    var colorID = 3;
    var color = classificationColorsMap[colorID].color;

    var item = _objectSpread({}, defaultItem, {
      canUserSeeClassification: true,
      bannerPolicy: {
        colorID: colorID
      }
    });

    wrapper = shallow(React.createElement(UnifiedShareModalTitle, {
      item: item
    }));
    expect(wrapper.find('Classification').props().color).toBe(color);
  });
});