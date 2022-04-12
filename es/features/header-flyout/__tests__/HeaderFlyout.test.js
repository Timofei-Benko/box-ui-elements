import { shallow } from 'enzyme';
import React from 'react';
import HeaderFlyout from '../HeaderFlyout';
describe('components/core/header/components/HeaderFlyout', function () {
  describe('render()', function () {
    test('should render default component', function () {
      var baseComponent = shallow(React.createElement(HeaderFlyout, {
        onClose: function onClose() {},
        onOpen: function onOpen() {}
      }, React.createElement("span", null, "test")));
      expect(baseComponent).toMatchSnapshot();
    });
    test('should include the header and footer', function () {
      var headerFooterComponent = shallow(React.createElement(HeaderFlyout, {
        className: "foo",
        footer: React.createElement("span", null, "test footer"),
        header: React.createElement("span", null, "test header"),
        onClose: function onClose() {},
        onOpen: function onOpen() {}
      }, React.createElement("span", null, "test")));
      expect(headerFooterComponent).toMatchSnapshot();
    });
    test('should render the flyout button in the appropriate order', function () {
      var componentWithButton = shallow(React.createElement(HeaderFlyout, {
        flyoutButton: React.createElement("button", {
          type: "button"
        }, "click me")
      }, React.createElement("span", null, "content here")));
      expect(componentWithButton).toMatchSnapshot();
    });
  });
});