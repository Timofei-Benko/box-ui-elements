function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

import React from 'react';
import sinon from 'sinon';
import { InviteCollaboratorsModalBase as InviteCollaboratorsModal } from '../InviteCollaboratorsModal';
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
  email: 'dj@example.com',
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
describe('features/invite-collaborators-modal/InviteCollaboratorsModal', function () {
  var sandbox = sinon.sandbox.create();

  var getWrapper = function getWrapper(props) {
    return shallow(React.createElement(InviteCollaboratorsModal, _extends({
      contacts: contacts,
      intl: {
        formatMessage: sandbox.stub()
      },
      itemName: "My Example File",
      itemType: "notFile",
      itemTypedID: "12345",
      onRequestClose: sandbox.stub(),
      sendInvites: sandbox.stub()
    }, props)));
  };

  afterEach(function () {
    sandbox.verifyAndRestore();
  });
  describe('constructor()', function () {
    test('should set initial state when defaultPersonalMessage and inviteePermissions are given', function () {
      var inviteePermissions = [{
        value: 'Uploader',
        text: 'Uploader',
        disabled: true
      }, {
        value: 'Editor',
        text: 'Editor',
        disabled: false
      }, {
        value: 'Owner',
        text: 'Owner',
        disabled: true
      }];
      var defaultPersonalMessage = 'Hello, World!';
      var wrapper = getWrapper({
        defaultPersonalMessage: defaultPersonalMessage,
        inviteePermissions: inviteePermissions
      });
      expect(wrapper.state('message')).toEqual(defaultPersonalMessage);
      expect(wrapper.state('permission')).toEqual('Uploader');
    });
    test('should set initial state when defaultPersonalMessage and inviteePermissions are not given', function () {
      var wrapper = getWrapper();
      expect(wrapper.state('message')).toEqual('');
      expect(wrapper.state('permission')).toEqual('Editor');
    });
  });
  describe('getSelectorOptions()', function () {
    test('should correctly filter options that have yet to be selected by name and email', function () {
      var expectedSelectorOptions = [{
        email: 'jt@example.com',
        id: 1,
        text: 'Jeff',
        type: 'user',
        value: 'jt@example.com'
      }, {
        email: undefined,
        id: 10,
        text: 'Junior Ballers',
        type: 'group',
        value: 10
      }];
      var selectedOptions = [{
        email: 'j@example.com',
        id: 0,
        text: 'Jackie',
        type: 'user',
        value: 'j@example.com'
      }, {
        email: 'dj@example.com',
        id: 6,
        text: 'Dave',
        type: 'user',
        value: 'dj@example.com'
      }];
      var wrapper = getWrapper({
        allowCustomPills: true
      });
      wrapper.setState({
        pillSelectorInputValue: 'j',
        selectedOptions: selectedOptions
      });
      var result = wrapper.instance().getSelectorOptions();
      expect(result).toEqual(expectedSelectorOptions);
    });
  });
  describe('closeModal()', function () {
    test('should reset state and call onRequestClose', function () {
      var wrapper = getWrapper({
        onRequestClose: sandbox.mock()
      });
      wrapper.setState({
        pillSelectorError: 'oops',
        pillSelectorInputValue: 'hello',
        selectedOptions: [{
          text: 'Jackie',
          value: 'j@example.com'
        }]
      });
      wrapper.instance().closeModal();
      expect(wrapper.state('pillSelectorError')).toEqual('');
      expect(wrapper.state('pillSelectorInputValue')).toEqual('');
      expect(wrapper.state('selectedOptions').length).toBe(0);
    });
  });
  describe('sendInvites()', function () {
    test('should not send invites if error exists', function () {
      var wrapper = getWrapper({
        sendInvites: sandbox.mock().never()
      });
      wrapper.setState({
        pillSelectorError: 'oops',
        selectedOptions: [{
          text: 'Jackie',
          value: 'j@example.com'
        }]
      });
      wrapper.instance().sendInvites();
    });
    test('should not send invites if no options are selected', function () {
      var error = 'field required';
      var wrapper = getWrapper({
        intl: {
          formatMessage: sandbox.stub().returns(error)
        },
        sendInvites: sandbox.mock().never()
      });
      wrapper.setState({
        pillSelectorError: '',
        selectedOptions: []
      });
      wrapper.instance().sendInvites();
      expect(wrapper.state('pillSelectorError')).toEqual(error);
    });
    test('should send invites with the correct params', function () {
      var itemTypedID = '1234abc';
      var selectedOptions = [{
        // group contact
        text: 'Group',
        type: 'group',
        value: 55
      }, {
        // user contact
        text: 'Test',
        type: 'user',
        value: 'test@example.com'
      }, {
        // custom contact
        text: 'Unicorn',
        value: 'unicorn@example.com'
      }, {
        // group contact
        text: 'Group',
        type: 'group',
        value: 79
      }];
      var message = 'Please join my folder';
      var permission = 'Owner';
      var props = {
        emails: 'test@example.com,unicorn@example.com',
        groupIDs: '55,79',
        emailMessage: message,
        permission: permission,
        numsOfInvitees: 2,
        numOfInviteeGroups: 2
      };
      var wrapper = getWrapper({
        itemTypedID: itemTypedID,
        sendInvites: sandbox.mock().withExactArgs(props).returns(Promise.resolve())
      });
      wrapper.setState({
        message: message,
        permission: permission,
        pillSelectorError: '',
        selectedOptions: selectedOptions
      });
      wrapper.instance().sendInvites();
    });
  });
  describe('filterInvitedEmails()', function () {
    test('should remove invited emails from selected options', function () {
      var selectedOptions = [{
        // user contact
        text: 'Test',
        type: 'user',
        value: 'test@example.com'
      }, {
        // custom contact
        text: 'Unicorn',
        value: 'unicorn@example.com'
      }, {
        // user contact
        text: 'Aaron',
        type: 'user',
        value: 'aaron@example.com'
      }, {
        // custom contact
        text: 'Hello',
        value: 'hello@example.com'
      }];
      var invitedEmails = ['hello@example.com', 'test@example.com', 'aaron@example.com'];
      var wrapper = getWrapper();
      wrapper.setState({
        selectedOptions: selectedOptions
      });
      wrapper.instance().filterInvitedEmails(invitedEmails);
      expect(wrapper.state('selectedOptions')).toEqual([{
        text: 'Unicorn',
        value: 'unicorn@example.com'
      }]);
    });
  });
  describe('handlePillSelectorInput()', function () {
    test('should call onUserInput prop if it exists', function () {
      var wrapper = getWrapper({
        onUserInput: sandbox.mock().withExactArgs('j')
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
        formatMessage: sandbox.stub().returns(error)
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
  describe('handlePermissionChange()', function () {
    test('should update the permission state with the given target value', function () {
      var permission = 'Owner';
      var wrapper = getWrapper();
      wrapper.setState({
        permission: ''
      });
      wrapper.instance().handlePermissionChange({
        target: {
          value: permission
        }
      });
      expect(wrapper.state('permission')).toEqual(permission);
    });
  });
  describe('handleMessageChange()', function () {
    test('should update the message state with the given target value', function () {
      var message = 'hello';
      var wrapper = getWrapper();
      wrapper.setState({
        message: ''
      });
      wrapper.instance().handleMessageChange({
        target: {
          value: message
        }
      });
      expect(wrapper.state('message')).toEqual(message);
    });
  });
  describe('renderFileCollabComponents()', function () {
    test('should not render a Link when showUpgradeOptions is provided and itemType is file', function () {
      var wrapper = getWrapper({
        showUpgradeOptions: true,
        itemType: 'file'
      });
      var link = wrapper.find('Link');
      expect(link.length).toBe(0);
    });
    test('should not render a TextArea when defaultPersonalMessage is provided and itemType is file', function () {
      var wrapper = getWrapper({
        defaultPersonalMessage: 'Hello',
        itemType: 'file'
      });
      var textarea = wrapper.find('TextArea');
      expect(textarea.length).toBe(0);
    });
    test('should render a invite-file-editors div', function () {
      var wrapper = getWrapper({
        itemType: 'file'
      });
      var fileEditorsDiv = wrapper.find('div.invite-file-editors');
      expect(fileEditorsDiv.length).toBe(1);
    });
  });
  describe('renderFolderCollabComponents()', function () {
    test('should render a Link to /upgrade if showUpgradeOptions is provided and itemType is not file', function () {
      var wrapper = getWrapper({
        showUpgradeOptions: true
      });
      var link = wrapper.find('Link');
      expect(link.length).toBe(1);
      expect(link.prop('href')).toEqual('/upgrade');
      var upgradeBadge = link.find('UpgradeBadge');
      expect(upgradeBadge.length).toBe(1);
    });
    test('should not render a Link if showUpgradeOptions is not provided', function () {
      var wrapper = getWrapper();
      var link = wrapper.find('Link');
      expect(link.length).toBe(0);
    });
    test('should render a TextArea if defaultPersonalMessage is provided and itemType is not file', function () {
      var wrapper = getWrapper({
        defaultPersonalMessage: 'Hello'
      });
      var textarea = wrapper.find('TextArea');
      expect(textarea.length).toBe(1);
      expect(textarea.prop('defaultValue')).toEqual('Hello');
      expect(textarea.prop('name')).toEqual('collab-message');
      expect(textarea.prop('cols')).toEqual('30');
      expect(textarea.prop('rows')).toEqual('4');
      expect(textarea.prop('onChange')).toEqual(wrapper.instance().handleMessageChange);
    });
    test('should not render a TextArea if defaultPersonalMessage is not provided', function () {
      var wrapper = getWrapper();
      var textarea = wrapper.find('TextArea');
      expect(textarea.length).toBe(0);
    });
    test('should not render a invite-file-editors div', function () {
      var wrapper = getWrapper();
      var fileEditorsDiv = wrapper.find('div.invite-file-editors');
      expect(fileEditorsDiv.length).toBe(0);
    });
  });
  describe('render()', function () {
    describe('Permission Section', function () {
      test('should render a Select and a PermissionFlyout when inviteePermissions prop is set', function () {
        var inviteePermissions = [{
          value: 'Editor',
          text: 'Editor',
          disabled: false
        }, {
          value: 'Owner',
          text: 'Owner',
          disabled: true
        }, {
          value: 'Uploader',
          text: 'Uploader',
          disabled: true
        }];
        var wrapper = getWrapper({
          inviteePermissions: inviteePermissions
        });
        var select = wrapper.find('Select');
        var flyout = wrapper.find('PermissionFlyout');
        expect(select.length).toBe(1);
        expect(flyout.length).toBe(1);
        expect(select.prop('onChange')).toEqual(wrapper.instance().handlePermissionChange);
        inviteePermissions.forEach(function (_ref) {
          var value = _ref.value,
              disabled = _ref.disabled;
          var option = select.find('option').filter({
            value: value,
            disabled: disabled
          });
          expect(option.length).toBe(1);
        });
      });
      test('should not render a Select and a PermissionFlyout when inviteePermissions prop is not set', function () {
        var wrapper = getWrapper();
        var select = wrapper.find('Select');
        var flyout = wrapper.find('PermissionFlyout');
        expect(select.length).toBe(0);
        expect(flyout.length).toBe(0);
      });
      test('should not render a Select and a PermissionFlyout when itemType is file', function () {
        var inviteePermissions = [{
          value: 'Editor',
          text: 'Editor',
          disabled: false
        }, {
          value: 'Owner',
          text: 'Owner',
          disabled: true
        }, {
          value: 'Uploader',
          text: 'Uploader',
          disabled: true
        }];
        var wrapper = getWrapper({
          inviteePermissions: inviteePermissions,
          itemType: 'file'
        });
        var select = wrapper.find('Select');
        var flyout = wrapper.find('PermissionFlyout');
        expect(select.length).toBe(0);
        expect(flyout.length).toBe(0);
      });
    });
    test('should render a Modal with the correct onRequestClose prop', function () {
      var wrapper = getWrapper();
      var modal = wrapper.find('Modal');
      expect(modal.length).toBe(1);
      expect(modal.prop('onRequestClose')).toEqual(wrapper.instance().closeModal);
    });
    test('should render an InlineNotice error if submissionError is provided', function () {
      var wrapper = getWrapper({
        submissionError: 'There was an error processing your request'
      });
      var notice = wrapper.find('InlineNotice');
      expect(notice.length).toBe(1);
      expect(notice.prop('type')).toEqual('error');
    });
    test('should not render an InlineNotice if submissionError is not provided', function () {
      var wrapper = getWrapper();
      var notice = wrapper.find('InlineNotice');
      expect(notice.length).toBe(0);
    });
    test('should render an InlineNotice warning if collaborationRestrictionWarning is provided', function () {
      var wrapper = getWrapper({
        collaborationRestrictionWarning: 'Hello'
      });
      var notice = wrapper.find('InlineNotice');
      expect(notice.length).toBe(1);
      expect(notice.prop('type')).toEqual('warning');
    });
    test('should not render an InlineNotice if collaborationRestrictionWarning is not provided', function () {
      var wrapper = getWrapper();
      var notice = wrapper.find('InlineNotice');
      expect(notice.length).toBe(0);
    });
    test('should render a PillSelectorDropdown with the correct props and children', function () {
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
      var selectorOptions = [{
        email: 'dj@example.com',
        id: 6,
        text: 'Dave',
        type: 'user',
        value: 'dj@example.com'
      }];
      var wrapper = getWrapper({
        allowCustomPills: true
      });
      wrapper.setState({
        pillSelectorError: 'oops',
        pillSelectorInputValue: 'j',
        selectedOptions: selectedOptions
      });
      var instance = wrapper.instance();
      var pillSelectorDropdown = wrapper.find('PillSelectorDropdown');
      expect(pillSelectorDropdown.length).toBe(1);
      expect(pillSelectorDropdown.prop('allowCustomPills')).toBeTruthy();
      expect(pillSelectorDropdown.prop('error')).toEqual('oops');
      expect(pillSelectorDropdown.prop('onInput')).toEqual(instance.handlePillSelectorInput);
      expect(pillSelectorDropdown.prop('onRemove')).toEqual(instance.handlePillRemove);
      expect(pillSelectorDropdown.prop('onSelect')).toEqual(instance.handlePillSelect);
      expect(pillSelectorDropdown.prop('selectedOptions')).toEqual(selectedOptions);
      expect(pillSelectorDropdown.prop('selectorOptions')).toEqual(selectorOptions);
      expect(pillSelectorDropdown.prop('validateForError')).toEqual(instance.validateForError);
      expect(pillSelectorDropdown.prop('validator')).toEqual(instance.validator);
      var datalistItems = pillSelectorDropdown.find('ContactDatalistItem');
      expect(datalistItems.length).toEqual(selectorOptions.length);
    });
    test('should render a ReferAFriendAd if isEligibleForReferAFriendProgram is true', function () {
      var wrapper = getWrapper({
        isEligibleForReferAFriendProgram: true
      });
      var fileEditorsDiv = wrapper.find('ReferAFriendAd');
      expect(fileEditorsDiv.length).toBe(1);
    });
    test('should not render a ReferAFriendAd if isEligibleForReferAFriendProgram is false', function () {
      var wrapper = getWrapper({
        isEligibleForReferAFriendProgram: false
      });
      var fileEditorsDiv = wrapper.find('ReferAFriendAd');
      expect(fileEditorsDiv.length).toBe(0);
    });
    test('should render the correct ModalActions', function () {
      var wrapper = getWrapper();
      var modalActions = wrapper.find('ModalActions');
      expect(modalActions.length).toBe(1);
      var button = modalActions.find('Button');
      expect(button.length).toBe(1);
      var primaryButton = modalActions.find('PrimaryButton');
      expect(primaryButton.length).toBe(1);
    });
    test('should disable the ModalActions if request is submitting', function () {
      var wrapper = getWrapper({
        submitting: true
      });
      var modalActions = wrapper.find('ModalActions');
      var button = modalActions.find('Button');
      expect(button.prop('isDisabled')).toBeTruthy();
      var primaryButton = modalActions.find('PrimaryButton');
      expect(primaryButton.prop('isDisabled')).toBeTruthy();
      expect(primaryButton.prop('isLoading')).toBeTruthy();
    });
    test('should not disable the ModalActions if request is not submitting', function () {
      var wrapper = getWrapper();
      var modalActions = wrapper.find('ModalActions');
      var button = modalActions.find('Button');
      expect(button.prop('isDisabled')).toBeFalsy();
      var primaryButton = modalActions.find('PrimaryButton');
      expect(primaryButton.prop('isDisabled')).toBeFalsy();
      expect(primaryButton.prop('isLoading')).toBeFalsy();
    });
    test('should call sendInvites if primary button is clicked', function () {
      var wrapper = getWrapper();
      var primaryButton = wrapper.find('PrimaryButton');
      expect(primaryButton.prop('onClick')).toEqual(wrapper.instance().sendInvites);
    });
    test('should call closeModal if cancel button is clicked', function () {
      var wrapper = getWrapper();
      var cancelButton = wrapper.find('Button');
      expect(cancelButton.prop('onClick')).toEqual(wrapper.instance().closeModal);
    });
    test('should pass down inviteButtonProps to the PrimaryButton', function () {
      var inviteButtonProps = {
        'data-resin-target': 'invite'
      };
      var wrapper = getWrapper({
        inviteButtonProps: inviteButtonProps
      });
      expect(wrapper).toMatchSnapshot();
    });
  });
});