function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance"); }

function _iterableToArray(iter) { if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

import * as React from 'react';
import CollaboratorAvatars from '../CollaboratorAvatars';
describe('features/collaborator-avatars/CollaboratorAvatars', function () {
  var defaultCollaborators = [{
    collabID: 1,
    name: 'test a',
    hasCustomAvatar: false
  }, {
    collabID: 2,
    name: 'test b'
  }, {
    collabID: 3,
    name: 'test c',
    hasCustomAvatar: true,
    imageUrl: 'https://foo.bar'
  }];
  var maxDisplayedCollaboratorsList = [].concat(defaultCollaborators, [{
    collabID: 4,
    name: 'test d',
    hasCustomAvatar: false
  }, {
    collabID: 5,
    name: 'test e',
    hasCustomAvatar: false
  }, {
    collabID: 6,
    name: 'test f',
    hasCustomAvatar: false
  }]);
  var emptyCollabList = [];

  var getWrapper = function getWrapper() {
    var props = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    return shallow(React.createElement(CollaboratorAvatars, _extends({
      collaborators: defaultCollaborators
    }, props)));
  };

  describe('render()', function () {
    test('should render default component', function () {
      var wrapper = getWrapper();
      expect(wrapper).toMatchSnapshot();
    });
    test('should render component if collaborators.length > maxDisplayedUserAvatars', function () {
      var wrapper = getWrapper({
        collaborators: maxDisplayedCollaboratorsList
      });
      expect(wrapper).toMatchSnapshot();
    });
    test('should render component if collaborators.length - maxDisplayedUserAvatars > maxAdditionalCollaboratorsNum', function () {
      var wrapper = getWrapper({
        collaborators: maxDisplayedCollaboratorsList,
        maxDisplayedUserAvatars: 2,
        maxAdditionalCollaboratorsNum: 3
      });
      expect(wrapper).toMatchSnapshot();
    });
  });
  describe('isVisible()', function () {
    test('should return true if the component has collaborators', function () {
      var wrapper = getWrapper();
      expect(wrapper.instance().isVisible()).toBe(true);
    });
    test('should return false if the component has no collaborators passed in', function () {
      var wrapper = getWrapper({
        collaborators: emptyCollabList
      });
      expect(wrapper.instance().isVisible()).toBe(false);
    });
  });
  describe('hasAdditionalCollaborators()', function () {
    test('should return false when there are no collaborators in the list', function () {
      var wrapper = getWrapper({
        collaborators: emptyCollabList
      });
      expect(wrapper.instance().hasAdditionalCollaborators()).toBe(false);
    });
    test('should return false when the number of collabs is less than the maximum we want to display', function () {
      var wrapper = getWrapper();
      expect(wrapper.instance().hasAdditionalCollaborators()).toBe(false);
    });
    test('should return true when the number of collabs is more than the maximum we want to display', function () {
      var wrapper = getWrapper({
        collaborators: maxDisplayedCollaboratorsList
      });
      expect(wrapper.instance().hasAdditionalCollaborators()).toBe(true);
    });
  });
  describe('collaboratorsOverMaxCount()', function () {
    test('should return false if we have no collaborators', function () {
      var wrapper = getWrapper({
        collaborators: emptyCollabList
      });
      expect(wrapper.instance().collaboratorsOverMaxCount()).toBe(false);
    });
    test('should return false if we have some collaborators, but at the default threshold', function () {
      var wrapper = getWrapper();
      expect(wrapper.instance().collaboratorsOverMaxCount()).toBe(false);
    });
    test('should return false if we can show the plus icon, but have fewer collaborators than the default threshold', function () {
      var wrapper = getWrapper({
        collaborators: maxDisplayedCollaboratorsList
      });
      expect(wrapper.instance().collaboratorsOverMaxCount()).toBe(false);
    });
    test('should return true if we have more collaborators than a user-defined maximum', function () {
      var wrapper = getWrapper({
        collaborators: maxDisplayedCollaboratorsList,
        maxAdditionalCollaboratorsNum: 2
      });
      expect(wrapper.instance().collaboratorsOverMaxCount()).toBe(true);
    });
  });
  describe('formatAdditionalCollaboratorCount()', function () {
    test('should return a format like +x when the collab count is between the max list size and the maximum avatar count', function () {
      var wrapper = getWrapper({
        collaborators: maxDisplayedCollaboratorsList,
        // 6 collabs total
        maxAdditionalCollaboratorsNum: 7,
        maxDisplayedCollaboratorsList: 3
      });
      expect(wrapper.instance().formatAdditionalCollaboratorCount()).toEqual('+3');
    });
    test('should return a format like x+ when the collab count is greater than the max additional collab count', function () {
      var wrapper = getWrapper({
        collaborators: maxDisplayedCollaboratorsList,
        // 6 collabs total
        maxAdditionalCollaboratorsNum: 2,
        maxDisplayedUserAvatars: 3
      });
      expect(wrapper.instance().formatAdditionalCollaboratorCount()).toEqual('2+');
    });
    test('should display +99 when the collaborator list size is at 102', function () {
      var megaCollaboratorList = [].concat(_toConsumableArray(maxDisplayedCollaboratorsList), _toConsumableArray(maxDisplayedCollaboratorsList), _toConsumableArray(maxDisplayedCollaboratorsList), _toConsumableArray(maxDisplayedCollaboratorsList), _toConsumableArray(maxDisplayedCollaboratorsList), _toConsumableArray(maxDisplayedCollaboratorsList), _toConsumableArray(maxDisplayedCollaboratorsList), _toConsumableArray(maxDisplayedCollaboratorsList), _toConsumableArray(maxDisplayedCollaboratorsList), _toConsumableArray(maxDisplayedCollaboratorsList), _toConsumableArray(maxDisplayedCollaboratorsList), _toConsumableArray(maxDisplayedCollaboratorsList), _toConsumableArray(maxDisplayedCollaboratorsList), _toConsumableArray(maxDisplayedCollaboratorsList), _toConsumableArray(maxDisplayedCollaboratorsList), _toConsumableArray(maxDisplayedCollaboratorsList), _toConsumableArray(maxDisplayedCollaboratorsList));
      var wrapper = getWrapper({
        collaborators: megaCollaboratorList
      });
      expect(wrapper.instance().formatAdditionalCollaboratorCount()).toEqual('+99');
    });
    test('should display 99+ when the collaborator list size is over 102', function () {
      var megaCollaboratorList = [].concat(_toConsumableArray(maxDisplayedCollaboratorsList), _toConsumableArray(maxDisplayedCollaboratorsList), _toConsumableArray(maxDisplayedCollaboratorsList), _toConsumableArray(maxDisplayedCollaboratorsList), _toConsumableArray(maxDisplayedCollaboratorsList), _toConsumableArray(maxDisplayedCollaboratorsList), _toConsumableArray(maxDisplayedCollaboratorsList), _toConsumableArray(maxDisplayedCollaboratorsList), _toConsumableArray(maxDisplayedCollaboratorsList), _toConsumableArray(maxDisplayedCollaboratorsList), _toConsumableArray(maxDisplayedCollaboratorsList), _toConsumableArray(maxDisplayedCollaboratorsList), _toConsumableArray(maxDisplayedCollaboratorsList), _toConsumableArray(maxDisplayedCollaboratorsList), _toConsumableArray(maxDisplayedCollaboratorsList), _toConsumableArray(maxDisplayedCollaboratorsList), _toConsumableArray(maxDisplayedCollaboratorsList), _toConsumableArray(maxDisplayedCollaboratorsList));
      var wrapper = getWrapper({
        collaborators: megaCollaboratorList
      });
      expect(wrapper.instance().formatAdditionalCollaboratorCount()).toEqual('99+');
    });
  });
});