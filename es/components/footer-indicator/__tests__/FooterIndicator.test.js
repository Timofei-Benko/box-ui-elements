import * as React from 'react';
import { shallow } from 'enzyme';
import FooterIndicator from '../FooterIndicator';
describe('feature/footer-indicator/FooterIndicator', function () {
  var getWrapper = function getWrapper() {
    return shallow(React.createElement(FooterIndicator, {
      indicatorText: "abcdefghijklmnopqrstuvwxyz"
    }));
  };

  test('should render a FooterIndicator and a tooltip', function () {
    var wrapper = getWrapper();
    expect(wrapper).toMatchSnapshot();
  });
});