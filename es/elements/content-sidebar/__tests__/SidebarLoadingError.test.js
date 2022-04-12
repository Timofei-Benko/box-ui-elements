import * as React from 'react';
import { shallow } from 'enzyme';
import SidebarLoadingError from '../SidebarLoadingError';
describe('elements/content-sidebar/SidebarLoading', function () {
  var getWrapper = function getWrapper() {
    var props = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    return shallow(React.createElement(SidebarLoadingError, props));
  };

  test('should render the component', function () {
    var wrapper = getWrapper();
    expect(wrapper).toMatchSnapshot();
  });
});