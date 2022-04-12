import React from 'react';
import { createIntl } from 'react-intl';
import collaboratorList from '../__mocks__/collaborators';
import PresenceCollaborator from '../PresenceCollaborator';
import { PresenceCollaboratorsListComponent as PresenceCollaboratorsList } from '../PresenceCollaboratorsList';
var intl = createIntl({});
describe('features/presence/PresenceCollaboratorsList', function () {
  describe('componentDidMount()', function () {
    [// isn't scrollable at all
    {
      isScrollableAbove: false,
      isScrollableBelow: false
    }, // can scroll above
    {
      isScrollableAbove: true,
      isScrollableBelow: false
    }, // can scroll below
    {
      isScrollableAbove: false,
      isScrollableBelow: true
    }, // can scroll both above and below
    {
      isScrollableAbove: true,
      isScrollableBelow: true
    }].forEach(function (_ref) {
      var isScrollableAbove = _ref.isScrollableAbove,
          isScrollableBelow = _ref.isScrollableBelow;
      test('should calculate and set overflow state', function () {
        var wrapper = shallow(React.createElement(PresenceCollaboratorsList, {
          collaborators: []
        }), {
          disableLifecycleMethods: true
        });
        var instance = wrapper.instance();
        var calculateOverflowSpy = jest.fn().mockReturnValue({
          isScrollableBelow: isScrollableBelow,
          isScrollableAbove: isScrollableAbove
        });
        instance.calculateOverflow = calculateOverflowSpy;
        instance.componentDidMount();
        expect(calculateOverflowSpy).toHaveBeenCalledTimes(1);
        expect(wrapper.state().isScrollableAbove).toBe(isScrollableAbove);
        expect(wrapper.state().isScrollableBelow).toBe(isScrollableBelow);
      });
    });
  });
  describe('handleScroll()', function () {
    [// isn't scrollable at all
    {
      isScrollableAbove: false,
      isScrollableBelow: false
    }, // can scroll above
    {
      isScrollableAbove: true,
      isScrollableBelow: false
    }, // can scroll below
    {
      isScrollableAbove: false,
      isScrollableBelow: true
    }, // can scroll both above and below
    {
      isScrollableAbove: true,
      isScrollableBelow: true
    }].forEach(function (_ref2) {
      var isScrollableAbove = _ref2.isScrollableAbove,
          isScrollableBelow = _ref2.isScrollableBelow;
      test('should calculate, call onScroll and set overflow state', function () {
        var onScrollSpy = jest.fn();
        var wrapper = shallow(React.createElement(PresenceCollaboratorsList, {
          intl: intl,
          collaborators: collaboratorList,
          onScroll: onScrollSpy
        }), {
          disableLifecycleMethods: true
        });
        var instance = wrapper.instance();
        var calculateOverflowSpy = jest.fn().mockReturnValue({
          isScrollableBelow: isScrollableBelow,
          isScrollableAbove: isScrollableAbove
        });
        instance.calculateOverflow = calculateOverflowSpy;
        instance.elDropdownList = true;
        instance.handleScroll();
        expect(wrapper.state().isScrollableAbove).toBe(isScrollableAbove);
        expect(wrapper.state().isScrollableBelow).toBe(isScrollableBelow);
        expect(onScrollSpy).toHaveBeenCalled();
      });
    });
  });
  describe('calculateOverflow', function () {
    [// not scrollable above or below
    {
      elem: {
        scrollTop: 0,
        scrollHeight: 0,
        clientHeight: 0
      },
      isScrollableAbove: false,
      isScrollableBelow: false
    }, // only scrollable above
    {
      elem: {
        scrollTop: 20,
        scrollHeight: 80,
        clientHeight: 100
      },
      isScrollableAbove: true,
      isScrollableBelow: false
    }, // only scrollable below
    {
      elem: {
        scrollTop: 0,
        scrollHeight: 100,
        clientHeight: 80
      },
      isScrollableAbove: false,
      isScrollableBelow: true
    }, // scrollable above and below
    {
      elem: {
        scrollTop: 20,
        scrollHeight: 100,
        clientHeight: 70
      },
      isScrollableAbove: true,
      isScrollableBelow: true
    }].forEach(function (_ref3) {
      var elem = _ref3.elem,
          isScrollableAbove = _ref3.isScrollableAbove,
          isScrollableBelow = _ref3.isScrollableBelow;
      test('should calculate overflow and return isScrollableAbove and isScrollableBelow', function () {
        var wrapper = shallow(React.createElement(PresenceCollaboratorsList, {
          collaborators: []
        }), {
          disableLifecycleMethods: true
        });
        var instance = wrapper.instance();
        var result = instance.calculateOverflow(elem);
        expect(result.isScrollableAbove).toBe(isScrollableAbove);
        expect(result.isScrollableBelow).toBe(isScrollableBelow);
      });
    });
  });
  describe('render()', function () {
    var wrapper = shallow(React.createElement(PresenceCollaboratorsList, {
      intl: intl,
      collaborators: collaboratorList,
      getLinkCallback: function getLinkCallback() {},
      inviteCallback: function inviteCallback() {}
    }), {
      disableLifecycleMethods: true
    });
    test('should correctly render dropdownActions', function () {
      expect(wrapper.find('.bdl-PresenceCollaboratorsList-actions').length).toBe(1);
    });
    test('should correctly render collaborators', function () {
      expect(wrapper.find(PresenceCollaborator)).toHaveLength(5);
    });
  });
});