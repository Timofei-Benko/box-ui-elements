function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

import React from 'react';
import SecurityControlsModal from '../SecurityControlsModal';
import SecurityControlsItem from '../SecurityControlsItem';
describe('features/classification/security-controls/SecurityControlsModal', function () {
  var wrapper;
  var modalItems;

  var getWrapper = function getWrapper(props) {
    return shallow(React.createElement(SecurityControlsModal, _extends({
      closeModal: jest.fn(),
      definition: "classification definition",
      classificationName: "internal",
      isSecurityControlsModalOpen: false,
      itemName: "welcome.pdf",
      modalItems: modalItems
    }, props)));
  };

  beforeEach(function () {
    modalItems = [{
      message: {
        id: 'msg1',
        defaultMessage: 'message1'
      }
    }, {
      message: {
        id: 'msg2',
        defaultMessage: 'message2'
      }
    }];
    wrapper = getWrapper();
  });
  test('should return null if itemName is not provided', function () {
    wrapper = getWrapper({
      itemName: undefined
    });
    expect(wrapper.type()).toBeNull();
  });
  test('should render a SecurityControlsModal when itemName, classificationName, and definition are provided', function () {
    expect(wrapper).toMatchSnapshot();
  });
  test('should render with correct number of security controls items', function () {
    modalItems = [{
      message: {
        id: 'msg1',
        defaultMessage: 'message1'
      }
    }, {
      message: {
        id: 'msg2',
        defaultMessage: 'message2'
      }
    }, {
      message: {
        id: 'msg3',
        defaultMessage: 'message3'
      }
    }];
    wrapper = getWrapper({
      modalItems: modalItems,
      itemName: 'welcome.pdf'
    });
    expect(wrapper.find(SecurityControlsItem)).toHaveLength(3);
  });
  test('should pass tooltipMessage to SecurityControlsItem', function () {
    var tooltipMessage = {
      tooltipMessage: {
        id: 'msg3',
        defaultMessage: 'message3'
      }
    };
    modalItems = [{
      message: {
        id: 'msg1',
        defaultMessage: 'message1'
      }
    }, {
      message: {
        id: 'msg2',
        defaultMessage: 'message2'
      },
      tooltipMessage: tooltipMessage
    }];
    wrapper.setProps({
      modalItems: modalItems
    });
    expect(wrapper.find(SecurityControlsItem).findWhere(function (item) {
      return item.props().message.id === 'msg2';
    }).props().tooltipMessage).toEqual(tooltipMessage);
  });
});