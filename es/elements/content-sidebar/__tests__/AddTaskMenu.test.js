import React from 'react';
import { shallow } from 'enzyme';
import AddTaskMenu from '../AddTaskMenu';
describe('elements/content-sidebar/AddTaskMenu', function () {
  var getWrapper = function getWrapper(props) {
    return shallow(React.createElement(AddTaskMenu, props));
  };

  describe('render', function () {
    test('should render a default component with default props', function () {
      var wrapper = getWrapper();
      expect(wrapper).toMatchSnapshot();
    });
  });
});