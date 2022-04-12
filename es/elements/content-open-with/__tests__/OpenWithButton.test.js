import React from 'react';
import noop from 'lodash/noop';
import { shallow } from 'enzyme';
import messages from '../../common/messages';
import OpenWithButton, { getTooltip } from '../OpenWithButton';
import utils from '../openWithUtils';
describe('elements/content-open-with/OpenWithButton', function () {
  var getWrapper = function getWrapper(props) {
    return shallow(React.createElement(OpenWithButton, props));
  };

  describe('getTooltip()', function () {
    test('should return nothing if the button is loading', function () {
      var result = getTooltip(null, true, null, null);
      expect(result).toBe(null);
    });
    test('should use the first disabled reason if one is provided', function () {
      var disabledReasons = ['bad integration', 'foo'];
      var result = getTooltip(null, false, 'error', disabledReasons);
      expect(result).toEqual(disabledReasons[0]);
    });
    test('should use the default error message if there is an error', function () {
      var result = getTooltip(null, false, 'error', []);
      expect(result.props.defaultMessage).toEqual(messages.errorOpenWithDescription.defaultMessage);
    });
    test('should return the display description if provided', function () {
      var description = 'tooltip description';
      var result = getTooltip(description, false, null, []);
      expect(result).toBe(description);
    });
    test('should use the default empty message if there is nothing else to display', function () {
      var result = getTooltip(null, false, null, []);
      expect(result.props.defaultMessage).toEqual(messages.emptyOpenWithDescription.defaultMessage);
    });
  });
  test('should render as disabled if the integration is disabled', function () {
    var wrapper = getWrapper({
      displayIntegration: {
        isDisabled: true,
        displayName: 'Google Docs'
      },
      onClick: noop
    });
    expect(wrapper).toMatchSnapshot();
  });
  test('should render as disabled if there is no display integration', function () {
    var wrapper = getWrapper({
      displayIntegration: {
        isDisabled: false,
        displayName: null
      },
      onClick: noop
    });
    expect(wrapper).toMatchSnapshot();
  });
  test('should render with the correct icon', function () {
    var wrapper = getWrapper({
      displayIntegration: {
        isDisabled: false,
        displayName: 'Google Docs'
      },
      onClick: noop
    });
    expect(wrapper).toMatchSnapshot();
  });
  test('should force the tooltip open with a close button if Box Tools is not installed', function () {
    utils.isDisabledBecauseBoxToolsIsNotInstalled = jest.fn().mockReturnValue(true);
    var wrapper = getWrapper({
      displayIntegration: {
        isDisabled: true,
        disabledReasons: ['Box Tools is not installed'],
        displayName: 'Open'
      },
      onClick: noop
    });
    expect(wrapper).toMatchSnapshot();
  });
});