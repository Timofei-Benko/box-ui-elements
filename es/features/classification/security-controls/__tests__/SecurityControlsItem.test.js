import React from 'react';
import { FormattedMessage } from 'react-intl';
import SecurityControlsItem from '../SecurityControlsItem';
import Tooltip from '../../../../components/tooltip';
import IconInfo from '../../../../icons/general/IconInfo';
describe('features/classification/security-controls/SecurityControlsItem', function () {
  var wrapper;
  var message;
  var tooltipMessage;

  var getWrapper = function getWrapper() {
    var props = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    return shallow(React.createElement(SecurityControlsItem, props));
  };

  beforeEach(function () {
    message = {
      id: 'id1',
      defaultMessage: 'message'
    };
    tooltipMessage = {
      id: 'id2',
      defaultMessage: 'message2'
    };
    wrapper = getWrapper({
      message: message,
      tooltipMessage: tooltipMessage
    });
  });
  test('should render a SecurityControlsItem with a message and Tooltip', function () {
    expect(wrapper).toMatchSnapshot();
    expect(wrapper.find(Tooltip)).toHaveLength(1);
    expect(wrapper.find(IconInfo)).toHaveLength(1);
  });
  test('should not render Tooltip if tooltipMessage is received as undefined', function () {
    wrapper.setProps({
      tooltipMessage: undefined
    });
    expect(wrapper.find(Tooltip).length).toBe(0);
    expect(wrapper.find(IconInfo).length).toBe(0);
  });
  test('should render message as if it is a valid element and not render FormattedMessage', function () {
    var messageElement = React.createElement("div", null, "Test Element");
    wrapper.setProps({
      message: messageElement
    });
    expect(wrapper).toMatchSnapshot();
    expect(wrapper.find(FormattedMessage).length).toBe(0);
  });
});