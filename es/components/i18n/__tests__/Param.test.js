import React from 'react';
import { render } from 'enzyme';
import Param from '../Param'; // tests the Param component by itself... Normally this should appear
// inside of a FormattedCompMessage, as it wouldn't be too useful
// outside of it.

describe('components/i18n/Param', function () {
  test('should correctly render its string argument', function () {
    var wrapper = render(React.createElement("span", null, React.createElement(Param, {
      value: "asdf",
      description: "foo"
    })));
    expect(wrapper.text()).toEqual('asdf');
  });
  test('should correctly render its string argument with variables', function () {
    var name = 'asdf';
    var wrapper = render(React.createElement("span", null, React.createElement(Param, {
      value: name,
      description: "foo"
    })));
    expect(wrapper.text()).toEqual('asdf');
  });
  test('should correctly render its numeric argument', function () {
    var wrapper = render(React.createElement("span", null, React.createElement(Param, {
      value: 3,
      description: "foo"
    })));
    expect(wrapper.text()).toEqual('3');
  });
  test('should correctly render an undefined argument', function () {
    var wrapper = render(React.createElement("span", null, React.createElement(Param, {
      value: undefined,
      description: "foo"
    })));
    expect(wrapper.text()).toEqual('');
  });
  test('should correctly render a null argument', function () {
    var wrapper = render(React.createElement("span", null, React.createElement(Param, {
      value: null,
      description: "foo"
    })));
    expect(wrapper.text()).toEqual('');
  });
  test('should correctly render a jsx argument', function () {
    var tmp = React.createElement("b", null, "foo!");
    var wrapper = render(React.createElement("span", null, React.createElement(Param, {
      value: tmp,
      description: "foo"
    })));
    expect(wrapper.html()).toEqual('<b>foo!</b>');
  });
  test('should correctly render a functional argument', function () {
    var f = function f() {
      return 'asdf';
    };

    var wrapper = render(React.createElement("span", null, React.createElement(Param, {
      value: f,
      description: "foo"
    })));
    expect(wrapper.text()).toEqual('asdf');
  });
});