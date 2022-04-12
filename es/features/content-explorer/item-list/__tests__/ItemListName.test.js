function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

import React from 'react';
import PropTypes from 'prop-types';
import sinon from 'sinon';
import ItemListName from '../ItemListName';
describe('features/content-explorer/item-list/ItemListName', function () {
  var sandbox = sinon.sandbox.create();

  var renderComponent = function renderComponent(props) {
    return shallow(React.createElement(ItemListName, _extends({
      name: "item"
    }, props)));
  };

  afterEach(function () {
    sandbox.verifyAndRestore();
  });
  describe('render()', function () {
    test('should render default component', function () {
      var name = 'item';
      var wrapper = renderComponent({
        name: name
      });
      expect(wrapper.hasClass('item-list-name-container')).toBe(true);
      expect(wrapper.find('.item-list-name').text()).toEqual(name);
      expect(wrapper.find('.item-list-name-label').length).toBe(0);
    });
    test('should render a PlainButton if the type is a folder', function () {
      var type = 'folder';
      var wrapper = renderComponent({
        type: type
      });
      expect(wrapper.find('PlainButton.lnk.item-list-name').length).toBe(1);
    });
    test('should render component with label when specified', function () {
      var label = 'label';
      var wrapper = renderComponent({
        label: label
      });
      expect(wrapper.find('.item-list-name-label').text()).toEqual(label);
    });
  });
  describe('onClick', function () {
    test('should call onClick when name is clicked', function () {
      var onClickSpy = sandbox.spy();
      var wrapper = renderComponent({
        type: 'folder',
        onClick: onClickSpy
      });
      wrapper.find('.item-list-name').simulate('click');
      expect(onClickSpy.calledOnce).toBe(true);
    });
  });
  describe('linkRenderer', function () {
    test('should use linkRenderer when specified', function () {
      var itemId = '1';
      var name = 'item';

      var linkRenderer = function linkRenderer(props) {
        return React.createElement("button", {
          type: "button",
          className: "name-".concat(props.itemId)
        });
      };

      linkRenderer.propTypes = {
        itemId: PropTypes.string
      };
      var wrapper = renderComponent({
        itemId: itemId,
        name: name,
        type: 'folder',
        linkRenderer: linkRenderer
      });
      expect(wrapper.find("button.name-".concat(itemId))).toHaveLength(1);
    });
    test('should not pass id to PlainButton', function () {
      var itemId = 'abc'; // Must be a valid html ID for this test. wrapper.find('#1') will crash.

      var name = 'item';
      var wrapper = renderComponent({
        itemId: itemId,
        name: name,
        type: 'folder'
      });
      expect(wrapper.find("#".concat(itemId))).toHaveLength(0);
    });
  });
});