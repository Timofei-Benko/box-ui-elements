import React from 'react';
import { mount, shallow } from 'enzyme';
import sinon from 'sinon';
import QuickSearch from '../QuickSearch';
describe('features/quick-search/QuickSearch', function () {
  var sandbox = sinon.sandbox.create();
  var inputProps = {
    onInput: function onInput() {},
    placeholder: 'Search'
  };
  afterEach(function () {
    sandbox.verifyAndRestore();
  });
  describe('render()', function () {
    test('should render default component', function () {
      var wrapper = shallow(React.createElement(QuickSearch, {
        inputProps: inputProps
      }));
      expect(wrapper.hasClass('quick-search')).toBe(true);
      expect(wrapper.find('SelectorDropdown').length).toBe(1);
      expect(wrapper.find('QuickSearchMessage').length).toBe(0);
    });
    test('should pass props through to selector dropdown', function () {
      var children = React.createElement("li", null);

      var onSelect = function onSelect() {};

      var wrapper = shallow(React.createElement(QuickSearch, {
        inputProps: inputProps,
        onSelect: onSelect
      }, children));
      var selectorDropdown = wrapper.find('SelectorDropdown');
      expect(selectorDropdown.prop('onSelect')).toEqual(onSelect);
      expect(selectorDropdown.contains(children)).toBe(true);
    });
    test('should pass input props through to input', function () {
      var wrapper = mount(React.createElement(QuickSearch, {
        inputProps: inputProps
      }));
      var input = wrapper.find('input');
      expect(input.prop('onInput')).toEqual(inputProps.onInput);
      expect(input.prop('placeholder')).toEqual(inputProps.placeholder);
    });
    test('should render component with class when specified', function () {
      var className = 'test';
      var wrapper = shallow(React.createElement(QuickSearch, {
        className: className,
        inputProps: inputProps
      }));
      expect(wrapper.hasClass('quick-search')).toBe(true);
      expect(wrapper.hasClass(className)).toBe(true);
    });
    test('should render error message when specified', function () {
      var error = 'error';
      var wrapper = shallow(React.createElement(QuickSearch, {
        errorMessage: error,
        inputProps: inputProps
      }));
      var message = wrapper.find('QuickSearchMessage');
      expect(message.length).toBe(1);
      expect(message.contains(error)).toBe(true);
      expect(message.prop('isShown')).toBe(false);
    });
    test('should show error message when specified and showMessage is true', function () {
      var wrapper = shallow(React.createElement(QuickSearch, {
        errorMessage: "error",
        inputProps: inputProps
      }));
      wrapper.setState({
        showMessage: true
      });
      expect(wrapper.find('QuickSearchMessage').prop('isShown')).toBe(true);
    });
    test('should render no items message when specified', function () {
      var noItems = 'no items';
      var wrapper = shallow(React.createElement(QuickSearch, {
        inputProps: inputProps,
        noItemsMessage: noItems
      }));
      var message = wrapper.find('QuickSearchMessage');
      expect(message.length).toBe(1);
      expect(message.contains(noItems)).toBe(true);
      expect(message.prop('isShown')).toBe(false);
    });
    test('should show no items message when specified and showMessage is true', function () {
      var wrapper = shallow(React.createElement(QuickSearch, {
        inputProps: inputProps,
        noItemsMessage: "no items"
      }));
      wrapper.setState({
        showMessage: true
      });
      expect(wrapper.find('QuickSearchMessage').prop('isShown')).toBe(true);
    });
    test('should render divider when specified', function () {
      var children = React.createElement(React.Fragment, null, React.createElement("li", {
        key: "1"
      }), React.createElement("li", {
        key: "2"
      }));
      var dividerIndex = 1;
      var wrapper = shallow(React.createElement(QuickSearch, {
        dividerIndex: dividerIndex,
        inputProps: inputProps
      }, children));
      var selectorDropdown = wrapper.find('SelectorDropdown');
      expect(selectorDropdown.prop('dividerIndex')).toEqual(1);
    });
    test('should render title when specified', function () {
      var children = React.createElement(React.Fragment, null, React.createElement("li", {
        key: "1"
      }), React.createElement("li", {
        key: "2"
      }));
      var title = React.createElement("div", null, "title");
      var wrapper = shallow(React.createElement(QuickSearch, {
        title: title,
        inputProps: inputProps
      }, children));
      var selectorDropdown = wrapper.find('SelectorDropdown');
      expect(selectorDropdown.prop('title')).toEqual(title);
    });
  });
  describe('onFocus', function () {
    test('should set showMessage state to true when focused', function () {
      var wrapper = shallow(React.createElement(QuickSearch, {
        inputProps: inputProps
      }));
      wrapper.simulate('focus');
      expect(wrapper.state('showMessage')).toBe(true);
    });
  });
  describe('onBlur', function () {
    test('should set showMessage state to false when blurred', function () {
      var wrapper = shallow(React.createElement(QuickSearch, {
        inputProps: inputProps
      }));
      wrapper.setState({
        showMessage: true
      });
      wrapper.simulate('blur');
      expect(wrapper.state('showMessage')).toBe(false);
    });
  });
});