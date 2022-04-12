function _templateObject5() {
  var data = _taggedTemplateLiteral(["\n            showInviteCollaboratorMessageSection | description\n            ", "                              | ", "\n            ", "                             | ", "\n        "]);

  _templateObject5 = function _templateObject5() {
    return data;
  };

  return data;
}

function _templateObject4() {
  var data = _taggedTemplateLiteral(["\n            isRestrictionJustificationEnabled | selectedJustificationReason    | restrictedExternalEmails       | expectedClassName\n            ", "                          | ", "                        | ", "                          | ", "\n            ", "                          | ", " | ", " | ", "\n            ", "                          | ", "                        | ", " | ", "\n            ", "                           | ", "                        | ", " | ", "\n            ", "                           | ", "                        | ", "                          | ", "\n            ", "                           | ", " | ", " | ", "\n        "]);

  _templateObject4 = function _templateObject4() {
    return data;
  };

  return data;
}

function _templateObject3() {
  var data = _taggedTemplateLiteral(["\n            isRestrictionJustificationEnabled | selectedJustificationReason    | restrictedExternalEmails       | expectedIsValid\n            ", "                          | ", "                        | ", "                          | ", "\n            ", "                          | ", " | ", " | ", "\n            ", "                          | ", "                        | ", " | ", "\n            ", "                           | ", "                        | ", " | ", "\n            ", "                           | ", "                        | ", "                          | ", "\n            ", "                           | ", " | ", " | ", "\n        "]);

  _templateObject3 = function _templateObject3() {
    return data;
  };

  return data;
}

function _templateObject2() {
  var data = _taggedTemplateLiteral(["\n            isRestrictionJustificationEnabled | restrictedExternalEmails       | selectedJustificationReason    | expectedError\n            ", "                          | ", "                          | ", "                        | ", "\n            ", "                          | ", "                          | ", " | ", "\n            ", "                           | ", " | ", "                        | ", "\n            ", "                           | ", " | ", " | ", "\n            ", "                          | ", "                          | ", "                        | ", "\n            ", "                          | ", " | ", "                        | ", "\n        "]);

  _templateObject2 = function _templateObject2() {
    return data;
  };

  return data;
}

function _templateObject() {
  var data = _taggedTemplateLiteral(["\n            isRestrictionJustificationEnabled | expectedErrorId                                    | conditionDescription\n            ", "                           | ", " | ", "\n            ", "                          | ", "    | ", "\n        "]);

  _templateObject = function _templateObject() {
    return data;
  };

  return data;
}

function _taggedTemplateLiteral(strings, raw) { if (!raw) { raw = strings.slice(0); } return Object.freeze(Object.defineProperties(strings, { raw: { value: Object.freeze(raw) } })); }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

