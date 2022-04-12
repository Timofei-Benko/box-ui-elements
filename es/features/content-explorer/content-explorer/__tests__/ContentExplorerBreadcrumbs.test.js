function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

import React from 'react';
import sinon from 'sinon';
import { ContentExplorerBreadcrumbsBase as ContentExplorerBreadcrumbs } from '../ContentExplorerBreadcrumbs';
describe('features/content-explorer/content-explorer/ContentExplorerBreadcrumbs', function () {
  var sandbox = sinon.sandbox.create();

  var renderComponent = function renderComponent(props) {
    return shallow(React.createElement(ContentExplorerBreadcrumbs, _extends({
      foldersPath: [],
      intl: {
        formatMessage: function formatMessage() {
          return 'message';
        }
      }
    }, props)));
  };

  afterEach(function () {
    sandbox.verifyAndRestore();
  });
  describe('render()', function () {
    test('should render correct breadcrumbs', function () {
      var foldersPath = [{
        id: '0',
        name: 'folder1'
      }, {
        id: '1',
        name: 'folder2'
      }, {
        id: '2',
        name: 'folder3'
      }];
      var wrapper = renderComponent({
        foldersPath: foldersPath
      });
      expect(wrapper.find('.content-explorer-breadcrumbs-container').length).toBe(1);
      expect(wrapper.find('.content-explorer-breadcrumbs-up-button').length).toBe(1);
      expect(wrapper.find('Breadcrumb').length).toBe(1);
      expect(wrapper.find('IconAllFiles').length).toBe(1);
      var breadcrumbs = wrapper.find('.lnk');
      expect(breadcrumbs.length).toBe(foldersPath.length);
      breadcrumbs.forEach(function (breadcrumb, i) {
        expect(breadcrumb.prop('title')).toEqual(foldersPath[i].name);
        expect(breadcrumb.find('span').text()).toEqual(foldersPath[i].name);
      });
    });
    test('should render disabled up button when isUpButtonDisabled is true', function () {
      var wrapper = renderComponent({
        isUpButtonDisabled: true
      });
      expect(wrapper.find('.content-explorer-breadcrumbs-up-button').prop('isDisabled')).toBe(true);
    });
  });
  describe('onUpButtonClick', function () {
    test('should call onUpButtonClick when up button is clicked', function () {
      var onUpButtonClickSpy = sandbox.spy();
      var wrapper = renderComponent({
        onUpButtonClick: onUpButtonClickSpy
      });
      wrapper.find('.content-explorer-breadcrumbs-up-button').simulate('click');
      expect(onUpButtonClickSpy.calledOnce).toBe(true);
    });
  });
  describe('onBreadcrumbClick', function () {
    test('should call onBreadcrumbClick when breadcrumb is clicked', function () {
      var breadcrumbIndex = 1;
      var event = {};
      var foldersPath = [{
        id: '0',
        name: 'folder1'
      }, {
        id: '1',
        name: 'folder2'
      }, {
        id: '2',
        name: 'folder3'
      }];
      var onBreadcrumbClickSpy = sandbox.spy();
      var wrapper = renderComponent({
        foldersPath: foldersPath,
        onBreadcrumbClick: onBreadcrumbClickSpy
      });
      wrapper.find('.lnk').at(breadcrumbIndex).simulate('click', event);
      expect(onBreadcrumbClickSpy.calledOnce).toBe(true);
      expect(onBreadcrumbClickSpy.calledWithExactly(breadcrumbIndex, event)).toBe(true);
    });
  });
});