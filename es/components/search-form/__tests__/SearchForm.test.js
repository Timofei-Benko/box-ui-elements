import React from 'react';
import { mount, shallow } from 'enzyme';
import sinon from 'sinon';
import SearchForm from '..';
var clock;
var sandbox = sinon.sandbox.create();
var intlShape = {
  formatMessage: function formatMessage(message) {
    return message.id;
  }
};
describe('components/search-form/SearchForm', function () {
  beforeEach(function () {
    clock = sinon.useFakeTimers();
  });
  afterEach(function () {
    sandbox.verifyAndRestore();
    clock.restore();
  });
  test('should correctly render default component', function () {
    var onSubmitSpy = sinon.spy();
    var wrapper = mount(React.createElement(SearchForm, {
      onSubmit: onSubmitSpy,
      placeholder: "search",
      value: "cheese"
    }));
    expect(wrapper.find('form').length === 1).toBeTruthy();
    expect(wrapper.find('input').length === 1).toBeTruthy();
    expect(wrapper.find('button').length === 2).toBeTruthy();
    expect(wrapper.find('form').prop('method')).toEqual('get');
    expect(wrapper.find('.search-button').type()).toEqual('button');
    expect(wrapper.find('input').prop('name')).toEqual('search');
    expect(wrapper.find('form').hasClass('search-form')).toBeTruthy();
    expect(wrapper.find('input').hasClass('search-input')).toBeTruthy();
    expect(wrapper.find('button').at(0).hasClass('search-button')).toBeTruthy();
    expect(wrapper.find('button').at(1).hasClass('clear-button')).toBeTruthy();
  });
  test('should render search-button as a div when onSubmit is not present', function () {
    var wrapper = mount(React.createElement(SearchForm, {
      placeholder: "search",
      value: "cheese"
    }));
    expect(wrapper.find('.search-button').type()).toEqual('div');
  });
  test('should call onsubmit on search icon click', function () {
    var onSubmitSpy = sinon.spy();
    var event = {
      target: {
        elements: [{
          value: 'cheese'
        }]
      }
    };
    var wrapper = mount(React.createElement(SearchForm, {
      onSubmit: onSubmitSpy,
      placeholder: "search",
      value: "cheese"
    }));
    var form = wrapper.find('form');
    form.simulate('submit', event);
    sinon.assert.calledWithMatch(onSubmitSpy, 'cheese', event);
  });
  test('should call onchange on form change', function () {
    var onChangeSpy = sinon.spy();
    var wrapper = mount(React.createElement(SearchForm, {
      onChange: onChangeSpy,
      placeholder: "search",
      value: "cheese"
    }));
    var form = wrapper.find('form');
    form.simulate('change');
    sinon.assert.called(onChangeSpy);
  });
  test('should set the form method to post', function () {
    var wrapper = mount(React.createElement(SearchForm, {
      method: "post",
      placeholder: "search"
    }));
    var form = wrapper.find('form');
    expect(form.prop('method')).toEqual('post');
  });
  test('should set the name to query in the input by default', function () {
    var wrapper = mount(React.createElement(SearchForm, {
      name: "query",
      placeholder: "search"
    }));
    var input = wrapper.find('input');
    expect(input.prop('name')).toEqual('query');
  });
  test('should generate a hidden input field with correct name and value', function () {
    var queryParams = {
      token: '123',
      number: 123
    };
    var wrapper = mount(React.createElement(SearchForm, {
      name: "query",
      placeholder: "search",
      queryParams: queryParams
    }));
    var inputs = wrapper.find('input');
    expect(inputs.at(0).prop('name')).toEqual('query');
    expect(inputs.at(1).prop('name')).toEqual('token');
    expect(inputs.at(1).prop('value')).toEqual('123');
    expect(inputs.at(1).prop('type')).toEqual('hidden');
    expect(inputs.at(2).prop('name')).toEqual('number');
    expect(inputs.at(2).prop('value')).toEqual(123);
    expect(inputs.at(2).prop('type')).toEqual('hidden');
  });
  test('should set the onClearHandler to the clear button onClick prop', function () {
    var wrapper = shallow(React.createElement(SearchForm, {
      intl: intlShape
    })).shallow();
    var lodableComponent = wrapper.find('LoadableSearchActions').shallow();
    var searchActions = lodableComponent.shallow();

    var _wrapper$instance = wrapper.instance(),
        onClearHandler = _wrapper$instance.onClearHandler;

    expect(searchActions.find('.clear-button').prop('onClick')).toEqual(onClearHandler);
  });
  describe('componentDidUpdate()', function () {
    test('should set isEmpty state to true when controlled input becomes empty', function () {
      var wrapper = shallow(React.createElement(SearchForm, {
        intl: intlShape,
        value: "test"
      })).shallow();
      wrapper.setState({
        isEmpty: false
      });
      wrapper.setProps({
        value: ''
      });
      expect(wrapper.state('isEmpty')).toBe(true);
    });
  });
  describe('onClearHandler()', function () {
    test('should trigger onChange with empty string', function () {
      var onChange = sandbox.spy();
      var wrapper = shallow(React.createElement(SearchForm, {
        intl: intlShape,
        onChange: onChange
      })).shallow();
      wrapper.instance().searchInput = {
        value: 'abc'
      };
      wrapper.instance().onClearHandler();
      sinon.assert.calledWith(onChange, '');
    });
    test('should set isEmpty state to true', function () {
      var wrapper = shallow(React.createElement(SearchForm, {
        intl: intlShape,
        name: "query"
      })).shallow();
      var instance = wrapper.instance();
      instance.setState({
        isEmpty: false
      });
      instance.searchInput = {
        value: 'abc'
      };
      instance.onClearHandler();
      expect(wrapper.state('isEmpty')).toBe(true);
    });
    test('should stop propagation if stopDefaultEvent param is passed', function () {
      var wrapper = shallow(React.createElement(SearchForm, {
        intl: intlShape,
        name: "query",
        shouldPreventClearEventPropagation: true
      })).shallow();
      var instance = wrapper.instance();
      var stopPropagationStub = sandbox.stub();
      instance.setState({
        isEmpty: false
      });
      instance.searchInput = {
        value: 'abc'
      };
      instance.onClearHandler({
        stopPropagation: stopPropagationStub
      });
      expect(stopPropagationStub.calledOnce).toBe(true);
    });
  });
  describe('onChangeHandler()', function () {
    [{
      value: '  ',
      isEmpty: true
    }, {
      value: '',
      isEmpty: true
    }, {
      value: '  1  ',
      isEmpty: false
    }, {
      value: '  1  ',
      isEmpty: false
    }, {
      value: '123',
      isEmpty: false
    }, {
      value: null,
      isEmpty: true
    }].forEach(function (_ref) {
      var value = _ref.value,
          isEmpty = _ref.isEmpty;
      test('should set isEmpty state correctly', function () {
        var wrapper = shallow(React.createElement(SearchForm, {
          intl: intlShape,
          name: "query"
        })).shallow();
        var instance = wrapper.instance();
        instance.onChangeHandler({
          target: {
            value: value
          }
        });
        expect(wrapper.state('isEmpty')).toEqual(isEmpty);
      });
    });
  });
  test('should render loading indicator and not search/clear buttons when isLoading is true', function () {
    var wrapper = mount(React.createElement(SearchForm, {
      isLoading: true,
      placeholder: "search"
    }));
    expect(wrapper.find('.action-button').length).toEqual(0);
    expect(wrapper.find('.search-form-loading-indicator').hostNodes().length).toEqual(1);
  });
  test('should call getSearchInput prop when it exists', function () {
    var getSearchInputSpy = sandbox.spy();

    var searchInputMock = function searchInputMock() {
      return React.createElement("div", {
        className: "search-input"
      });
    };

    var wrapper = shallow(React.createElement(SearchForm, {
      getSearchInput: getSearchInputSpy
    })).shallow();
    wrapper.instance().setInputRef(searchInputMock);
    expect(getSearchInputSpy.calledOnce).toBe(true);
  });
  test('should not pass getSearchInput prop down to <input> element', function () {
    var wrapper = mount(React.createElement(SearchForm, {
      getSearchInput: sandbox.stub()
    }));
    var input = wrapper.find('input');
    expect(input.props().getSearchInput).toBeFalsy();
  });
});