import React from 'react';
import { shallow } from 'enzyme';
import IntegrationPortal, * as integrationPortal from '../IntegrationPortal';
describe('elements/content-open-with/IntegrationPortal', function () {
  var getWrapper = function getWrapper(props) {
    return shallow(React.createElement(IntegrationPortal, props));
  };

  describe('copyStyles()', function () {
    var integrationWindow;
    beforeEach(function () {
      var mockDoc = document.implementation.createDocument('http://www.w3.org/1999/xhtml', 'html');
      var body = mockDoc.createElement('body');
      var head = mockDoc.createElement('head');
      mockDoc.documentElement.appendChild(head);
      mockDoc.documentElement.appendChild(body);
      integrationWindow = {
        document: mockDoc
      };
    }); // Since we only have access to one window, we will copy styles into a newly created document.

    it('should copy any valid style sheets over to the integrationWindow', function () {
      var style1 = document.createElement('link');
      style1.href = 'foo.com';
      var style2 = document.createElement('link');
      style2.href = 'bar.com';
      var style3 = document.createElement('link');
      var mockDocumentElement = {
        styleSheets: [style1, style2, style3]
      };
      integrationPortal.copyStyles(mockDocumentElement, integrationWindow);
      var stylesheets = integrationWindow.document.querySelectorAll('link');
      expect(stylesheets.length).toEqual(2);
    });
    it('perform a margin/padding reset on the integration window', function () {
      var mockDocumentElement = {
        styleSheets: []
      };
      integrationPortal.copyStyles(mockDocumentElement, integrationWindow);
      expect(integrationWindow.document.body.style.margin).toEqual('0px');
      expect(integrationWindow.document.body.style.padding).toEqual('0px');
    });
  });
  describe('IntegrationPortal()', function () {
    beforeEach(function () {
      integrationPortal.copyStyles = jest.fn();
    });
    it('should append the portal container div to the integration window', function () {
      getWrapper({
        integrationWindow: window,
        children: document.createElement('div')
      });
      expect(document.querySelector('div')).toBeTruthy();
    });
    it('should portal passed in children to the container element', function () {
      var wrapper = getWrapper({
        integrationWindow: window,
        children: document.createElement('div')
      });
      expect(wrapper).toMatchSnapshot();
    });
  });
});