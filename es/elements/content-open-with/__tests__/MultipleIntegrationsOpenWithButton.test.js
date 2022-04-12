import React from 'react';
import { shallow } from 'enzyme';
import MultipleIntegrationsOpenWithButton from '../MultipleIntegrationsOpenWithButton';
describe('elements/content-open-with/MultipleIntegrationsOpenWithButton', function () {
  var getWrapper = function getWrapper(props) {
    return shallow(React.createElement(MultipleIntegrationsOpenWithButton, props));
  };

  test('should render button', function () {
    var wrapper = getWrapper({});
    expect(wrapper).toMatchSnapshot();
  });
  test('should pass down props to the button', function () {
    var wrapper = getWrapper({
      width: 50
    });
    expect(wrapper).toMatchSnapshot();
  });
});