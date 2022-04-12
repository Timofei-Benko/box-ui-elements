import React from 'react';
import noop from 'lodash/noop';
import { shallow } from 'enzyme';
import utils from '../openWithUtils';
import OpenWithDropdownMenuItem from '../OpenWithDropdownMenuItem';
describe('elements/content-open-with/OpenWithDropdownMenuItem', function () {
  var getWrapper = function getWrapper(props) {
    return shallow(React.createElement(OpenWithDropdownMenuItem, props));
  };

  test('should render the description and correct icon', function () {
    var props = {
      integration: {
        displayName: 'Google Docs',
        displayDescription: 'Open With Google Docs',
        appIntegrationId: '1',
        disabledReasons: []
      },
      onClick: noop
    };
    var wrapper = getWrapper(props);
    expect(wrapper).toMatchSnapshot();
  });
  test('should use the default icon when no mapping can be found to an existing icon', function () {
    var props = {
      integration: {
        displayName: 'A new integration',
        displayDescription: 'Open With the new integration',
        appIntegrationId: '22',
        disabledReasons: []
      },
      onClick: noop
    };
    var wrapper = getWrapper(props);
    expect(wrapper).toMatchSnapshot();
  });
  test('should be disabled with a reason if the integration is disabled', function () {
    var props = {
      integration: {
        displayName: 'A new integration',
        displayDescription: 'Open With the new integration',
        isDisabled: true,
        disabledReasons: ['The integration is not currently available'],
        appIntegrationId: '22'
      },
      onClick: noop
    };
    var wrapper = getWrapper(props);
    expect(wrapper).toMatchSnapshot();
  });
  test('should use the default error for a disabled integration if there is no reason', function () {
    var props = {
      integration: {
        displayName: 'A new integration',
        disabledReasons: [],
        displayDescription: 'Open With the new integration',
        isDisabled: true,
        appIntegrationId: '22'
      },
      onClick: noop
    };
    var wrapper = getWrapper(props);
    expect(wrapper).toMatchSnapshot();
  });
  test('should render correctly if the item is disabled because Box Tools is not installed', function () {
    utils.isDisabledBecauseBoxToolsIsNotInstalled = jest.fn().mockReturnValue(true);
    var props = {
      integration: {
        displayName: 'A new integration',
        disabledReasons: [],
        displayDescription: 'Open With the new integration',
        isDisabled: true,
        appIntegrationId: '22'
      },
      onClick: noop
    };
    var wrapper = getWrapper(props);
    expect(wrapper).toMatchSnapshot();
  });
  test('should render correctly if the item is disabled because of an access policy', function () {
    var props = {
      integration: {
        displayName: 'A new integration',
        disabledReasons: ['blocked_by_shield_access_policy'],
        displayDescription: 'Open With the new integration',
        isDisabled: true,
        appIntegrationId: '22'
      },
      onClick: noop
    };
    var wrapper = getWrapper(props);
    expect(wrapper).toMatchSnapshot();
  });
  test('should render correctly if the item is disabled because hidden collaborators', function () {
    var props = {
      integration: {
        displayName: 'A new integration',
        disabledReasons: ['collaborators_hidden'],
        displayDescription: 'Open With the new integration',
        isDisabled: true,
        appIntegrationId: '22'
      },
      onClick: noop
    };
    var wrapper = getWrapper(props);
    expect(wrapper).toMatchSnapshot();
  });
});