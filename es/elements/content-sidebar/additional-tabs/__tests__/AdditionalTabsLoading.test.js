import React from 'react';
import { shallow } from 'enzyme';
import AdditionalTabsLoading from '../AdditionalTabsLoading';
describe('elements/content-sidebar/additional-tabs/AdditionalTabs', function () {
  var getWrapper = function getWrapper(props) {
    return shallow(React.createElement(AdditionalTabsLoading, props));
  };

  test('should render the correct loading state', function () {
    var wrapper = getWrapper({});
    expect(wrapper).toMatchSnapshot();
  });
});