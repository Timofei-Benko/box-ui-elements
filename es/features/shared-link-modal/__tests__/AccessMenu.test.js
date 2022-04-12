function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

import React from 'react';
import sinon from 'sinon';
import AccessMenu from '../AccessMenu';
import { PEOPLE_WITH_LINK, PEOPLE_IN_COMPANY, PEOPLE_IN_ITEM } from '../constants';
var sandbox = sinon.sandbox.create();
describe('features/shared-link-modal/AccessMenu', function () {
  var getWrapper = function getWrapper() {
    var _ref;

    var props = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    return shallow(React.createElement(AccessMenu, _extends({
      accessLevel: PEOPLE_WITH_LINK,
      allowedAccessLevels: (_ref = {}, _defineProperty(_ref, PEOPLE_WITH_LINK, true), _defineProperty(_ref, PEOPLE_IN_COMPANY, true), _defineProperty(_ref, PEOPLE_IN_ITEM, true), _ref),
      canRemoveLink: true,
      changeAccessLevel: sandbox.stub(),
      enterpriseName: "enterprise",
      itemType: "folder",
      removeLink: sandbox.stub()
    }, props)));
  };

  afterEach(function () {
    sandbox.verifyAndRestore();
  });
  describe('openConfirmModal()', function () {
    test('should set state.isConfirmModalOpen to true', function () {
      var wrapper = getWrapper();
      wrapper.instance().openConfirmModal();
      expect(wrapper.state('isConfirmModalOpen')).toBe(true);
    });
  });
  describe('closeConfirmModal()', function () {
    test('should set state.isConfirmModalOpen to false', function () {
      var wrapper = getWrapper();
      wrapper.setState({
        isConfirmModalOpen: true
      });
      wrapper.instance().closeConfirmModal();
      expect(wrapper.state('isConfirmModalOpen')).toBe(false);
    });
  });
  describe('renderMenu()', function () {
    test('should have correct click handlers on all menu options', function () {
      var wrapper = getWrapper({
        changeAccessLevel: sandbox.mock().thrice()
      });
      var menuOptions = wrapper.find('SelectMenuItem');
      expect(menuOptions.length).toBe(4); // simulate click on all four options

      menuOptions.forEach(function (menuOption) {
        menuOption.simulate('click');
      });
      expect(wrapper.state('isConfirmModalOpen')).toBe(true);
    });
    test('should not render disabled menu options', function () {
      var _allowedAccessLevels;

      var wrapper = getWrapper({
        allowedAccessLevels: (_allowedAccessLevels = {}, _defineProperty(_allowedAccessLevels, PEOPLE_WITH_LINK, true), _defineProperty(_allowedAccessLevels, PEOPLE_IN_COMPANY, false), _defineProperty(_allowedAccessLevels, PEOPLE_IN_ITEM, false), _allowedAccessLevels)
      });
      var menuOptions = wrapper.find('SelectMenuItem');
      expect(menuOptions.length).toBe(2);
    });
    test('should not render remove option when props.canRemoveLink is false', function () {
      var _allowedAccessLevels2;

      var wrapper = getWrapper({
        allowedAccessLevels: (_allowedAccessLevels2 = {}, _defineProperty(_allowedAccessLevels2, PEOPLE_WITH_LINK, true), _defineProperty(_allowedAccessLevels2, PEOPLE_IN_COMPANY, false), _defineProperty(_allowedAccessLevels2, PEOPLE_IN_ITEM, false), _allowedAccessLevels2),
        canRemoveLink: false
      });
      var menuOptions = wrapper.find('SelectMenuItem');
      expect(menuOptions.length).toBe(1);
    });
  });
  describe('render()', function () {
    test('should render component correctly', function () {
      var wrapper = getWrapper({
        accessDropdownMenuProps: {
          constrainToWindow: true
        },
        accessMenuButtonProps: {
          'data-resin-thing': 'access'
        },
        removeLinkButtonProps: {
          'data-resin-thing': 'remove'
        }
      });
      expect(wrapper).toMatchSnapshot();
      expect(wrapper.find('RemoveLinkConfirmModal').prop('onRequestClose')).toEqual(wrapper.instance().closeConfirmModal);
    });
  });
});