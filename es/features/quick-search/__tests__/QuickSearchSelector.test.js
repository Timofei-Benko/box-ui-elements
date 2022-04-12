import React from 'react';
import { mount, shallow } from 'enzyme';
import sinon from 'sinon';
import QuickSearchSelector from '../QuickSearchSelector';
describe('features/quick-search/QuickSearchSelector', function () {
  var sandbox = sinon.sandbox.create();
  var onInputStub = sandbox.stub();
  afterEach(function () {
    sandbox.verifyAndRestore();
  });
  test('should render default component', function () {
    var placeholder = 'Search';
    var wrapper = shallow(React.createElement(QuickSearchSelector, {
      onInput: onInputStub,
      placeholder: placeholder
    }));
    var input = wrapper.children();
    expect(wrapper.hasClass('quick-search-selector')).toBe(true);
    expect(input.is('input')).toBe(true);
    expect(input.prop('aria-label')).toEqual(placeholder);
    expect(input.prop('onInput')).toEqual(onInputStub);
    expect(input.prop('placeholder')).toEqual(placeholder);
  });
  test('should render class name on input when specified', function () {
    var className = 'test';
    var wrapper = shallow(React.createElement(QuickSearchSelector, {
      className: className,
      onInput: onInputStub,
      placeholder: "Search"
    }));
    var input = wrapper.find('input');
    expect(input.hasClass('search-input')).toBe(true);
    expect(input.hasClass(className)).toBe(true);
  });
  test('should pass input props when specified', function () {
    var role = 'combobox';
    var wrapper = shallow(React.createElement(QuickSearchSelector, {
      inputProps: {
        role: role
      },
      onInput: onInputStub,
      placeholder: "Search"
    }));
    expect(wrapper.find('input').prop('role')).toEqual(role);
  });
  test('should render loading indicator when isLoading is true', function () {
    var wrapper = shallow(React.createElement(QuickSearchSelector, {
      isLoading: true,
      onInput: onInputStub,
      placeholder: "Search"
    }));
    expect(wrapper.find('LoadingIndicator').length).toBe(1);
  });
  test('should pass through additional props when specified', function () {
    var target = 'searchbar';
    var wrapper = shallow(React.createElement(QuickSearchSelector, {
      "data-resin-target": target,
      onInput: onInputStub,
      placeholder: "Search"
    }));
    expect(wrapper.find('input').prop('data-resin-target')).toEqual(target);
  });
  test('should set input ref when specified', function () {
    var inputEl;

    var inputRef = function inputRef(input) {
      inputEl = input;
    };

    mount(React.createElement(QuickSearchSelector, {
      inputRef: inputRef,
      onInput: onInputStub,
      placeholder: "Search"
    }));
    expect(inputEl.nodeName).toEqual('INPUT');
  });
});