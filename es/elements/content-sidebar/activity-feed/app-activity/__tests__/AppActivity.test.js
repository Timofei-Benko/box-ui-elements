function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

import * as React from 'react';
import { shallow } from 'enzyme';
import AppActivity from '../AppActivity';
import Media from '../../../../../components/media';
import { Link } from '../../../../../components/link';
describe('elements/content-sidebar/ActivityFeed/app-activity/AppActivity', function () {
  var fakeActivityTemplate = {
    id: 'template_12345'
  };
  var fakeApp = {
    id: 'app_12345',
    icon_url: 'foo/bar/baz.jpg',
    name: 'My Application'
  };
  var fakeUser = {
    id: 'user_1'
  };
  var fakeAppActivity = {
    activity_template: fakeActivityTemplate,
    app: fakeApp,
    created_at: '2019-03-07T20:12:49.223Z',
    created_by: fakeUser,
    id: 'activity_12345',
    rendered_text: 'You did something from <a data-resin-target="foo" data-resin-action="bar" >This App</a>'
  };

  var render = function render() {
    var props = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    return shallow(React.createElement(AppActivity, _extends({
      isPending: false,
      onDelete: jest.fn()
    }, fakeAppActivity, props))).dive();
  };

  test('should correctly render an app activity item', function () {
    var currentUser = _objectSpread({}, fakeUser);

    expect(render({
      currentUser: currentUser,
      permissions: {
        can_delete: true
      }
    })).toMatchSnapshot();
  });
  test('should render as pending if isPending flag passed in', function () {
    var currentUser = _objectSpread({}, fakeUser);

    var wrapper = render({
      currentUser: currentUser,
      isPending: true,
      permissions: {
        can_delete: true
      }
    });
    expect(wrapper.find(Media).hasClass('bcs-is-pending')).toBe(true);
  });
  test('should render as pending if an error occurred', function () {
    var currentUser = _objectSpread({}, fakeUser);

    var wrapper = render({
      currentUser: currentUser,
      error: {},
      permissions: {
        can_delete: true
      }
    });
    expect(wrapper.find(Media).hasClass('bcs-is-pending')).toBe(true);
  });
  test('should show the overflow menu if the current user is the one who made the activity', function () {
    var wrapper = render({
      currentUser: _objectSpread({}, fakeUser)
    });
    expect(wrapper.exists(Media.Menu)).toBe(true);
  });
  test('should show the overflow menu if a different user, with the correct permissions', function () {
    var wrapper = render({
      currentUser: {
        id: 'someone_else'
      },
      permissions: {
        can_delete: true
      }
    });
    expect(wrapper.exists(Media.Menu)).toBe(true);
  });
  test('should show the overflow menu if pending', function () {
    var wrapper = render({
      currentUser: {
        id: 'someone_else'
      },
      permissions: {
        can_delete: true
      },
      isPending: true
    });
    expect(wrapper.exists(Media.Menu)).toBe(false);
  });
  test('should show the overflow menu if missing permissions and a different user', function () {
    var wrapper = render({
      currentUser: {
        id: 'someone_else'
      },
      permissions: {
        can_delete: false
      }
    });
    expect(wrapper.exists(Media.Menu)).toBe(false);
  });
  test('should render app activity links and pass through any resin attributes', function () {
    var action = 'my_action';
    var target = 'my_target';
    var wrapper = render({
      currentUser: {
        id: 'someone_else'
      },
      rendered_text: "You did shared via <a data-resin-target=\"".concat(target, "\" data-resin-action=\"").concat(action, "\">Box</a>")
    });
    var link = wrapper.find(Link);
    expect(link.exists()).toBe(true);
    expect(link.prop('data-resin-action')).toEqual(action);
    expect(link.prop('data-resin-target')).toEqual(target);
    expect(wrapper.exists('a')).toBe(false);
  });
});