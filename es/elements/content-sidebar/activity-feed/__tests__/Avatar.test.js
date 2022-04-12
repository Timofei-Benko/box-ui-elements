function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

import React from 'react';
import { shallow } from 'enzyme';
import Avatar from '../Avatar';
describe('elements/content-sidebar/ActivityFeed/Avatar', function () {
  var user = {
    id: 'foo',
    login: 'foo@bar.com',
    name: 'foo bar',
    type: 'user'
  };
  var getAvatarUrl = jest.fn().mockReturnValue(Promise.resolve('foo'));

  var getWrapper = function getWrapper(props) {
    return shallow(React.createElement(Avatar, props));
  };

  test('should render nothing if no avatarUrl in state and getAvatarUrl method was passed', function () {
    expect(getWrapper({
      user: user,
      getAvatarUrl: getAvatarUrl
    }).dive().find('Avatar').exists()).toBe(false);
    expect(getAvatarUrl).toBeCalledWith(user.id);
  });
  test('should render avatar with initials if getAvatarUrl is not passed in and no avatarUrl is in state', function () {
    expect(getWrapper({
      user: user
    }).find('AvatarInitials').exists()).toBe(false);
    expect(getAvatarUrl).not.toBeCalledWith(user.id);
  });
  test('should render the avatar with an avatarUrl', function () {
    var wrapper = getWrapper({
      user: user,
      getAvatarUrl: getAvatarUrl
    });
    wrapper.instance().getAvatarUrlHandler('foo');
    wrapper.update();
    expect(wrapper).toMatchSnapshot();
    expect(wrapper.instance().isMounted).toBe(true);
  });
  test('should set the avatarUrl state by calling getAvatarUrl function prop', function () {
    var wrapper = getWrapper({
      user: user,
      getAvatarUrl: getAvatarUrl
    });
    expect(wrapper.state('avatarUrl')).toBe(null);
    wrapper.instance().getAvatarUrl().then(function () {
      expect(wrapper.state('avatarUrl')).toBe('foo');
    });
  });
  test('should set the avatarUrl state from user prop',
  /*#__PURE__*/
  _asyncToGenerator(
  /*#__PURE__*/
  regeneratorRuntime.mark(function _callee() {
    var completeUser, wrapper;
    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            completeUser = _objectSpread({}, user, {
              avatar_url: 'bar'
            });
            wrapper = getWrapper({
              user: completeUser
            });
            expect(wrapper.state('avatarUrl')).toBe(null);
            _context.next = 5;
            return wrapper.instance().getAvatarUrl();

          case 5:
            expect(wrapper.state('avatarUrl')).toBe('bar');
            expect(getAvatarUrl).not.toBeCalledWith(user.id);

          case 7:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  })));
  test('should set the avatarUrl state from user prop',
  /*#__PURE__*/
  _asyncToGenerator(
  /*#__PURE__*/
  regeneratorRuntime.mark(function _callee2() {
    var wrapper;
    return regeneratorRuntime.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            wrapper = getWrapper({
              user: user
            });
            expect(wrapper.state('avatarUrl')).toBe(null);
            _context2.next = 4;
            return wrapper.instance().getAvatarUrl();

          case 4:
            wrapper.update();
            expect(getAvatarUrl).not.toBeCalledWith(user.id);
            expect(wrapper.dive()).toMatchSnapshot();

          case 7:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2);
  })));
});