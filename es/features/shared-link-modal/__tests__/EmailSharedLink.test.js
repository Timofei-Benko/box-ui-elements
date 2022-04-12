function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

import React from 'react';
import sinon from 'sinon';
import { EmailSharedLinkBase as EmailSharedLink } from '../EmailSharedLink';
var sandbox = sinon.sandbox.create();
var contacts = [{
  id: 0,
  name: 'Jackie',
  email: 'j@example.com',
  type: 'user'
}, {
  id: 1,
  name: 'Jeff',
  email: 'jt@example.com',
  type: 'user'
}, {
  id: 2,
  name: 'David',
  email: 'dt@example.com',
  type: 'user'
}, {
  id: 3,
  name: 'Yang',
  email: 'yz@example.com',
  type: 'user'
}, {
  id: 4,
  name: 'Yong',
  email: 'ysu@example.com',
  type: 'user'
}, {
  id: 5,
  name: 'Will',
  email: 'wy@example.com',
  type: 'user'
}, {
  id: 6,
  name: 'Dave',
  email: 'd@example.com',
  type: 'user'
}, {
  id: 7,
  name: 'Ke',
  email: 'k@example.com',
  type: 'user'
}, {
  id: 8,
  name: 'Wenbo',
  email: 'w@example.com',
  type: 'user'
}, {
  id: 9,
  name: 'Engineers',
  type: 'group'
}, {
  id: 10,
  name: 'Junior Ballers',
  type: 'group'
}];
describe('features/shared-link-modal/EmailSharedLink', function () {
  var getWrapper = function getWrapper() {
    var props = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    return shallow(React.createElement(EmailSharedLink, _extends({
      contacts: contacts,
      getContacts: sandbox.stub(),
      intl: {
        formatMessage: sandbox.stub()
      },
      itemType: "folder",
      onExpand: sandbox.stub(),
      onRequestClose: sandbox.stub(),
      sendEmail: sandbox.stub(),
      senderName: "me"
    }, props)));
  };

  afterEach(function () {
    sandbox.verifyAndRestore();
  });
  describe('constructor()', function () {
    test('should set state.emailMessage to props.defaultEmailMessage', function () {
      var wrapper = getWrapper({
        defaultEmailMessage: 'hello'
      });
      expect(wrapper.state('emailMessage')).toEqual('hello');
    });
  });
  describe('getSelectorOptions()', function () {
    test('should correctly filter options that have yet to be selected by name and email', function () {
      var selectedOptions = [{
        email: 'j@example.com',
        id: 0,
        text: 'Jackie',
        type: 'user',
        value: 'j@example.com'
      }, {
        email: 'd@example.com',
        id: 6,
        text: 'Dave',
        type: 'user',
        value: 'd@example.com'
      }];
      var wrapper = getWrapper({
        allowCustomPills: true
      });
      wrapper.setState({
        pillSelectorInputValue: 'j',
        selectedOptions: selectedOptions
      });
      var result = wrapper.instance().getSelectorOptions();
      expect(result.length).toEqual(9); // 11 - 2 = 9
    });
  });
  describe('handlePillSelectorInput()', function () {
    test('should call getContacts prop', function () {
      var wrapper = getWrapper({
        getContacts: sandbox.mock().withExactArgs('j')
      });
      wrapper.instance().handlePillSelectorInput('j');
    });
    test('should reset pillSelectorError and update pillSelectorInputValue state', function () {
      var wrapper = getWrapper();
      wrapper.setState({
        pillSelectorError: 'error',
        pillSelectorInputValue: 'jjjjjjj'
      });
      wrapper.instance().handlePillSelectorInput('j');
      expect(wrapper.state('pillSelectorError')).toEqual('');
      expect(wrapper.state('pillSelectorInputValue')).toEqual('j');
    });
  });
  describe('handlePillSelect()', function () {
    test('should update selectedOptions state with newly selected options', function () {
      var selectedOptions = [{
        id: 0,
        text: 'Jackie',
        type: 'user',
        value: 'j@example.com'
      }, {
        id: 1,
        text: 'Jeff',
        type: 'user',
        value: 'jt@example.com'
      }, {
        id: 10,
        text: 'Junior Ballers',
        type: 'group',
        value: 10
      }];
      var newOptions = [{
        id: 9,
        text: 'Engineers',
        type: 'group',
        value: 9
      }];
      var wrapper = getWrapper();
      wrapper.setState({
        selectedOptions: selectedOptions
      });
      wrapper.instance().handlePillSelect(newOptions);
      expect(wrapper.state('selectedOptions')).toEqual([].concat(selectedOptions, newOptions));
    });
  });
  describe('handlePillRemove()', function () {
    test('should remove given index from selectedOptions state', function () {
      var selectedOptions = [{
        id: 0,
        text: 'Jackie',
        type: 'user',
        value: 'j@example.com'
      }, {
        id: 1,
        text: 'Jeff',
        type: 'user',
        value: 'jt@example.com'
      }, {
        id: 10,
        text: 'Junior Ballers',
        type: 'group',
        value: 10
      }];
      var wrapper = getWrapper();
      wrapper.setState({
        selectedOptions: selectedOptions
      });
      wrapper.instance().handlePillRemove({}, 1);
      expect(wrapper.state('selectedOptions')).toEqual([{
        id: 0,
        text: 'Jackie',
        type: 'user',
        value: 'j@example.com'
      }, {
        id: 10,
        text: 'Junior Ballers',
        type: 'group',
        value: 10
      }]);
    });
  });
  describe('validateForError()', function () {
    test('should set an error if text is not a valid email', function () {
      var error = 'oops';
      var wrapper = getWrapper({
        intl: {
          formatMessage: sandbox.stub().returns(error)
        }
      });
      wrapper.setState({
        pillSelectorError: ''
      });
      wrapper.instance().validateForError('invalidEmail@box');
      expect(wrapper.state('pillSelectorError')).toEqual(error);
    });
    test('should not set an error if text is a valid email', function () {
      var error = 'oops';
      var wrapper = getWrapper({
        intl: {
          formatMessage: sandbox.stub().returns(error)
        }
      });
      wrapper.setState({
        pillSelectorError: ''
      });
      wrapper.instance().validateForError('validEmail@example.com');
      expect(wrapper.state('pillSelectorError')).toEqual('');
    });
  });
  describe('validator()', function () {
    test('should return false if text is not a valid email', function () {
      var wrapper = getWrapper();
      expect(wrapper.instance().validator('invalidEmail@box')).toBe(false);
    });
    test('should return true if text is a valid email', function () {
      var wrapper = getWrapper();
      expect(wrapper.instance().validator('validEmail@example.com')).toBe(true);
    });
  });
  describe('sendEmail()', function () {
    test('should prevent default and call sendEmail when form state is valid', function () {
      var selectedOptions = [{
        id: 0,
        text: 'Jackie',
        type: 'user',
        value: 'j@example.com'
      }, {
        id: 1,
        text: 'Jeff',
        type: 'user',
        value: 'jt@example.com'
      }];
      var emailMessage = 'message';
      var expectedResult = {
        emails: ['j@example.com', 'jt@example.com'],
        emailMessage: emailMessage
      };
      var wrapper = getWrapper({
        sendEmail: sandbox.mock().withArgs(expectedResult)
      });
      wrapper.setState({
        selectedOptions: selectedOptions,
        emailMessage: emailMessage
      });
      wrapper.instance().sendEmail({
        preventDefault: sandbox.mock()
      });
    });
    test('should not call sendEmail when there is an error in the pill selector', function () {
      var wrapper = getWrapper({
        sendEmail: sandbox.mock().never()
      });
      wrapper.setState({
        pillSelectorError: 'error!'
      });
      wrapper.instance().sendEmail({
        preventDefault: sandbox.stub()
      });
    });
    test('should set pill selector error and not call sendEmail when no emails are selected', function () {
      var wrapper = getWrapper({
        sendEmail: sandbox.mock().never(),
        intl: {
          formatMessage: function formatMessage() {
            return 'error';
          }
        }
      });
      wrapper.setState({
        selectedOptions: []
      });
      wrapper.instance().sendEmail({
        preventDefault: sandbox.stub()
      });
      expect(wrapper.state('pillSelectorError')).toEqual('error');
    });
  });
  describe('handleMessageChange()', function () {
    test('should update state.emailMessage', function () {
      var wrapper = getWrapper();
      wrapper.instance().handleMessageChange({
        target: {
          value: 'new value'
        }
      });
      expect(wrapper.state('emailMessage')).toEqual('new value');
    });
  });
  describe('render()', function () {
    test('should render a form that calls this.sendEmail on submission', function () {
      var wrapper = getWrapper();
      sandbox.mock(wrapper.instance()).expects('sendEmail');
      wrapper.setProps({});
      var form = wrapper.find('form');
      expect(form.length).toBe(1);
      form.simulate('submit');
    });
    test('should render a PillSelectorDropdown and TextArea', function () {
      var wrapper = getWrapper({
        onExpand: sandbox.mock(),
        emailMessageProps: {
          'data-resin-thing': 'hey'
        }
      });
      wrapper.setState({
        pillSelectorInputValue: 'h'
      });
      var pillSelector = wrapper.find('PillSelectorDropdown');
      expect(pillSelector.length).toBe(1);
      expect(pillSelector.find('ContactDatalistItem').length).toBe(11);
      expect(pillSelector.prop('inputProps')['data-resin-thing']).toEqual('hey');
      pillSelector.prop('inputProps').onFocus(); // should call props.onExpand

      var textArea = wrapper.find('TextArea');
      expect(textArea.length).toBe(1);
    });
    test('should add is-expanded class to form and show buttons when props.isExpanded is true', function () {
      var wrapper = getWrapper({
        isExpanded: true,
        onRequestClose: sandbox.mock()
      });
      expect(wrapper.find('form').hasClass('is-expanded')).toBe(true);
      expect(wrapper.find('ModalActions').length).toBe(1);
      var cancelBtn = wrapper.find('Button');
      expect(cancelBtn.length).toBe(1);
      cancelBtn.simulate('click');
      var submitBtn = wrapper.find('PrimaryButton');
      expect(submitBtn.length).toBe(1);
    });
    test('should disable buttons when props.submitting is true', function () {
      var wrapper = getWrapper({
        isExpanded: true,
        submitting: true
      });
      var cancelBtn = wrapper.find('Button');
      expect(cancelBtn.prop('isDisabled')).toBe(true);
      var submitBtn = wrapper.find('PrimaryButton');
      expect(submitBtn.prop('isDisabled')).toBe(true);
      expect(submitBtn.prop('isLoading')).toBe(true);
    });
  });
});