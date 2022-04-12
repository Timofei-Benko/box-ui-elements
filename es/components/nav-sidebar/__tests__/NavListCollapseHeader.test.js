import React from 'react';
import NavListCollapseHeader from '../NavListCollapseHeader';
describe('components/nav-sidebar/NavListCollapseHeader', function () {
  test('should render collapsible header', function () {
    var heading = 'text heading';

    var handler = function handler() {
      return 0;
    };

    var header = shallow(React.createElement(NavListCollapseHeader, {
      onToggleCollapse: handler
    }, heading));
    expect(header).toMatchSnapshot();
  });
  test('should properly render any container properties', function () {
    var heading = 'heading w/ containerProps';
    var cp = {
      a: 1,
      'snake-case': 2
    };

    var handler = function handler() {
      return 0;
    };

    var header = shallow(React.createElement(NavListCollapseHeader, {
      containerProps: cp,
      onToggleCollapse: handler
    }, heading));
    expect(header).toMatchSnapshot();
  });
});