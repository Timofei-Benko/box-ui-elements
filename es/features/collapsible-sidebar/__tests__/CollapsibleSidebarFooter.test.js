import React from 'react';
import { shallow } from 'enzyme';
import CollapsibleSidebarFooter from '../CollapsibleSidebarFooter';
describe('components/core/collapsible-sidebar/CollapsibleSidebarFooter', function () {
  var getWrapper = function getWrapper() {
    var props = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    return shallow(React.createElement(CollapsibleSidebarFooter, props));
  };

  test('render', function () {
    var footer = getWrapper({
      className: 'foo',
      children: [React.createElement("span", {
        key: "1"
      }, "abc"), React.createElement("span", {
        key: "2"
      }, "def")]
    });
    expect(footer).toMatchSnapshot();
  });
});