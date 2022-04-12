function _templateObject() {
  var data = _taggedTemplateLiteral(["\n            isRestrictionJustificationEnabled | restrictedExternalContactCount | restrictionNoticeMessageId                                 | removeButtonMessageId\n            ", "                          | ", "                           | ", "            | ", "\n            ", "                          | ", "                           | ", "                    | ", "\n            ", "                           | ", "                           | ", " | ", "\n            ", "                           | ", "                           | ", "         | ", "\n        "]);

  _templateObject = function _templateObject() {
    return data;
  };

  return data;
}

function _taggedTemplateLiteral(strings, raw) { if (!raw) { raw = strings.slice(0); } return Object.freeze(Object.defineProperties(strings, { raw: { value: Object.freeze(raw) } })); }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

import React from 'react';
import { shallow } from 'enzyme';
import messages from '../messages';
import { ContactRestrictionNoticeComponent as ContactRestrictionNotice } from '../ContactRestrictionNotice';
describe('features/unified-share-modal/ContactRestrictionNotice', function () {
  var wrapper;
  var selectedContacts;
  var restrictedExternalEmails;

  var getWrapper = function getWrapper() {
    var props = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    return shallow(React.createElement(ContactRestrictionNotice, _extends({
      error: "",
      intl: {
        formatMessage: jest.fn()
      },
      isFetchingJustificationReasons: false,
      isRestrictionJustificationEnabled: false,
      justificationReasons: [],
      onRemoveRestrictedExternalContacts: jest.fn(),
      onSelectJustificationReason: jest.fn(),
      restrictedExternalEmails: restrictedExternalEmails,
      selectedContacts: selectedContacts,
      selectedJustificationReason: null
    }, props)));
  };

  beforeEach(function () {
    selectedContacts = [{
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
    restrictedExternalEmails = ['x@example.com', 'y@example.com'];
    wrapper = getWrapper();
  });
  describe('render', function () {
    test('should render default ContactRestrictionNotice component', function () {
      expect(wrapper.is('Tooltip')).toBe(true);
      expect(wrapper.find('InlineNotice')).toHaveLength(1);
      expect(wrapper.find('[data-resin-target="removeBtn"]')).toHaveLength(1);
    });
    test('should render nothing when there are no restricted external contacts', function () {
      wrapper.setProps({
        restrictedExternalEmails: [],
        selectedContacts: selectedContacts
      });
      expect(wrapper.isEmptyRender()).toBe(true);
      wrapper.setProps({
        restrictedExternalEmails: restrictedExternalEmails,
        selectedContacts: []
      });
      expect(wrapper.isEmptyRender()).toBe(true);
    });
    test.each(_templateObject(), false, 1, messages.contactRestrictionNoticeSingular.id, messages.contactRestrictionRemoveButtonLabel.id, false, 2, messages.contactRestrictionNotice.id, messages.contactRestrictionRemoveButtonLabel.id, true, 1, messages.justifiableContactRestrictionNoticeSingular.id, messages.justifiableContactRestrictionRemoveButtonLabel.id, true, 2, messages.justifiableContactRestrictionNotice.id, messages.justifiableContactRestrictionRemoveButtonLabel.id)('should select appropriate messages when isRestrictionJustificationEnabled is $isRestrictionJustificationEnabled and restricted external contact count is $restrictedExternalContactCount', function (_ref) {
      var isRestrictionJustificationEnabled = _ref.isRestrictionJustificationEnabled,
          restrictedExternalContactCount = _ref.restrictedExternalContactCount,
          restrictionNoticeMessageId = _ref.restrictionNoticeMessageId,
          removeButtonMessageId = _ref.removeButtonMessageId;
      restrictedExternalEmails = restrictedExternalEmails.slice(0, restrictedExternalContactCount);
      wrapper.setProps({
        isRestrictionJustificationEnabled: isRestrictionJustificationEnabled,
        restrictedExternalEmails: restrictedExternalEmails
      });
      var restrictionNoticeMessage = wrapper.find("FormattedMessage[id=\"".concat(restrictionNoticeMessageId, "\"]"));
      var removeButtonMessage = wrapper.find("FormattedMessage[id=\"".concat(removeButtonMessageId, "\"]"));
      expect(restrictionNoticeMessage).toHaveLength(1);
      expect(restrictionNoticeMessage.props().values).toEqual({
        count: restrictedExternalEmails.length,
        email: selectedContacts[0].value
      });
      expect(removeButtonMessage).toHaveLength(1);
      expect(removeButtonMessage.props().values).toEqual({
        count: restrictedExternalEmails.length
      });
    });
    test('should display error tooltip when error is provided', function () {
      var error = 'error';
      wrapper.setProps({
        error: undefined
      });
      expect(wrapper.find('Tooltip').props().isShown).toBe(false);
      wrapper.setProps({
        error: error
      });
      expect(wrapper.find('Tooltip').props().text).toBe(error);
      expect(wrapper.find('Tooltip').props().isShown).toBe(true);
    });
    test('should render a loading indicator instead of the justification reasons select when isFetchingJustificationReasons is true', function () {
      wrapper.setProps({
        isFetchingJustificationReasons: true,
        isRestrictionJustificationEnabled: true
      });
      expect(wrapper.find('[data-resin-target="justificationReasonsSelect"]')).toHaveLength(0);
      expect(wrapper.find('LoadingIndicator')).toHaveLength(1);
    });
    test('should render justification reasons select when isFetchingJustificationReasons is false and isRestrictionJustificationEnabled is true', function () {
      var selectedJustificationReason = {
        displayText: 'displayText1',
        value: 'value1'
      };
      var justificationReasons = [selectedJustificationReason, {
        displayText: 'displayText2',
        value: 'value2'
      }];
      wrapper.setProps({
        isFetchingJustificationReasons: false,
        isRestrictionJustificationEnabled: true,
        justificationReasons: justificationReasons,
        selectedJustificationReason: selectedJustificationReason
      });
      var justificationReasonsSelect = wrapper.find('[data-resin-target="justificationReasonsSelect"]');
      expect(justificationReasonsSelect).toHaveLength(1);
      expect(justificationReasonsSelect.props().options).toEqual(justificationReasons);
      expect(justificationReasonsSelect.props().selectedValue).toEqual(selectedJustificationReason.value);
      expect(wrapper.find('LoadingIndicator')).toHaveLength(0);
    });
  });
  describe('handlers', function () {
    test('should call onRemoveRestrictedExternalContacts when remove button is clicked', function () {
      var onRemoveRestrictedExternalContacts = jest.fn();
      wrapper.setProps({
        onRemoveRestrictedExternalContacts: onRemoveRestrictedExternalContacts
      });
      expect(onRemoveRestrictedExternalContacts).toHaveBeenCalledTimes(0);
      wrapper.find('[data-resin-target="removeBtn"]').simulate('click');
      expect(onRemoveRestrictedExternalContacts).toHaveBeenCalledTimes(1);
    });
    test('should call onSelectJustificationReason with newly selected option on justification reason select change', function () {
      var onSelectJustificationReason = jest.fn();
      var expectedJustificationReason = {
        displayText: 'displayText',
        value: 'value'
      };
      wrapper.setProps({
        isRestrictionJustificationEnabled: true,
        onSelectJustificationReason: onSelectJustificationReason
      });
      expect(onSelectJustificationReason).toHaveBeenCalledTimes(0);
      wrapper.find('[data-resin-target="justificationReasonsSelect"]').simulate('change', expectedJustificationReason);
      expect(onSelectJustificationReason).toHaveBeenCalledTimes(1);
      expect(onSelectJustificationReason).toHaveBeenCalledWith(expectedJustificationReason);
    });
  });
});