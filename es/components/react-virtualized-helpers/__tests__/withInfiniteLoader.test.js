function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

import React from 'react';
import { mount, shallow } from 'enzyme';
import sinon from 'sinon';
import withInfiniteLoader from '../withInfiniteLoader';
var sandbox = sinon.sandbox.create();
describe('components/react-virtualized-helpers/withInfiniteLoader', function () {
  var isRowLoadedStub = sandbox.stub();
  var loadMoreRowsStub = sandbox.stub();
  var MIN_BATCH_SIZE = 20;
  var ROW_COUNT = 50;
  var THRESHOLD = 20; // eslint-disable-next-line react/prefer-stateless-function

  var ComponentMock =
  /*#__PURE__*/
  function (_React$Component) {
    _inherits(ComponentMock, _React$Component);

    function ComponentMock() {
      _classCallCheck(this, ComponentMock);

      return _possibleConstructorReturn(this, _getPrototypeOf(ComponentMock).apply(this, arguments));
    }

    _createClass(ComponentMock, [{
      key: "render",
      value: function render() {
        return React.createElement("div", null);
      }
    }]);

    return ComponentMock;
  }(React.Component);

  var InfiniteLoaderComponent = withInfiniteLoader(ComponentMock);
  afterEach(function () {
    sandbox.verifyAndRestore();
  });
  test('should correctly render infinite loader', function () {
    var wrapper = shallow(React.createElement(InfiniteLoaderComponent, {
      infiniteLoaderProps: {
        isRowLoaded: isRowLoadedStub,
        loadMoreRows: loadMoreRowsStub,
        minimumBatchSize: MIN_BATCH_SIZE,
        rowCount: ROW_COUNT,
        threshold: THRESHOLD
      }
    }));
    expect(wrapper.is('InfiniteLoader')).toBe(true);
    expect(wrapper.prop('isRowLoaded')).toEqual(isRowLoadedStub);
    expect(wrapper.prop('loadMoreRows')).toEqual(loadMoreRowsStub);
    expect(wrapper.prop('minimumBatchSize')).toEqual(MIN_BATCH_SIZE);
    expect(wrapper.prop('rowCount')).toEqual(ROW_COUNT);
    expect(wrapper.prop('threshold')).toEqual(THRESHOLD);
  });
  test('should correctly render children', function () {
    var wrapper = mount(React.createElement(InfiniteLoaderComponent, {
      "data-foo": "bar",
      infiniteLoaderProps: {
        isRowLoaded: isRowLoadedStub,
        loadMoreRows: loadMoreRowsStub,
        minimumBatchSize: MIN_BATCH_SIZE,
        rowCount: ROW_COUNT,
        threshold: THRESHOLD
      }
    }));
    var component = wrapper.find(ComponentMock);
    expect(component.length).toBe(1);
    expect(component.prop('data-foo')).toEqual('bar');
  });
});