import React from 'react';
import { shallow } from 'enzyme';
import IconOpenWith from '../../../icons/general/IconOpenWith';
import OpenWithButtonContents from '../OpenWithButtonContents';
describe('elements/content-open-with/MultipleIntegrationsOpenWithButton', function () {
  var getWrapper = function getWrapper(props) {
    return shallow(React.createElement(OpenWithButtonContents, props));
  };

  test('should render contents', function () {
    var wrapper = getWrapper({});
    expect(wrapper).toMatchSnapshot();
  });
  test('should render children if provided', function () {
    var wrapper = getWrapper({
      children: React.createElement(IconOpenWith, null)
    });
    expect(wrapper).toMatchSnapshot();
  });
});