import React from 'react';
import { shallow } from 'enzyme';
import IconReportAbuse from '../IconReportAbuse';
describe('icons/general/IconReportAbuse', function () {
  var getWrapper = function getWrapper() {
    var props = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    return shallow(React.createElement(IconReportAbuse, props));
  };

  test('should correctly render default icon', function () {
    var wrapper = getWrapper();
    expect(wrapper).toMatchSnapshot();
  });
  test('should correctly render icon with specified props', function () {
    var wrapper = getWrapper({
      className: 'test',
      height: 100,
      title: 'title',
      width: 200
    });
    expect(wrapper).toMatchSnapshot();
  });
});