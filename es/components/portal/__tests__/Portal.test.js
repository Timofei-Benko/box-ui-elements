function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

import * as React from 'react';
import { mount } from 'enzyme';
import Portal from '../Portal';
describe('components/portal/Portal', function () {
  var attachTo;
  var wrapper = null;
  /**
   * Helper method to mount things to the correct DOM element
   * this makes it easier to clean up after ourselves after each test.
   */

  var mountToBody = function mountToBody(component, options) {
    wrapper = mount(component, _objectSpread({
      attachTo: attachTo
    }, options));
  };

  beforeEach(function () {
    // Set up a place to mount
    attachTo = document.createElement('div');
    attachTo.setAttribute('data-mounting-point', '');
    document.body.appendChild(attachTo);
  });
  afterEach(function () {
    // Unmount and remove the mounting point after each test
    if (wrapper && wrapper.exists()) {
      wrapper.unmount();
      wrapper = null;
    }

    document.body.removeChild(attachTo);
  });
  test('should render the portal as a child to body', function () {
    var _document$querySelect;

    mountToBody(React.createElement(Portal, null));
    var portalParentElement = (_document$querySelect = document.querySelector('[data-portal]')) === null || _document$querySelect === void 0 ? void 0 : _document$querySelect.parentElement;
    expect(portalParentElement && portalParentElement.tagName.toLowerCase()).toEqual('body');
  });
  test('should render the portal children as children node', function () {
    mountToBody(React.createElement(Portal, null, React.createElement("div", {
      id: "foo"
    }, "bar")));
    var portal = document.querySelector('[data-portal]');
    var child = portal ? portal.querySelector('#foo') : null;
    expect(child).toBeTruthy();
    expect(attachTo && attachTo.textContent).toEqual('');
  });
  test('should pass Portal props as props to the React Root div', function () {
    mountToBody(React.createElement(Portal, {
      style: {
        color: 'blue'
      }
    }));
    var portal = document.querySelector('[data-portal]');
    var reactRoot = portal ? portal.querySelector('div') : null;
    expect(reactRoot && reactRoot.style.color).toEqual('blue');
  });
  test('should propagate parent context to the children', function () {
    /**
     * Test class with context
     */
    var TestPortalContext = React.createContext({
      name: 'fn-2187'
    });

    var TestPortal =
    /*#__PURE__*/
    function (_React$PureComponent) {
      _inherits(TestPortal, _React$PureComponent);

      function TestPortal() {
        _classCallCheck(this, TestPortal);

        return _possibleConstructorReturn(this, _getPrototypeOf(TestPortal).apply(this, arguments));
      }

      _createClass(TestPortal, [{
        key: "render",
        value: function render() {
          return React.createElement(Portal, this.props);
        }
      }]);

      return TestPortal;
    }(React.PureComponent);

    _defineProperty(TestPortal, "contextType", TestPortalContext);

    TestPortal.contextType = TestPortalContext;

    var ChildComponent = function ChildComponent(context) {
      expect(context.name).toEqual('fn-2187');
      return React.createElement("div", {
        id: "sanity"
      });
    };

    mountToBody(React.createElement(TestPortal, null, React.createElement(TestPortalContext.Consumer, null, function (context) {
      return React.createElement(ChildComponent, context);
    })));
    expect(document.querySelector('#sanity')).toBeTruthy();
  });
  test('should remove the portal from the DOM when unmounting', function () {
    mountToBody(React.createElement(Portal, null));
    expect(document.querySelector('[data-portal]')).toBeTruthy();

    if (wrapper) {
      wrapper.unmount();
    }

    expect(document.querySelector('[data-portal]')).toBeFalsy();
  });
  test('should update portaled DOM when updating React props', function () {
    mountToBody(React.createElement(Portal, null, "wee"));

    if (wrapper) {
      wrapper.setProps({
        children: 'boo'
      });
    }

    var portal = document.querySelector('[data-portal]');
    expect(portal && portal.textContent).toEqual('boo');
  });
  test('should used a passed in document if provided', function () {
    var newDoc = document.implementation.createHTMLDocument('doc');
    mountToBody(React.createElement(Portal, {
      container: newDoc.body
    }, "text"));
    var portal = newDoc.querySelector('[data-portal]');
    expect(portal && portal.ownerDocument && portal.ownerDocument.title).toEqual('doc');
  });
});