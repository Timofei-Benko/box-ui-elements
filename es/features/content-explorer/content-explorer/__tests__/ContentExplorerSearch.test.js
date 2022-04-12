function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

import React from 'react';
import sinon from 'sinon';
import { ContentExplorerSearchBase as ContentExplorerSearch } from '../ContentExplorerSearch';
describe('features/content-explorer/content-explorer/ContentExplorerSearch', function () {
  var sandbox = sinon.sandbox.create();

  var renderComponent = function renderComponent(props) {
    return shallow(React.createElement(ContentExplorerSearch, _extends({
      intl: {
        formatMessage: function formatMessage() {}
      }
    }, props)));
  };

  afterEach(function () {
    sandbox.verifyAndRestore();
  });
  describe('render()', function () {
    test('should render the default component', function () {
      var wrapper = renderComponent();
      var instance = wrapper.instance();
      expect(wrapper.is('SearchForm')).toBe(true);
      expect(wrapper.prop('onChange')).toEqual(instance.handleChange);
      expect(wrapper.prop('onSubmit')).toEqual(instance.handleSubmit);
    });
    test('should render the input when specified', function () {
      var inputValue = 'i am input';
      var wrapper = renderComponent({
        inputValue: inputValue
      });
      expect(wrapper.prop('value')).toEqual(inputValue);
    });
    test('should set custom search input props when specified', function () {
      var wrapper = renderComponent({
        searchInputProps: {
          'data-resin-target': 'searchbar'
        }
      });
      expect(wrapper.prop('data-resin-target')).toEqual('searchbar');
    });
  });
  describe('onSubmit', function () {
    test('should call onSubmit when submitted', function () {
      var onSubmitSpy = sandbox.spy();
      var wrapper = renderComponent({
        onSubmit: onSubmitSpy
      });
      var event = {
        preventDefault: sandbox.mock()
      };
      wrapper.instance().handleSubmit('test', event);
      expect(onSubmitSpy.calledOnce).toBe(true);
    });
  });
  describe('onChange', function () {
    test('should call onInput when input changes', function () {
      var input = 'i am input';
      var onInputSpy = sandbox.spy();
      var wrapper = renderComponent({
        onInput: onInputSpy
      });
      wrapper.instance().handleChange(input);
      expect(onInputSpy.calledOnce).toBe(true);
      expect(onInputSpy.calledWithExactly(input)).toBe(true);
    });
    test('should call onClearButtonClick when value is changed to empty string', function () {
      var onClearButtonClickSpy = sandbox.spy();
      var wrapper = renderComponent({
        onClearButtonClick: onClearButtonClickSpy
      });
      wrapper.instance().handleChange('');
      expect(onClearButtonClickSpy.calledOnce).toBe(true);
    });
  });
});