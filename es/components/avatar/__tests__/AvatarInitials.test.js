function _templateObject() {
  var data = _taggedTemplateLiteral(["\n        name                               | initials\n        ", "                         | ", "\n        ", "                   | ", "\n        ", "        | ", "\n        ", "   | ", "\n        ", "   | ", "\n        ", "   | ", "\n        ", "  | ", "\n        ", "  | ", "\n        ", " | ", "\n        ", " | ", "\n        ", " | ", "\n        ", " | ", "\n        ", "                 | ", "\n        ", "      | ", "\n    "]);

  _templateObject = function _templateObject() {
    return data;
  };

  return data;
}

function _taggedTemplateLiteral(strings, raw) { if (!raw) { raw = strings.slice(0); } return Object.freeze(Object.defineProperties(strings, { raw: { value: Object.freeze(raw) } })); }

import React from 'react';
import { shallow } from 'enzyme';
import AvatarInitials from '../AvatarInitials';
describe('components/avatar/AvatarInitials', function () {
  test('should render a span container', function () {
    var wrapper = shallow(React.createElement(AvatarInitials, {
      className: "test",
      name: "hello world"
    }));
    expect(wrapper.is('span.avatar-initials.test')).toBeTruthy();
  });
  test.each(_templateObject(), 'hello', 'HH', 'hello world', 'HW', 'hello world (personal)', 'HW', 'hello world {personal acct}', 'HW', 'hello world <personal acct>', 'HW', 'hello world [personal acct]', 'HW', 'hello world  (personal acct)', 'HW', ' hello world (personal acct)', 'HW', 'hello  world  (personal acct)', 'HW', 'hello world {{personal acct}}', 'HW', 'hello world <{personal acct}>', 'HW', 'hello world ((personal acct))', 'HW', 'John S. Smith', 'JS', 'James R. Stein-Grennaway', 'JS')('should render the initials "$initials" from name "$name"', function (_ref) {
    var name = _ref.name,
        initials = _ref.initials;
    var wrapper = shallow(React.createElement(AvatarInitials, {
      name: name
    }));
    expect(wrapper.text()).toEqual(initials);
  });
  test('should set data-bg-idx attribute based on id', function () {
    var wrapper = shallow(React.createElement(AvatarInitials, {
      id: "10",
      name: "hello world"
    }));
    expect(wrapper.prop('data-bg-idx')).toEqual(4);
  });
  test('should set a default data-bg-idx attribute if no id is passed in', function () {
    var wrapper = shallow(React.createElement(AvatarInitials, {
      name: "hello world"
    }));
    expect(wrapper.prop('data-bg-idx')).toEqual(0);
  });
});