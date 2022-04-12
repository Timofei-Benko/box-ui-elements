function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

import React from 'react';
import ReactDOM from 'react-dom';
import { shallow } from 'enzyme';
import makeDroppable from '../makeDroppable';
jest.mock('react-dom', function () {
  return {
    findDOMNode: jest.fn()
  };
});
describe('elements/common/droppable/makeDroppable', function () {
  var WrappedComponent = function WrappedComponent() {
    return React.createElement("div", null);
  };

  var MakeDroppableComponent = makeDroppable({
    dropValidator: jest.fn(),
    onDrop: jest.fn()
  })(WrappedComponent);
  var addEventListenerMock = jest.fn();
  var testElement = document.createElement('div');
  testElement.addEventListener = addEventListenerMock;

  var getWrapper = function getWrapper() {
    var props = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    return shallow(React.createElement(MakeDroppableComponent, _extends({
      className: "test"
    }, props)));
  };

  beforeEach(function () {
    ReactDOM.findDOMNode.mockImplementation(function () {
      return testElement;
    });
  });
  afterEach(function () {
    jest.resetAllMocks();
  });
  describe('removeEventListeners()', function () {
    test('should remove 4 of event listeners on the element', function () {
      var wrapper = getWrapper();
      var removeEventListener = jest.fn();
      var element = {
        foo: 'bar',
        removeEventListener: removeEventListener
      };
      wrapper.instance().removeEventListeners(element);
      expect(removeEventListener).toBeCalledTimes(4);
    });
  });
  describe('componentDidMount()', function () {
    test('should add 4 event listeners on the test element when the wrapped droppable element is not null for the first time', function () {
      getWrapper();
      expect(addEventListenerMock).toBeCalledTimes(4);
    });
  });
  describe('componentDidUpdate()', function () {
    test('should verify the instance attritute droppableEl is assigned when the wrapped element is not null', function () {
      var wrapper = getWrapper();
      var instance = wrapper.instance();
      instance.componentDidUpdate();
      expect(instance.droppableEl).toEqual(testElement);
    });
    test('should remove all event listeners on previous droppable element and assign the new droppable element to the instance after the wrapped element is changed', function () {
      var wrapper = getWrapper();
      var instance = wrapper.instance();
      var spanElement = document.createElement('span');
      var spanRemoveEventListenerMock = jest.fn();
      spanElement.removeEventListener = spanRemoveEventListenerMock;
      instance.droppableEl = spanElement;
      instance.componentDidUpdate();
      expect(spanRemoveEventListenerMock).toBeCalledTimes(4);
      expect(instance.droppableEl).toEqual(testElement);
    });
  });
});