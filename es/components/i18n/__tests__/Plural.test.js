import React from 'react';
import { mount } from 'enzyme';
import PropTypes from 'prop-types';
import Plural from '../Plural';
import Composition from '../Composition';

function Link(props) {
  return React.createElement("a", {
    href: props.to
  }, props.children);
}

Link.propTypes = {
  to: PropTypes.string,
  children: PropTypes.any
};
describe('components/i18n/Plural', function () {
  test('should correctly render simple Plural', function () {
    var wrapper = mount(React.createElement(Plural, {
      category: "one"
    }, React.createElement("span", null, "This is the singular")));
    var span = wrapper.find('span');
    var composition = new Composition(span.prop('children'));
    expect(composition.compose()).toEqual('This is the singular');
  });
  test('should correctly compose simple contents', function () {
    var wrapper = mount(React.createElement(Plural, {
      category: "one"
    }, "This is the singular"));
    var composition = new Composition(wrapper.get(0));
    expect(composition.compose()).toEqual('This is the singular');
  });
  test('should correctly compose slightly more complex contents', function () {
    var wrapper = mount(React.createElement(Plural, {
      category: "one"
    }, React.createElement("span", {
      className: "foo"
    }, "This is the singular")));
    var composition = new Composition(wrapper.get(0));
    expect(composition.compose()).toEqual('This is the singular');
  });
  test('should correctly compose much more complex contents', function () {
    var wrapper = mount(React.createElement(Plural, {
      category: "one"
    }, React.createElement("span", {
      className: "foo"
    }, "This ", React.createElement("b", null, "is"), " the ", React.createElement(Link, {
      to: "singular.html"
    }, "singular"), ".")));
    var composition = new Composition(wrapper.get(0));
    expect(composition.compose()).toEqual('This <c0>is</c0> the <c1>singular</c1>.');
  });
});