import * as React from 'react';
import CollaboratorAvatars from '../../collaborator-avatars/CollaboratorAvatars';
import commonMessages from '../../../common/messages';
import { EmailFormBase as EmailForm } from '../EmailForm';
describe('features/unified-share-modal/EmailForm', function () {
  var expectedContacts = [{
    email: 'x@example.com',
    id: '12345',
    text: 'X User',
    type: 'group',
    value: 'x@example.com'
  }, {
    email: 'y@example.com',
    id: '23456',
    text: 'Y User',
    type: 'user',
    value: 'y@example.com'
  }, {
    email: 'z@example.com',
    id: '34567',
    text: 'Z User',
    type: 'user',
    value: 'z@example.com'
  }];
  var expectedJustificationReason = {
    displayText: 'Reason',
    value: '123'
  };
  var intl = {
    formatMessage: jest.fn().mockImplementation(function (_ref) {
      var id = _ref.id;
      return id;
    })
  };

  var getWrapper = function getWrapper() {
    var props = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    return shallow(React.createElement(EmailForm, _extends({
      contactsFieldDisabledTooltip: "You do not have permission to invite collaborators.",
      intl: intl,
      isContactsFieldEnabled: true,
      getContacts: jest.fn(),
      onRequestClose: jest.fn(),
      onSubmit: jest.fn(),
      openInviteSection: jest.fn(),
      selectedContacts: [],
      showEnterEmailsCallout: true,
      inlineNotice: {},
      submitting: false,
      updateSelectedContacts: jest.fn()
    }, props)));
  };

  describe('handleContactAdd()', function () {
    test('should set the selected options in the state', function () {
      var onContactAdd = jest.fn();
      var updateSelectedContacts = jest.fn();
      var wrapper = getWrapper({
        onContactAdd: onContactAdd,
        updateSelectedContacts: updateSelectedContacts
      });
      var contactsToAdd = [expectedContacts[1], expectedContacts[2]];
      wrapper.instance().handleContactAdd(contactsToAdd);
      expect(updateSelectedContacts).toHaveBeenCalledWith(contactsToAdd);
      expect(onContactAdd).toBeCalled();
    });
    test('should set error when contact limit reached', function () {
      var wrapper = getWrapper({
        contactLimit: 1,
        intl: {
          formatMessage: jest.fn().mockReturnValue('contact limit reached')
        }
      });
      var contactsToAdd = [expectedContacts[1], expectedContacts[2]];
      wrapper.instance().handleContactAdd(contactsToAdd);
      expect(wrapper.state('contactsFieldError')).toBe('contact limit reached');
    });
  });
  describe('handleContactRemove()', function () {
    test('should set the selected options in the state', function () {
      var onContactRemove = jest.fn();
      var updateSelectedContacts = jest.fn();
      var wrapper = getWrapper({
        onContactRemove: onContactRemove,
        selectedContacts: [expectedContacts[0]],
        updateSelectedContacts: updateSelectedContacts
      }); // we ignore the first parameter from the pillSelector here

      wrapper.instance().handleContactRemove({}, 0);
      expect(onContactRemove).toBeCalled();
      expect(updateSelectedContacts).toHaveBeenCalledWith([]);
    });
    test('should set error when contact limit reached', function () {
      var wrapper = getWrapper({
        contactLimit: 1,
        contactsFieldError: 'contact limit reached',
        selectedContacts: [expectedContacts[1], expectedContacts[2]]
      });
      wrapper.instance().handleContactRemove(expectedContacts[1], 0);
      expect(wrapper.state('contactsFieldError')).toBe('');
    });
  });
  describe('handleRemoveRestrictedExternalContacts()', function () {
    test('should remove all contacts whose email matches a value from restrictedExternalEmails', function () {
      var onContactRemove = jest.fn();
      var updateSelectedContacts = jest.fn();
      var restrictedExternalEmails = [expectedContacts[0].value, expectedContacts[2].value, 'not_included_in_contacts@example.com'];
      var wrapper = getWrapper({
        onContactRemove: onContactRemove,
        restrictedExternalEmails: restrictedExternalEmails,
        selectedContacts: expectedContacts,
        updateSelectedContacts: updateSelectedContacts
      });
      wrapper.instance().handleRemoveRestrictedExternalContacts(); // The two restricted emails that match values in expectedContacts

      expect(onContactRemove).toHaveBeenCalledTimes(2);
      expect(onContactRemove).toHaveBeenCalledWith(expectedContacts[0]);
      expect(onContactRemove).toHaveBeenCalledWith(expectedContacts[2]);
      expect(updateSelectedContacts).toHaveBeenCalledTimes(1);
      expect(updateSelectedContacts).toHaveBeenCalledWith([expectedContacts[1]]);
    });
    test('should reset contact limit error when contact removal results in a contact count within the limit', function () {
      var wrapper = getWrapper({
        contactLimit: 1,
        isExpanded: true,
        onSubmit: jest.fn().mockResolvedValue({}),
        restrictedExternalEmails: [expectedContacts[2].value],
        selectedContacts: [expectedContacts[1], expectedContacts[2]],
        isRestrictionJustificationEnabled: true
      }); // Select justification so that no restriction-related error is triggered

      wrapper.find('ContactRestrictionNotice').simulate('selectJustificationReason', expectedJustificationReason);
      wrapper.instance().handleSubmit({
        preventDefault: jest.fn()
      });
      expect(wrapper.state('contactsFieldError')).toBe('boxui.unifiedShare.contactsExceedLimitError');
      wrapper.instance().handleRemoveRestrictedExternalContacts();
      expect(wrapper.state('contactsFieldError')).toBe('');
    });
  });
  describe('handleMessageChange()', function () {
    test('should set the state depending on the input value', function () {
      var textarea = mount(React.createElement("textarea", {
        defaultValue: "test"
      }));
      var wrapper = getWrapper();
      wrapper.setState();
      wrapper.instance().handleMessageChange({
        target: textarea.instance()
      });
      expect(wrapper.state('message')).toEqual('test');
    });
  });
  describe('handleSelectJustificationReason()', function () {
    test('should set justification reason and clear justification reason error when a value is selected', function () {
      var wrapper = getWrapper({
        isExpanded: true,
        onSubmit: jest.fn().mockResolvedValue({}),
        restrictedExternalEmails: [expectedContacts[0].value],
        selectedContacts: expectedContacts,
        isRestrictionJustificationEnabled: true
      }); // Trigger error by submitting without selecting a justification

      wrapper.instance().handleSubmit({
        preventDefault: jest.fn()
      });
      expect(wrapper.find('ContactRestrictionNotice').props().error).toBe('boxui.unifiedShare.justificationRequiredError');
      wrapper.find('ContactRestrictionNotice').simulate('selectJustificationReason', expectedJustificationReason);
      expect(wrapper.find('ContactRestrictionNotice').props().error).toBe('');
      expect(wrapper.find('ContactRestrictionNotice').props().selectedJustificationReason).toEqual(expectedJustificationReason);
    });
  });
  describe('handleClose()', function () {
    test('should reset the state', function () {
      var updateSelectedContacts = jest.fn();
      var wrapper = getWrapper({
        selectedContacts: expectedContacts,
        updateSelectedContacts: updateSelectedContacts
      });
      wrapper.setState({
        message: 'test',
        contactsFieldError: 'Error',
        selectedJustificationReason: expectedJustificationReason
      });
      wrapper.instance().handleClose();
      expect(wrapper.state('message')).toEqual('');
      expect(updateSelectedContacts).toHaveBeenCalledWith([]);
      expect(wrapper.state('contactsFieldError')).toEqual('');
      expect(wrapper.state('selectedJustificationReason')).toBeNull();
    });
  });
  describe('handleSubmit()', function () {
    test('should not call sendInvites prop if there is a contacts field error in state', function () {
      var onSubmitSpy = jest.fn();
      var wrapper = getWrapper({
        onSubmit: onSubmitSpy
      });
      var event = {
        preventDefault: jest.fn()
      };
      wrapper.setState({
        contactsFieldError: 'some error'
      });
      wrapper.instance().handleSubmit(event);
      expect(onSubmitSpy).not.toHaveBeenCalled();
    });
    test('should generate an error if sendInvites is called with no selected contacts', function () {
      var onSubmitSpy = jest.fn();
      var wrapper = getWrapper({
        sendInvites: onSubmitSpy,
        intl: {
          formatMessage: function formatMessage() {
            return 'error';
          }
        }
      });
      var event = {
        preventDefault: jest.fn()
      };
      wrapper.instance().handleSubmit(event);
      expect(wrapper.state('contactsFieldError')).toEqual('error');
      expect(onSubmitSpy).not.toHaveBeenCalled();
    });
    test('should call sendInvites prop with the correct params', function () {
      var message = 'test message';
      var expectedParam = {
        emails: ['y@example.com'],
        groupIDs: ['x@example.com'],
        justificationReason: null,
        message: message,
        restrictedExternalEmails: []
      };
      var onSubmit = jest.fn().mockReturnValue(Promise.resolve());
      var wrapper = getWrapper({
        onSubmit: onSubmit,
        selectedContacts: [expectedContacts[0], expectedContacts[1]]
      });
      var event = {
        preventDefault: jest.fn()
      };
      wrapper.setState({
        message: message
      });
      wrapper.instance().handleSubmit(event);
      expect(onSubmit).toHaveBeenCalledWith(expectedParam);
    });
    test('should include justificationReason and restrictedExternalEmails when available', function () {
      var message = 'test message';
      var event = {
        preventDefault: jest.fn()
      };
      var onSubmit = jest.fn().mockReturnValue(Promise.resolve());
      var wrapper = getWrapper({
        onSubmit: onSubmit,
        restrictedExternalEmails: [expectedContacts[1].value, expectedContacts[2].value, 'not_included_in_contacts@example.com'],
        selectedContacts: expectedContacts,
        isRestrictionJustificationEnabled: true
      });
      wrapper.setState({
        message: message
      });
      wrapper.instance().handleSelectJustificationReason(expectedJustificationReason);
      wrapper.instance().handleSubmit(event);
      expect(onSubmit).toHaveBeenCalledWith(expect.objectContaining({
        justificationReason: expectedJustificationReason,
        restrictedExternalEmails: [expectedContacts[1].value, expectedContacts[2].value]
      }));
    });
    test.each(_templateObject(), true, 'boxui.unifiedShare.justificationRequiredError', 'justification is allowed but not selected', false, 'boxui.unifiedShare.restrictedContactsError', 'justification is not allowed')('should trigger an error and abort submit action when restricted contacts are present and $conditionDescription', function (_ref2) {
      var isRestrictionJustificationEnabled = _ref2.isRestrictionJustificationEnabled,
          expectedErrorId = _ref2.expectedErrorId;
      var message = 'test message';
      var event = {
        preventDefault: jest.fn()
      };
      var onSubmit = jest.fn();
      var wrapper = getWrapper({
        onSubmit: onSubmit,
        restrictedExternalEmails: [expectedContacts[1].value, expectedContacts[2].value],
        selectedContacts: expectedContacts,
        isRestrictionJustificationEnabled: isRestrictionJustificationEnabled
      });
      wrapper.setState({
        message: message
      });
      wrapper.instance().handleSubmit(event);
      expect(wrapper.state('contactsRestrictionError')).toBe(expectedErrorId);
      expect(onSubmit).toHaveBeenCalledTimes(0);
    });
    test('should handle errors from onSubmit prop', function () {
      var message = 'test message';
      var expectedParam = {
        emails: [],
        groupIDs: ['x@example.com'],
        justificationReason: null,
        message: message,
        restrictedExternalEmails: []
      };
      var onSubmit = jest.fn().mockReturnValue( // eslint-disable-next-line prefer-promise-reject-errors
      Promise.reject({
        invitedEmails: ['x@example.com']
      }));
      var wrapper = getWrapper({
        onSubmit: onSubmit,
        selectedContacts: [expectedContacts[0]]
      });
      var event = {
        preventDefault: jest.fn()
      };
      wrapper.setState({
        message: message
      });
      wrapper.instance().handleSubmit(event);
      expect(onSubmit).toHaveBeenCalledWith(expectedParam);
    });
  });
  describe('filterSentEmails()', function () {
    test('should filter out the user if that user is already selected', function () {
      var updateSelectedContacts = jest.fn();
      var wrapper = getWrapper({
        selectedContacts: [expectedContacts[0]],
        updateSelectedContacts: updateSelectedContacts
      });
      var sentEmails = ['x@example.com'];
      wrapper.instance().filterSentEmails(sentEmails);
      expect(updateSelectedContacts).toHaveBeenCalledWith([]);
    });
    test('should keep the user if that user is not selected', function () {
      var updateSelectedContacts = jest.fn();
      var wrapper = getWrapper({
        selectedContacts: [expectedContacts[0]],
        updateSelectedContacts: updateSelectedContacts
      });
      var sentEmails = ['y@example.com'];
      wrapper.instance().filterSentEmails(sentEmails);
      expect(updateSelectedContacts).toHaveBeenCalledWith([expectedContacts[0]]);
    });
  });
  describe('validateContactField()', function () {
    [{
      email: 'x@example.com',
      expectedValue: true
    }, {
      email: 'test.box.com',
      expectedValue: false
    }, {
      email: 'test@@example.com',
      expectedValue: false
    }, // manually supplemented TLD:
    {
      email: 'test@@example.cpa',
      expectedValue: true
    }, {
      email: 'test@@example.badTLD',
      expectedValue: true
    }].forEach(function (_ref3) {
      var email = _ref3.email,
          expectedValue = _ref3.expectedValue;
      test('should show an error if it detects an invalid email address', function () {
        var wrapper = getWrapper();
        wrapper.instance().validateContactField(email);

        if (!expectedValue) {
          expect(intl.formatMessage).toHaveBeenCalledWith(commonMessages.invalidEmailError);
        }
      });
    });
  });
  describe('validateContactsRestrictions()', function () {
    test.each(_templateObject2(), false, [], null, '', false, [], expectedJustificationReason, '', true, [expectedContacts[0].value], null, 'boxui.unifiedShare.justificationRequiredError', true, [expectedContacts[0].value], expectedJustificationReason, '', false, [], null, '', false, [expectedContacts[0].value], null, 'boxui.unifiedShare.restrictedContactsError')('should return "$expectedError" when isRestrictionJustificationEnabled is $isRestrictionJustificationEnabled, restrictedExternalEmails is $restrictedExternalEmails and selectedJustificationReason is $selectedJustificationReason', function (_ref4) {
      var isRestrictionJustificationEnabled = _ref4.isRestrictionJustificationEnabled,
          restrictedExternalEmails = _ref4.restrictedExternalEmails,
          selectedJustificationReason = _ref4.selectedJustificationReason,
          expectedError = _ref4.expectedError;
      var wrapper = getWrapper({
        restrictedExternalEmails: restrictedExternalEmails,
        selectedContacts: expectedContacts,
        isRestrictionJustificationEnabled: isRestrictionJustificationEnabled
      });
      wrapper.instance().handleSelectJustificationReason(selectedJustificationReason);
      expect(wrapper.instance().validateContactsRestrictions()).toEqual(expectedError);
    });
  });
  describe('isValidContactPill()', function () {
    [{
      email: 'x@example.com',
      expectedValue: true
    }, {
      email: 'test.box.com',
      expectedValue: false
    }, {
      email: 'foo@bar.dog',
      expectedValue: true
    }, {
      email: 'foo@bar.design',
      expectedValue: true
    }, {
      email: 'foo@bar.dev',
      expectedValue: true
    }, {
      email: 'test@@example.com',
      expectedValue: false
    }].forEach(function (_ref5) {
      var email = _ref5.email,
          expectedValue = _ref5.expectedValue;
      test('should properly validate pill text input as email address', function () {
        var wrapper = getWrapper();
        var isValidContactPill = wrapper.instance().isValidContactPill(email);
        expect(isValidContactPill).toBe(expectedValue);
      });
    });
    test('should consider parsed contact pills as valid by default', function () {
      var wrapper = getWrapper();
      expectedContacts.forEach(function (contact) {
        var isValidContactPill = wrapper.instance().isValidContactPill(contact);
        expect(isValidContactPill).toBe(true);
      });
    });
    test.each(_templateObject3(), false, null, [], true, false, expectedJustificationReason, [expectedContacts[0].value], false, false, null, [expectedContacts[0].value], false, true, null, [expectedContacts[0].value], false, true, null, [], true, true, expectedJustificationReason, [expectedContacts[0].value], true)('should have isValidContactPill return $expectedIsValid when isRestrictionJustificationEnabled = $isRestrictionJustificationEnabled, selectedJustificationReason = $selectedJustificationReason and restrictedExternalEmails = $restrictedExternalEmails', function (_ref6) {
      var isRestrictionJustificationEnabled = _ref6.isRestrictionJustificationEnabled,
          selectedJustificationReason = _ref6.selectedJustificationReason,
          restrictedExternalEmails = _ref6.restrictedExternalEmails,
          expectedIsValid = _ref6.expectedIsValid;
      var wrapper = getWrapper();
      var contact = expectedContacts[0];
      wrapper.instance().handleSelectJustificationReason(selectedJustificationReason);
      wrapper.setProps({
        restrictedExternalEmails: restrictedExternalEmails,
        isRestrictionJustificationEnabled: isRestrictionJustificationEnabled
      });
      var isValidContactPill = wrapper.instance().isValidContactPill(contact);
      expect(isValidContactPill).toBe(expectedIsValid);
    });
  });
  describe('getContactPillClassName()', function () {
    test.each(_templateObject4(), false, null, [], '', false, expectedJustificationReason, [expectedContacts[0].value], '', false, null, [expectedContacts[0].value], '', true, null, [expectedContacts[0].value], '', true, null, [], '', true, expectedJustificationReason, [expectedContacts[0].value], 'is-waived')('should return "$expectedClassName" when isRestrictionJustificationEnabled = $isRestrictionJustificationEnabled, selectedJustificationReason = $selectedJustificationReason and restrictedExternalEmails = $restrictedExternalEmails', function (_ref7) {
      var isRestrictionJustificationEnabled = _ref7.isRestrictionJustificationEnabled,
          selectedJustificationReason = _ref7.selectedJustificationReason,
          restrictedExternalEmails = _ref7.restrictedExternalEmails,
          expectedClassName = _ref7.expectedClassName;
      var wrapper = getWrapper();
      var contact = expectedContacts[0];
      wrapper.instance().handleSelectJustificationReason(selectedJustificationReason);
      wrapper.setProps({
        restrictedExternalEmails: restrictedExternalEmails,
        isRestrictionJustificationEnabled: isRestrictionJustificationEnabled
      });
      var contactPillClassName = wrapper.instance().getContactPillClassName(contact);
      expect(contactPillClassName).toBe(expectedClassName);
    });
  });
  describe('componentDidUpdate()', function () {
    test('should clear other visible errors when a new error is set', function () {
      var wrapper = getWrapper({
        isExpanded: true,
        justificationReasons: [expectedJustificationReason],
        restrictedExternalEmails: [expectedContacts[0].value],
        selectedContacts: expectedContacts,
        isRestrictionJustificationEnabled: true
      });
      wrapper.instance().validateContactField('invalid_email');
      expect(wrapper.find('ContactsField').props().error).toBe('boxui.validation.emailError'); // Will fail validation since no justification reason has been selected

      wrapper.instance().validateContactsRestrictions();
      expect(wrapper.find('ContactsField').props().error).toBe('');
      expect(wrapper.find('ContactRestrictionNotice').props().error).toBe('boxui.unifiedShare.justificationRequiredError'); // Triggering another contacts field error should clear justification field error

      wrapper.instance().validateContactField('invalid_email');
      expect(wrapper.find('ContactRestrictionNotice').props().error).toBe('');
      expect(wrapper.find('ContactsField').props().error).toBe('boxui.validation.emailError');
    });
    test('should clear selected justification reason when isRestrictionJustificationEnabled is set to false after being true', function () {
      var wrapper = getWrapper({
        isExpanded: true,
        justificationReasons: [expectedJustificationReason],
        restrictedExternalEmails: [expectedContacts[0].value],
        selectedContacts: expectedContacts,
        isRestrictionJustificationEnabled: true
      });
      wrapper.instance().handleSelectJustificationReason(expectedJustificationReason);
      expect(wrapper.find('ContactRestrictionNotice').props().selectedJustificationReason).toEqual(expectedJustificationReason);
      wrapper.setProps({
        isRestrictionJustificationEnabled: false
      });
      expect(wrapper.find('ContactRestrictionNotice').props().selectedJustificationReason).toBeNull();
    });
  });
  describe('render()', function () {
    test('should render default component when expanded', function () {
      var wrapper = getWrapper({
        isExpanded: true
      });
      expect(wrapper).toMatchSnapshot();
    });
    test('should render default component with secruity indicator notes when expanded and has external users selected', function () {
      var wrapper = getWrapper({
        isExpanded: true,
        isExternalUserSelected: true
      });
      expect(wrapper).toMatchSnapshot();
    });
    test('should render default component when not expanded', function () {
      var wrapper = getWrapper({
        isExpanded: false
      });
      expect(wrapper).toMatchSnapshot();
    });
    test('should render default component when there is an error', function () {
      var wrapper = getWrapper({
        isExpanded: true,
        inlineNotice: {
          type: 'error',
          content: 'Error submitting form'
        }
      });
      expect(wrapper).toMatchSnapshot();
    });
    test('should render default component when contacts field is disabled', function () {
      var wrapper = getWrapper({
        isExpanded: true,
        isContactsFieldEnabled: false
      });
      expect(wrapper).toMatchSnapshot();
    });
    test('should render default component when avatars are passed in', function () {
      var avatars = React.createElement(CollaboratorAvatars, null);
      var wrapper = getWrapper({
        contactsFieldAvatars: avatars
      });
      expect(wrapper).toMatchSnapshot();
    });
    test('should render default component with inline notice', function () {
      var wrapper = getWrapper({
        isExpanded: true,
        inlineNotice: {
          type: 'error',
          content: 'Oops, there was an error.'
        }
      });
      expect(wrapper).toMatchSnapshot();
    });
    test('should not show inline notice when form is not expanded', function () {
      var wrapper = getWrapper({
        isExpanded: false,
        inlineNotice: {
          type: 'error',
          content: 'Oops, there was an error.'
        }
      });
      expect(wrapper).toMatchSnapshot();
    });
    test('should not show inline notice when content is not passed in', function () {
      var wrapper = getWrapper({
        isExpanded: false,
        inlineNotice: {
          type: 'error',
          content: undefined
        }
      });
      expect(wrapper).toMatchSnapshot();
    });
    test('should render tooltip around EmailForm correctly if recommendedSharingTooltipCalloutName is a string', function () {
      var wrapper = getWrapper({
        recommendedSharingTooltipCalloutName: 'Foo Bar'
      });
      expect(wrapper).toMatchSnapshot();
    });
    test.each([[null], [undefined]])('should render tooltip around EmailForm correctly if recommendedSharingTooltipCalloutName is null or undefined', function (recommendedSharingTooltipCalloutName) {
      var wrapper = getWrapper({
        recommendedSharingTooltipCalloutName: recommendedSharingTooltipCalloutName
      });
      expect(wrapper).toMatchSnapshot();
    });
    test('should render tooltip around EmailForm correctly if recommendedSharingTooltipCalloutName is not passed in', function () {
      var wrapper = getWrapper();
      expect(wrapper).toMatchSnapshot();
    });
    test('should render ContactRestrictionNotice and correctly forward props when isExpanded is true and restrictedExternalEmails has matching values in selectedContacts', function () {
      var isFetchingJustificationReasons = true;
      var justificationReasons = [expectedJustificationReason];
      var restrictedExternalEmails = [expectedContacts[0].value];
      var selectedContacts = expectedContacts;
      var isRestrictionJustificationEnabled = true;
      var wrapper = getWrapper({
        isExpanded: true,
        isFetchingJustificationReasons: isFetchingJustificationReasons,
        justificationReasons: justificationReasons,
        restrictedExternalEmails: restrictedExternalEmails,
        selectedContacts: selectedContacts,
        isRestrictionJustificationEnabled: isRestrictionJustificationEnabled
      });
      expect(wrapper.find('ContactRestrictionNotice')).toHaveLength(1);
      expect(wrapper.find('ContactRestrictionNotice').props()).toEqual(expect.objectContaining({
        isRestrictionJustificationEnabled: isRestrictionJustificationEnabled,
        isFetchingJustificationReasons: isFetchingJustificationReasons,
        justificationReasons: justificationReasons,
        restrictedExternalEmails: restrictedExternalEmails,
        selectedContacts: selectedContacts
      }));
    });
    test.each(_templateObject5(), true, 'show the message section when showInviteCollaboratorMessageSection is true', false, 'hide the message section when showInviteCollaboratorMessageSection is false')('should $description', function (_ref8) {
      var showInviteCollaboratorMessageSection = _ref8.showInviteCollaboratorMessageSection;
      var config = {
        showInviteCollaboratorMessageSection: showInviteCollaboratorMessageSection
      };
      var wrapper = getWrapper({
        config: config,
        isExpanded: true
      });
      expect(wrapper.find('[data-testid="be-emailform-message"]')).toHaveLength(showInviteCollaboratorMessageSection ? 1 : 0);
    });
    test('should show the message section when config is undefined', function () {
      var wrapper = getWrapper({
        isExpanded: true
      });
      expect(wrapper.find('[data-testid="be-emailform-message"]')).toHaveLength(1);
    });
  });
});