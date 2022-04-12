function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react';
import { shallow, mount } from 'enzyme';
import sinon from 'sinon';
import { Link, LinkGroup, LinkButton, LinkPrimaryButton } from '..';
var sandbox = sinon.sandbox.create();
describe('components/link/Link', function () {
  afterEach(function () {
    sandbox.verifyAndRestore();
  });
  test('should correctly render default Link', function () {
    var wrapper = mount(React.createElement(Link, null, "a link"));
    expect(wrapper.find('a').hasClass('link')).toBe(true);
    expect(wrapper.find('a').prop('children')).toEqual('a link');
    expect(wrapper.find('a').prop('href')).toEqual('#');
  });
  test('should correctly render Link with href', function () {
    var wrapper = mount(React.createElement(Link, {
      href: "foo"
    }, "a link"));
    expect(wrapper.find('a').hasClass('link')).toBe(true);
    expect(wrapper.find('a').prop('children')).toEqual('a link');
    expect(wrapper.find('a').prop('href')).toEqual('foo');
  });
  test('should render Link with rel="noopener" when target="_blank"', function () {
    var wrapper = mount(React.createElement(Link, {
      href: "foo",
      target: "_blank"
    }, "a link"));
    var linkWrapper = wrapper.find('a');
    expect(linkWrapper.prop('target')).toEqual('_blank');
    expect(linkWrapper.prop('rel')).toEqual('noopener');
  });
  test('should render Link but not override "rel" when target="_blank"', function () {
    var wrapper = mount(React.createElement(Link, {
      href: "foo",
      rel: "noreferrer",
      target: "_blank"
    }, "a link"));
    var linkWrapper = wrapper.find('a');
    expect(linkWrapper.prop('target')).toEqual('_blank');
    expect(linkWrapper.prop('rel')).toEqual('noreferrer');
  });
  test('should use "component" prop for element if passed', function () {
    var MyLink = function MyLink(_ref) {
      var href = _ref.href,
          children = _ref.children,
          rest = _objectWithoutProperties(_ref, ["href", "children"]);

      return React.createElement("a", _extends({}, rest, {
        href: href
      }), children);
    };

    var wrapper = mount(React.createElement(Link, {
      component: MyLink,
      href: "my-route"
    }, "a link"));
    expect(wrapper.find(MyLink).hasClass('link')).toBe(true);
    expect(wrapper.find(MyLink).prop('children')).toEqual('a link'); // test that unknown props like "to" are passed down:

    expect(wrapper.find('a').prop('href')).toEqual('my-route');
  });
  test('should use "refProp" prop for element if passed', function () {
    var linkRef = jest.fn();
    mount(React.createElement(Link, {
      linkRef: linkRef,
      refProp: "ref",
      href: "my-route"
    }, "a link"));
    expect(linkRef).toHaveBeenCalled();
  });
  test('should correctly render LinkButton', function () {
    var wrapper = mount(React.createElement(LinkButton, null, "a link"));
    expect(wrapper.find('a').hasClass('btn')).toBe(true);
    expect(wrapper.find('a').prop('children')).toEqual('a link');
    expect(wrapper.find('a').prop('href')).toEqual('#');
  });
  test('should correctly render LinkButton with size=large prop', function () {
    var wrapper = mount(React.createElement(LinkButton, {
      size: "large"
    }, "a link"));
    expect(wrapper.find('a').hasClass('btn')).toBe(true);
    expect(wrapper.find('a').hasClass('bdl-btn--large')).toBe(true);
  });
  test('should correctly render LinkButton with proper href', function () {
    var wrapper = mount(React.createElement(LinkButton, {
      href: "foo"
    }, "a link"));
    expect(wrapper.find('a').hasClass('btn')).toBe(true);
    expect(wrapper.find('a').prop('children')).toEqual('a link');
    expect(wrapper.find('a').prop('href')).toEqual('foo');
  });
  test('should correctly render LinkButton with linkRef', function () {
    var linkRef = sandbox.spy();
    mount(React.createElement(LinkButton, {
      href: "foo",
      linkRef: linkRef
    }, "a link"));
    expect(linkRef.calledOnce).toBe(true);
  });
  test('should correctly render LinkPrimaryButton', function () {
    var wrapper = mount(React.createElement(LinkPrimaryButton, null, "a link"));
    expect(wrapper.find('a').hasClass('btn')).toBe(true);
    expect(wrapper.find('a').hasClass('btn-primary')).toBe(true);
    expect(wrapper.find('a').prop('children')).toEqual('a link');
    expect(wrapper.find('a').prop('href')).toEqual('#');
  });
  test('should correctly render LinkPrimaryButton with size=large prop', function () {
    var wrapper = mount(React.createElement(LinkPrimaryButton, {
      size: "large"
    }, "a link"));
    expect(wrapper.find('a').hasClass('btn')).toBe(true);
    expect(wrapper.find('a').hasClass('btn-primary')).toBe(true);
    expect(wrapper.find('a').hasClass('bdl-btn--large')).toBe(true);
  });
  test('should correctly render LinkPrimaryButton with proper href', function () {
    var wrapper = mount(React.createElement(LinkPrimaryButton, {
      href: "foo"
    }, "a link"));
    expect(wrapper.find('a').hasClass('btn')).toBe(true);
    expect(wrapper.find('a').hasClass('btn-primary')).toBe(true);
    expect(wrapper.find('a').prop('children')).toEqual('a link');
    expect(wrapper.find('a').prop('href')).toEqual('foo');
  });
  test('should correctly render link group with title', function () {
    var wrapper = shallow(React.createElement(LinkGroup, {
      title: "lg"
    }, React.createElement("a", null, "first link"), React.createElement("a", null, "second link")));
    expect(wrapper.hasClass('link-group')).toBe(true);
    expect(wrapper.prop('children')[0].props.children).toEqual('lg');
    expect(wrapper.prop('children')[0].props.children.length).toEqual(2);
  });
  test('should correctly render link group without title', function () {
    var wrapper = shallow(React.createElement(LinkGroup, null, React.createElement("a", null, "first link"), React.createElement("a", null, "second link")));
    expect(wrapper.hasClass('link-group')).toBe(true);
    expect(wrapper.prop('children')[0]).toEqual(null);
    expect(wrapper.prop('children')[1].props.children.length).toEqual(2);
  });
});