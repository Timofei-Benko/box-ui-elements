import * as React from 'react';
import CopyrightFooter from '../CopyrightFooter';
var date = new Date(1520379287932);
describe('feature/left-sidebar/CopyrightFooter', function () {
  test('should correctly render with the current year', function () {
    var wrapper = shallow(React.createElement(CopyrightFooter, {
      date: date
    }));
    expect(wrapper).toMatchSnapshot();
  });
  test('should handle arbitrary properties added to link with proper format', function () {
    var cProps = {
      href: '/test',
      'data-resin-target': 'testtarget'
    };
    var wrapper = shallow(React.createElement(CopyrightFooter, {
      date: date,
      linkProps: cProps
    }));
    expect(wrapper).toMatchSnapshot();
  });
  test('should include default link when no href is provided', function () {
    var cProps = {
      'data-resin-target': 'testtarget'
    };
    var wrapper = shallow(React.createElement(CopyrightFooter, {
      date: date,
      linkProps: cProps
    }));
    expect(wrapper).toMatchSnapshot();
  });
});