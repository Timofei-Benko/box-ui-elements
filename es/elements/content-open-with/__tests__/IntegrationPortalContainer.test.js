import React from 'react';
import { shallow } from 'enzyme';
import IntegrationPortalContainer from '../IntegrationPortalContainer';
describe('elements/content-open-with/IntegrationPortalContainer', function () {
  var getWrapper = function getWrapper(props) {
    return shallow(React.createElement(IntegrationPortalContainer, props));
  };

  it('should render an error mask if an error occurs', function () {
    var wrapper = getWrapper({
      hasError: true,
      integrationWindow: 'window'
    });
    expect(wrapper).toMatchSnapshot();
  });
  it('should render a loading indicator', function () {
    var wrapper = getWrapper({
      hasError: false,
      integrationWindow: 'window'
    });
    expect(wrapper).toMatchSnapshot();
  });
});