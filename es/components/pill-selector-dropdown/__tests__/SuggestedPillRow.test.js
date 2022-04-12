function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

import React from 'react';
import SuggestedPillsRow from '../SuggestedPillsRow';
describe('components/pill-selector-dropdown/SuggestedPillsRow', function () {
  var getWrapper = function getWrapper() {
    var params = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    return shallow(React.createElement(SuggestedPillsRow, _extends({
      onSuggestedPillAdd: jest.fn()
    }, params)));
  };

  describe('render()', function () {
    var collabID1 = 123;
    var collab1 = {
      id: collabID1,
      email: 'foo@box.com',
      name: 'Foo'
    };
    var collabID2 = 987;

    var collab2 = _objectSpread({}, collab1, {
      id: collabID2
    });

    var collabID3 = 456;

    var collab3 = _objectSpread({}, collab1, {
      id: collabID3
    });

    test('should render the SuggestedCollabPill', function () {
      var wrapper = getWrapper({
        suggestedCollaborators: [{
          id: 123,
          email: 'foo@box.com',
          name: 'Foo'
        }]
      });
      expect(wrapper).toMatchSnapshot();
    });
    test('should not render anything when suggested collabs are empty', function () {
      var wrapper = getWrapper({
        suggestedCollaborators: []
      });
      expect(wrapper.html()).toBe(null);
    });
    test('should not render anything when all suggestedCollabs are selected', function () {
      var wrapper = getWrapper({
        selectedPillsValues: [collabID1, collabID2, collabID3],
        suggestedPillsData: [collab1, collab2, collab3]
      });
      expect(wrapper.html()).toBe(null);
    });
    test('should not render suggesteCollabs that have been filtered', function () {
      var wrapper = getWrapper({
        selectedPillsValues: [collabID1],
        suggestedPillsData: [collab1, collab2, collab3]
      });
      expect(wrapper.find('SuggestedPill').length).toBe(2);
    });
  });
});