function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

import React from 'react';
import SuggestedPill from '../SuggestedPill';
describe('components/pill-selector-dropdown/SuggestedPill', function () {
  var preventDefaultStub = jest.fn();
  var basicEvent = {
    preventDefault: preventDefaultStub
  };

  var getWrapper = function getWrapper() {
    var params = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    return shallow(React.createElement(SuggestedPill, _extends({
      email: "foo@bar.com",
      id: 123,
      name: "Foo",
      onAdd: jest.fn()
    }, params)));
  };

  describe('render()', function () {
    test('should render the SuggestedPill', function () {
      var wrapper = getWrapper();
      expect(wrapper).toMatchSnapshot();
    });
    test('button element should call addSuggestedCollab with event when clicked', function () {
      var onAdd = jest.fn();
      var wrapper = getWrapper({
        onAdd: onAdd
      });
      wrapper.find('.suggested-pill-invisible-button').simulate('click', basicEvent);
      expect(onAdd).toHaveBeenCalled();
    });
    test('button element should call addSuggestedCollab with event when keypressed with enter', function () {
      var onAdd = jest.fn();
      var wrapper = getWrapper({
        onAdd: onAdd
      });

      var fakeEvent = _objectSpread({}, basicEvent, {
        key: 'Enter'
      });

      wrapper.find('.suggested-pill-invisible-button').simulate('keyDown', fakeEvent);
      expect(onAdd).toHaveBeenCalled();
    });
    test('button element should call addSuggestedCollab with event when keypressed with a random key', function () {
      var onAdd = jest.fn();
      var wrapper = getWrapper({
        onAdd: onAdd
      });

      var fakeEvent = _objectSpread({}, basicEvent, {
        key: 'foo'
      });

      wrapper.find('.suggested-pill-invisible-button').simulate('keyDown', fakeEvent);
      expect(onAdd).not.toHaveBeenCalled();
    });
  });
  describe('addSuggestedCollab()', function () {
    test('should call preventDefault', function () {
      var wrapper = getWrapper();
      wrapper.find('.suggested-pill-invisible-button').simulate('click', basicEvent);
      expect(preventDefaultStub).toHaveBeenCalled();
    });
    test('should call onSelect with the correct params', function () {
      var email = 'abc@123.com';
      var id = 123;
      var name = 'Foo';
      var onAdd = jest.fn();
      var wrapper = getWrapper({
        email: email,
        id: id,
        name: name,
        onAdd: onAdd
      });
      wrapper.find('.suggested-pill-invisible-button').simulate('click', basicEvent);
      expect(onAdd).toHaveBeenCalledWith({
        email: email,
        id: id,
        name: name,
        text: name,
        type: 'user',
        value: email
      });
    });
  });
});