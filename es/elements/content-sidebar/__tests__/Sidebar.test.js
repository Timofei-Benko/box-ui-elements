function _templateObject() {
  var data = _taggedTemplateLiteral(["\n            forced                        | isDefaultOpen | expected\n            ", " | ", "       | ", "\n            ", " | ", "      | ", "\n            ", "   | ", "       | ", "\n            ", "   | ", "      | ", "\n            ", "                       | ", "       | ", "\n            ", "                       | ", "      | ", "\n        "]);

  _templateObject = function _templateObject() {
    return data;
  };

  return data;
}

function _taggedTemplateLiteral(strings, raw) { if (!raw) { raw = strings.slice(0); } return Object.freeze(Object.defineProperties(strings, { raw: { value: Object.freeze(raw) } })); }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

import React from 'react';
import { shallow } from 'enzyme';
import LocalStore from '../../../utils/LocalStore';
import { SIDEBAR_FORCE_KEY, SIDEBAR_FORCE_VALUE_CLOSED, SIDEBAR_FORCE_VALUE_OPEN, SidebarComponent as Sidebar } from '../Sidebar';
jest.mock('../../common/async-load', function () {
  return function () {
    return 'LoadableComponent';
  };
});
jest.mock('../../../utils/LocalStore');
describe('elements/content-sidebar/Sidebar', function () {
  var file = {
    id: 'id',
    file_version: {
      id: '123'
    }
  };

  var getWrapper = function getWrapper(props) {
    return shallow(React.createElement(Sidebar, _extends({
      file: file,
      location: {
        pathname: '/'
      }
    }, props)));
  };

  beforeEach(function () {
    LocalStore.mockClear();
  });
  describe('componentDidUpdate', function () {
    beforeEach(function () {
      LocalStore.mockImplementationOnce(function () {
        return {
          getItem: jest.fn(function () {
            return null;
          }),
          setItem: jest.fn(function () {
            return null;
          })
        };
      });
    });
    test('should update if a user-initiated location change occurred', function () {
      var wrapper = getWrapper({
        location: {
          pathname: '/activity'
        }
      });
      var instance = wrapper.instance();
      instance.setForcedByLocation = jest.fn();
      expect(wrapper.state('isDirty')).toBe(false);
      expect(instance.setForcedByLocation).not.toHaveBeenCalled();
      wrapper.setProps({
        location: {
          pathname: '/details'
        }
      });
      expect(wrapper.state('isDirty')).toBe(true);
      expect(instance.setForcedByLocation).toHaveBeenCalled();
    });
    test('should not set isDirty if an app-initiated location change occurred', function () {
      var wrapper = getWrapper({
        location: {
          pathname: '/activity'
        }
      });
      expect(wrapper.state('isDirty')).toBe(false);
      wrapper.setProps({
        location: {
          pathname: '/details',
          state: {
            silent: true
          }
        }
      });
      expect(wrapper.state('isDirty')).toBe(false);
    });
    test('should set the forced open state if the location state is present', function () {
      var wrapper = getWrapper({
        location: {
          pathname: '/'
        }
      });
      var instance = wrapper.instance();
      instance.isForced = jest.fn();
      wrapper.setProps({
        location: {
          pathname: '/details'
        }
      });
      expect(instance.isForced).toHaveBeenCalledWith(); // Getter for render

      wrapper.setProps({
        location: {
          pathname: '/details/inner',
          state: {
            open: true,
            silent: true
          }
        }
      });
      expect(instance.isForced).toHaveBeenCalledWith(); // Getter for render

      wrapper.setProps({
        location: {
          pathname: '/',
          state: {
            open: true
          }
        }
      });
      expect(instance.isForced).toHaveBeenCalledWith(true);
      wrapper.setProps({
        location: {
          pathname: '/',
          state: {
            open: false
          }
        }
      });
      expect(instance.isForced).toHaveBeenCalledWith(false);
    });
  });
  describe('handleVersionHistoryClick', function () {
    test('should handle url with deeplink', function () {
      var historyMock = {
        push: jest.fn(),
        location: {
          pathname: '/activity/comments/1234'
        }
      };
      var preventDefaultMock = jest.fn();
      var event = {
        preventDefault: preventDefaultMock
      };
      var wrapper = getWrapper({
        history: historyMock,
        file: {
          id: '1234',
          file_version: {
            id: '4567'
          }
        }
      });
      var instance = wrapper.instance();
      instance.handleVersionHistoryClick(event);
      expect(preventDefaultMock).toHaveBeenCalled();
      expect(historyMock.push).toHaveBeenCalledWith('/activity/versions/4567');
    });
    test('should handle url without deeplink', function () {
      var historyMock = {
        push: jest.fn(),
        location: {
          pathname: '/details'
        }
      };
      var preventDefaultMock = jest.fn();
      var event = {
        preventDefault: preventDefaultMock
      };
      var wrapper = getWrapper({
        history: historyMock,
        file: {
          id: '1234',
          file_version: {
            id: '4567'
          }
        }
      });
      var instance = wrapper.instance();
      instance.handleVersionHistoryClick(event);
      expect(preventDefaultMock).toHaveBeenCalled();
      expect(historyMock.push).toHaveBeenCalledWith('/details/versions/4567');
    });
  });
  describe('isForced', function () {
    test('returns the current value from the localStore', function () {
      LocalStore.mockImplementationOnce(function () {
        return {
          getItem: jest.fn(function () {
            return SIDEBAR_FORCE_VALUE_OPEN;
          })
        };
      });
      var wrapper = getWrapper();
      var instance = wrapper.instance();
      expect(instance.store.getItem).toHaveBeenCalledWith(SIDEBAR_FORCE_KEY);
      expect(instance.isForced()).toEqual(SIDEBAR_FORCE_VALUE_OPEN);
    });
    test('returns an empty value from localStore if the value is unset', function () {
      LocalStore.mockImplementationOnce(function () {
        return {
          getItem: jest.fn(function () {
            return null;
          })
        };
      });
      var wrapper = getWrapper();
      var instance = wrapper.instance();
      expect(instance.store.getItem).toHaveBeenCalledWith(SIDEBAR_FORCE_KEY);
      expect(instance.isForced()).toEqual(null);
    });
    test('sets and then returns the value to localStore if passed in', function () {
      LocalStore.mockImplementationOnce(function () {
        return {
          getItem: jest.fn(function () {
            return SIDEBAR_FORCE_VALUE_OPEN;
          }),
          setItem: jest.fn()
        };
      });
      var wrapper = getWrapper();
      var instance = wrapper.instance();
      instance.isForced(SIDEBAR_FORCE_VALUE_OPEN);
      expect(instance.store.setItem).toHaveBeenCalledWith(SIDEBAR_FORCE_KEY, SIDEBAR_FORCE_VALUE_OPEN);
      expect(instance.store.getItem).toHaveBeenCalledWith(SIDEBAR_FORCE_KEY);
      expect(instance.isForced()).toEqual(SIDEBAR_FORCE_VALUE_OPEN);
    });
  });
  describe('isForcedSet', function () {
    test('should return true if the value is not null', function () {
      var wrapper = getWrapper();
      var instance = wrapper.instance();
      instance.isForced = jest.fn(function () {
        return SIDEBAR_FORCE_VALUE_OPEN;
      });
      expect(instance.isForcedSet()).toBe(true);
    });
    test('should return false if the value is null', function () {
      var wrapper = getWrapper();
      var instance = wrapper.instance();
      instance.isForced = jest.fn(function () {
        return null;
      });
      expect(instance.isForcedSet()).toBe(false);
    });
  });
  describe('render', function () {
    test.each(_templateObject(), SIDEBAR_FORCE_VALUE_CLOSED, true, false, SIDEBAR_FORCE_VALUE_CLOSED, false, false, SIDEBAR_FORCE_VALUE_OPEN, true, true, SIDEBAR_FORCE_VALUE_OPEN, false, true, null, true, true, null, false, false)('should render the open state correctly with forced set to $forced and isDefaultOpen set to $isDefaultOpen', function (_ref) {
      var expected = _ref.expected,
          forced = _ref.forced,
          isDefaultOpen = _ref.isDefaultOpen;
      LocalStore.mockImplementationOnce(function () {
        return {
          getItem: jest.fn(function () {
            return forced;
          }),
          setItem: jest.fn(function () {
            return forced;
          })
        };
      });
      var wrapper = getWrapper({
        isDefaultOpen: isDefaultOpen
      });
      expect(wrapper.hasClass('bcs-is-open')).toBe(expected);
    });
  });
  describe('refresh()', function () {
    test.each([true, false])('should call panel refresh with the provided boolean', function (shouldRefreshCache) {
      var instance = getWrapper().instance();
      var refresh = jest.fn();
      instance.sidebarPanels = {
        current: {
          refresh: refresh
        }
      };
      instance.refresh(shouldRefreshCache);
      expect(refresh).toHaveBeenCalledWith(shouldRefreshCache);
    });
  });
});