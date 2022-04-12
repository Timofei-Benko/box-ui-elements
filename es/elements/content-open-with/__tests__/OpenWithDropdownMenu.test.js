import React from 'react';
import { shallow } from 'enzyme';
import noop from 'lodash/noop';
import Menu from '../../../components/menu/Menu';
import OpenWithDropdownMenu from '../OpenWithDropdownMenu';
describe('elements/content-open-with/OpenWithDropdownMenu', function () {
  var getWrapper = function getWrapper(props) {
    return shallow(React.createElement(OpenWithDropdownMenu, props));
  };

  test('should render a button and an menu item for each integration', function () {
    var integrations = [{
      appIntegrationId: 1,
      displayName: 'Google Docs'
    }];
    var wrapper = getWrapper({
      integrations: integrations,
      onClick: noop
    });
    expect(wrapper.find(Menu).children()).toHaveLength(1);
    expect(wrapper).toMatchSnapshot();
  });
});