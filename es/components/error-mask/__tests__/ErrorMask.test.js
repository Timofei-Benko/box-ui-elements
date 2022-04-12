import React from 'react';
import { shallow } from 'enzyme';
import ErrorMask from '..';
var component;
describe('components/error-mask/ErrorMask', function () {
  beforeEach(function () {
    component = shallow(React.createElement(ErrorMask, {
      errorHeader: "Header Womp",
      errorSubHeader: "SubHeader Womp"
    }));
  });
  test('should render an error mask with the sad cloud', function () {
    expect(component.find('.sad-cloud').find('SadCloud')).toBeTruthy();
  });
  test('should render the header and subheader', function () {
    expect(component.find('h4').text()).toEqual('Header Womp');
    expect(component.find('h5').text()).toEqual('SubHeader Womp');
  });
});