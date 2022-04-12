function _templateObject2() {
  var data = _taggedTemplateLiteral(["\n            isCollabRestrictionJustificationAllowed | restrictedExternalCollabEmails               | expectedResult\n            ", "                                | ", "                                        | ", "\n            ", "                                 | ", "                                        | ", "\n            ", "                                 | ", "                | ", "\n            ", "                                 | ", " | ", "\n        "]);

  _templateObject2 = function _templateObject2() {
    return data;
  };

  return data;
}

function _templateObject() {
  var data = _taggedTemplateLiteral(["\n            isCollabRestrictionJustificationAllowed | restrictedExternalCollabEmails               | shouldFetch | actionDescription | conditionDescription\n            ", "                                | ", "                                        | ", "    | ", "    | ", "\n            ", "                                | ", " | ", "    | ", "    | ", "\n            ", "                                 | ", "           | ", "    | ", "    | ", "\n            ", "                                 | ", " | ", "     | ", "        | ", "\n        "]);

  _templateObject = function _templateObject() {
    return data;
  };

  return data;
}

function _taggedTemplateLiteral(strings, raw) { if (!raw) { raw = strings.slice(0); } return Object.freeze(Object.defineProperties(strings, { raw: { value: Object.freeze(raw) } })); }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

import * as React from 'react';
import { ITEM_TYPE_WEBLINK, ITEM_TYPE_FOLDER } from '../../../common/constants';
import { JUSTIFICATION_CHECKPOINT_EXTERNAL_COLLAB } from '../constants';
import { UnifiedShareFormBase as UnifiedShareForm } from '../UnifiedShareForm';
describe('features/unified-share-modal/UnifiedShareForm', function () {
  var intl = {
    formatMessage: jest.fn()
  };
  var defaultItem = {
    id: '111',
    name: 'test file',
    type: 'file',
    typedID: 'f_111',
    grantedPermissions: {
      itemShare: true
    },
    hideCollaborators: false
  };
  var defaultContacts = [{
    value: 'x@example.com',
    email: 'x@example.com',
    id: '12345',
    isExternalUser: false,
    name: 'X User',
    type: 'group'
  }, {
    value: 'y@example.com',
    email: 'y@example.com',
    id: '23456',
    isExternalUser: true,
    name: 'Y User',
    type: 'user'
  }, {
    value: 'z@example.com',
    email: 'z@example.com',
    id: '34567',
    isExternalUser: true,
    name: 'Z User',
    type: 'user'
  }];
  var testPermission = {
    text: 'Editor',
    value: 'Editor'
  };
  var collaboratorsList = {
    collaborators: []
  };
  var defaultTrackingProps = {
    inviteCollabsEmailTracking: {},
    sharedLinkEmailTracking: {},
    sharedLinkTracking: {},
    inviteCollabTracking: {},
    modalTracking: {},
    removeLinkConfirmModalTracking: {}
  };

  var getWrapper = function getWrapper() {
    var props = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    return shallow(React.createElement(UnifiedShareForm, _extends({
      classification: {
        definition: undefined,
        name: undefined
      },
      collaborationRestrictionWarning: "",
      collaboratorsList: collaboratorsList,
      handleFtuxCloseClick: function handleFtuxCloseClick() {
        return null;
      },
      intl: intl,
      inviteePermissions: [testPermission],
      item: defaultItem,
      sharedLink: {},
      trackingProps: props.trackingProps || defaultTrackingProps
    }, props)));
  };

  describe('render()', function () {
    test('should render a default component with default props', function () {
      var wrapper = getWrapper({
        isFetching: false
      });
      expect(wrapper).toMatchSnapshot();
    });
    test('should render an allShareRestrictionWarning message when it is available', function () {
      var SharingRestrictionWarning = React.createElement("div", {
        className: "test-class"
      }, "Sharing is prohibited");
      var wrapper = getWrapper({
        allShareRestrictionWarning: SharingRestrictionWarning,
        isFetching: false
      });
      expect(wrapper.find('.test-class')).toMatchSnapshot();
    });
    test('should render a default component in initial loading state', function () {
      var wrapper = getWrapper({
        isFetching: true
      });
      expect(wrapper).toMatchSnapshot();
    });
    test('should render a default component when showing invite section expanded', function () {
      var wrapper = getWrapper({
        isFetching: false
      });
      wrapper.setState({
        isInviteSectionExpanded: true
      });
      expect(wrapper).toMatchSnapshot();
    });
    test('should render a default component FTUX based on enabled prop and state', function () {
      var wrapper = getWrapper({
        shouldRenderFTUXTooltip: true,
        showCalloutForUser: true
      });
      expect(wrapper).toMatchSnapshot();
    });
    test('should not render a default component FTUX when prop is false', function () {
      var wrapper = getWrapper({
        shouldRenderFTUXTooltip: true,
        showCalloutForUser: false
      });
      expect(wrapper).toMatchSnapshot();
    });
    test('should not render a default component FTUX when state is false', function () {
      var wrapper = getWrapper({
        showCalloutForUser: true
      });
      expect(wrapper).toMatchSnapshot();
    });
    test('should render a default component with confirm modal open', function () {
      var wrapper = getWrapper({
        isConfirmModalOpen: true,
        isFetching: false,
        closeConfirmModal: function closeConfirmModal() {
          return null;
        }
      });
      expect(wrapper).toMatchSnapshot();
    });
    test('should render a default component when the user cannot invite collaborators due to permissions', function () {
      var item = _objectSpread({}, defaultItem, {
        type: ITEM_TYPE_FOLDER
      });

      var wrapper = getWrapper({
        canInvite: false,
        item: item
      });
      expect(wrapper).toMatchSnapshot();
    });
    test('should render a default component when the user cannot invite collaborators due to item type of weblink', function () {
      var item = _objectSpread({}, defaultItem, {
        type: ITEM_TYPE_WEBLINK
      });

      var wrapper = getWrapper({
        canInvite: false,
        isFetching: false,
        item: item
      });
      expect(wrapper).toMatchSnapshot();
    });
    test('should render a default component with send invite error specified', function () {
      var errorNode = React.createElement("span", null, "Some Error");
      var wrapper = getWrapper({
        canInvite: true,
        isFetching: false,
        sendInvitesError: errorNode
      });
      wrapper.setState({
        isInviteSectionExpanded: true
      });
      expect(wrapper).toMatchSnapshot();
    });
    test('should render a default component with collaboration restriction warning specified and invite section is expanded', function () {
      var collaborationRestrictionWarning = 'Collaboration invitations can only be sent to people within company.';
      var wrapper = getWrapper({
        canInvite: true,
        collaborationRestrictionWarning: collaborationRestrictionWarning,
        isFetching: false
      });
      wrapper.setState({
        isInviteSectionExpanded: true
      });
      expect(wrapper).toMatchSnapshot();
    });
    test('should render a default component with collaboration restriction warning specified and invite section is NOT expanded', function () {
      var collaborationRestrictionWarning = 'Collaboration invitations can only be sent to people within company.';
      var wrapper = getWrapper({
        canInvite: true,
        collaborationRestrictionWarning: collaborationRestrictionWarning,
        isFetching: false
      });
      wrapper.setState({
        isInviteSectionExpanded: false
      });
      expect(wrapper).toMatchSnapshot();
    });
    test('should render a default component with invitee permissions listed', function () {
      var wrapper = getWrapper({
        canInvite: true,
        inviteePermissions: ['Editor'],
        isFetching: false,
        submitting: false
      });
      expect(wrapper).toMatchSnapshot();
    });
    test('should render a default component with upgrade CTA when showUpgradeOptions is enabled', function () {
      var wrapper = getWrapper({
        canInvite: true,
        isFetching: false,
        showUpgradeOptions: true
      });
      expect(wrapper.exists('UpgradeBadge')).toBe(true);
    });
    test('should render correct copy of upgrade CTA when showUpgradeOptions and showNewUpgradeText is enabled', function () {
      var wrapper = getWrapper({
        canInvite: true,
        isFetching: false,
        showNewUpgradeText: true,
        showUpgradeOptions: true
      });
      expect(wrapper.exists('UpgradeBadge')).toBe(true);
      var msg = wrapper.find('FormattedCompMessage');
      expect(msg.prop('id')).toEqual('boxui.unifiedShare.upgradeCollaboratorAccessDescription');
    });
    test('should render correct upgrade inline notice when showUpgradeInlineNotice and showUpgradeOptions is enabled', function () {
      var wrapper = getWrapper({
        canInvite: true,
        isFetching: false,
        showUpgradeInlineNotice: true,
        showUpgradeOptions: true
      });
      expect(wrapper.exists('UpgradeBadge')).toBe(false);
      expect(wrapper.exists('InlineNotice')).toBe(true);
    });
    test('should render a default component with correct Focus element and props when focusSharedLinkOnLoad is enabled', function () {
      var wrapper = getWrapper({
        focusSharedLinkOnLoad: true,
        sharedLink: {
          url: 'https://foo.com'
        },
        sharedLinkLoaded: true
      });
      wrapper.setState({
        isEmailLinkSectionExpanded: false,
        isInviteSectionExpanded: false
      });
      expect(wrapper).toMatchSnapshot();
    });
    test('should render a component with autofocus set for shared link when focusSharedLinkOnLoad is enabled and there is a shared link', function () {
      var wrapper = getWrapper({
        focusSharedLinkOnLoad: true,
        sharedLink: {
          url: 'https://foo.com'
        },
        sharedLinkLoaded: true
      });
      wrapper.setState({
        isEmailLinkSectionExpanded: false,
        isInviteSectionExpanded: false
      });
      expect(wrapper).toMatchSnapshot();
    });
    test('should render a default component with collaborator list if showCollaboratorList state is set', function () {
      var collaborators = [{
        name: 'test a',
        hasCustomAvatar: false
      }, {
        name: 'test b',
        hasCustomAvatar: false
      }];
      var wrapper = getWrapper({
        collaboratorsList: _objectSpread({}, collaboratorsList, {
          collaborators: collaborators
        })
      });
      wrapper.setState({
        showCollaboratorList: true
      });
      expect(wrapper).toMatchSnapshot();
    });
  });
  describe('renderCollaboratorAvatars()', function () {
    test('should not render if hideCollaborators is true and canInvite is false', function () {
      var wrapper = getWrapper({
        canInvite: false,
        item: {
          hideCollaborators: true
        }
      });
      var emailForm = wrapper.find('EmailForm');
      var contactsFieldAvatars = emailForm.prop('contactsFieldAvatars');
      expect(contactsFieldAvatars).toMatchSnapshot();
    });
    test('should filter out current user', function () {
      var wrapper = getWrapper({
        currentUserID: '1234',
        collaboratorsList: {
          collaborators: [{
            userID: 1234
          }, {
            userID: 5678
          }]
        }
      });
      var emailForm = wrapper.find('EmailForm');
      var contactsFieldAvatars = emailForm.prop('contactsFieldAvatars');
      expect(contactsFieldAvatars).toMatchSnapshot();
    });
  });
  describe('onToggleSharedLink()', function () {
    test('should open the confirm modal when the toggle is set to false', function () {
      var onHandleFtuxCloseClickStub = jest.fn();
      var onOpenConfirmModalStub = jest.fn();
      var onToggleSharedLinkStub = jest.fn();
      var input = mount(React.createElement("input", {
        type: "checkbox",
        readOnly: true
      }));

      var trackingProps = _objectSpread({}, defaultTrackingProps, {
        sharedLinkTracking: {
          onToggleLink: onToggleSharedLinkStub
        }
      });

      var wrapper = getWrapper({
        handleFtuxCloseClick: onHandleFtuxCloseClickStub,
        openConfirmModal: onOpenConfirmModalStub,
        sharedLink: {
          canChangeAccessLevel: true,
          url: 'https://example.com/shared-link'
        },
        shouldRenderFTUXTooltip: true,
        trackingProps: trackingProps
      });
      wrapper.instance().onToggleSharedLink({
        target: input.instance()
      });
      expect(onHandleFtuxCloseClickStub).toHaveBeenCalled();
      expect(onOpenConfirmModalStub).toHaveBeenCalled();
      expect(onToggleSharedLinkStub).toHaveBeenCalled();
    });
    test('should add the link when the the toggle is set to true', function () {
      var onHandleFtuxCloseClickStub = jest.fn();
      var onToggleSharedLinkStub = jest.fn();
      var onAddLinkStub = jest.fn();

      var trackingProps = _objectSpread({}, defaultTrackingProps, {
        sharedLinkTracking: {
          onToggleLink: onToggleSharedLinkStub
        }
      });

      var input = mount(React.createElement("input", {
        type: "checkbox",
        checked: true,
        readOnly: true
      }));
      var wrapper = getWrapper({
        sharedLink: {
          url: 'https://example.com/shared-link'
        },
        trackingProps: trackingProps,
        onAddLink: onAddLinkStub
      });
      wrapper.instance().onToggleSharedLink({
        target: input.instance()
      });
      expect(onHandleFtuxCloseClickStub).not.toHaveBeenCalled();
      expect(onToggleSharedLinkStub).toHaveBeenCalled();
    });
  });
  describe('handleSendInvites()', function () {
    test('should call onSendClick and sendInvites with correct params',
    /*#__PURE__*/
    _asyncToGenerator(
    /*#__PURE__*/
    regeneratorRuntime.mark(function _callee() {
      var onSendClick, sendInvites, trackingProps, expectedParams, wrapper;
      return regeneratorRuntime.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              onSendClick = jest.fn();
              sendInvites = jest.fn();
              trackingProps = _objectSpread({}, defaultTrackingProps, {
                inviteCollabsEmailTracking: {
                  onSendClick: onSendClick
                }
              });
              expectedParams = {
                emails: 'dvader@example.com,fbar@example.com',
                groupIDs: 'eng@example.com,product@example.com',
                emailMessage: 'Yo',
                permission: 'Editor',
                numsOfInvitees: 2,
                numOfInviteeGroups: 2
              };
              wrapper = getWrapper({
                sendInvites: sendInvites,
                trackingProps: trackingProps
              });
              wrapper.setState({
                inviteePermissionLevel: 'Editor'
              });
              _context.next = 8;
              return wrapper.instance().handleSendInvites({
                emails: ['dvader@example.com', 'fbar@example.com'],
                groupIDs: ['eng@example.com', 'product@example.com'],
                message: 'Yo'
              });

            case 8:
              expect(onSendClick).toBeCalledWith(expectedParams);
              expect(sendInvites).toBeCalledWith(expectedParams);

            case 10:
            case "end":
              return _context.stop();
          }
        }
      }, _callee);
    })));
    test('should include classification label id and justification reason when justification is required and has been selected',
    /*#__PURE__*/
    _asyncToGenerator(
    /*#__PURE__*/
    regeneratorRuntime.mark(function _callee2() {
      var sendInvites, classificationLabelId, restrictedEmails, justificationReason, wrapper;
      return regeneratorRuntime.wrap(function _callee2$(_context2) {
        while (1) {
          switch (_context2.prev = _context2.next) {
            case 0:
              sendInvites = jest.fn();
              classificationLabelId = '123';
              restrictedEmails = ['restricted@example.com'];
              justificationReason = {
                value: '123',
                displayText: 'My Reason'
              };
              wrapper = getWrapper({
                isCollabRestrictionJustificationAllowed: true,
                restrictedExternalCollabEmails: restrictedEmails,
                sendInvites: sendInvites
              });
              wrapper.setState({
                classificationLabelId: classificationLabelId
              });
              _context2.next = 8;
              return wrapper.instance().handleSendInvites({
                emails: ['a@example.com', 'a@example.com', 'restricted@example.com'],
                groupIDs: ['234'],
                justificationReason: justificationReason,
                message: 'message',
                restrictedExternalEmails: ['restricted@example.com']
              });

            case 8:
              expect(sendInvites).toHaveBeenCalledWith(expect.objectContaining({
                classificationLabelId: classificationLabelId,
                justificationReason: {
                  id: justificationReason.value,
                  title: justificationReason.displayText
                }
              }));

            case 9:
            case "end":
              return _context2.stop();
          }
        }
      }, _callee2);
    })));
  });
  describe('handleInviteePermissionChange()', function () {
    test('should set the permission in the state', function () {
      var onInviteePermissionChange = jest.fn();

      var trackingProps = _objectSpread({}, defaultTrackingProps, {
        inviteCollabTracking: {
          onInviteePermissionChange: onInviteePermissionChange
        }
      });

      var wrapper = getWrapper({
        trackingProps: trackingProps
      });
      wrapper.instance().handleInviteePermissionChange('Editor');
      expect(wrapper.state('inviteePermissionLevel')).toEqual('Editor');
      expect(onInviteePermissionChange).toBeCalledWith('Editor');
    });
  });
  describe('openInviteCollaborators()', function () {
    test('should set state to open if value is not empty', function () {
      var wrapper = getWrapper();
      wrapper.setState({
        isInviteSectionExpanded: false
      });
      wrapper.instance().openInviteCollaborators('t');
      expect(wrapper.state('isInviteSectionExpanded')).toBe(true);
    });
    test('should leave state closed if value is empty', function () {
      var wrapper = getWrapper();
      wrapper.setState({
        isInviteSectionExpanded: false
      });
      wrapper.instance().openInviteCollaborators('');
      expect(wrapper.state('isInviteSectionExpanded')).toBe(false);
    });
    test('should call onEnterInviteCollabs if invite section expanded first time', function () {
      var onEnterInviteCollabs = jest.fn();
      var wrapper = getWrapper({
        trackingProps: _objectSpread({}, defaultTrackingProps, {
          inviteCollabTracking: {
            onEnterInviteCollabs: onEnterInviteCollabs
          }
        })
      });
      wrapper.setState({
        isInviteSectionExpanded: false
      });
      wrapper.instance().openInviteCollaborators('t');
      expect(onEnterInviteCollabs).toBeCalled();
      expect(wrapper.state('isInviteSectionExpanded')).toBe(true);
    });
  });
  describe('openInviteCollaboratorsSection()', function () {
    test('should set isInviteSectionExpanded to true', function () {
      var wrapper = getWrapper();
      wrapper.setState({
        isInviteSectionExpanded: false
      });
      wrapper.instance().openInviteCollaboratorsSection();
      expect(wrapper.state('isInviteSectionExpanded')).toBe(true);
    });
  });
  describe('closeInviteCollaborators()', function () {
    test('should set state properly', function () {
      var wrapper = getWrapper();
      wrapper.setState({
        isFetching: false,
        isInviteSectionExpanded: true
      });
      wrapper.instance().closeInviteCollaborators();
      expect(wrapper.state('isInviteSectionExpanded')).toBe(false);
    });
  });
  describe('openEmailSharedLinkForm()', function () {
    test('should set state properly', function () {
      var onHandleFtuxCloseClickStub = jest.fn();
      var wrapper = getWrapper({
        handleFtuxCloseClick: onHandleFtuxCloseClickStub,
        isFetching: false,
        shouldRenderFTUXTooltip: true
      });
      wrapper.setState({
        isEmailLinkSectionExpanded: false
      });
      wrapper.instance().openEmailSharedLinkForm();
      expect(wrapper.state('isEmailLinkSectionExpanded')).toBe(true);
      expect(onHandleFtuxCloseClickStub).toHaveBeenCalled(); // when this state is set, confirm the layout is correct

      expect(wrapper).toMatchSnapshot();
    });
  });
  describe('closeEmailSharedLinkForm()', function () {
    test('should set state properly', function () {
      var wrapper = getWrapper();
      wrapper.setState({
        isFetching: false,
        isEmailLinkSectionExpanded: true
      });
      wrapper.instance().closeEmailSharedLinkForm();
      expect(wrapper.state('isEmailLinkSectionExpanded')).toBe(false); // when this state is set, confirm the layout is correct

      expect(wrapper).toMatchSnapshot();
    });
  });
  describe('shouldAutoFocusSharedLink()', function () {
    test('should return false if not forced focus or a new shared link', function () {
      var wrapper = getWrapper({
        focusSharedLinkOnLoad: false,
        sharedLink: {
          isNewSharedLink: false
        },
        sharedLinkLoaded: false
      });
      expect(wrapper.instance().shouldAutoFocusSharedLink()).toBe(false);
    });
    test('should return false if shared link is not yet loaded', function () {
      var wrapper = getWrapper({
        focusSharedLinkOnLoad: true,
        sharedLink: {
          isNewSharedLink: false
        },
        sharedLinkLoaded: false
      });
      expect(wrapper.instance().shouldAutoFocusSharedLink()).toBe(false);
    });
    test('should return true if forced focus and link is loaded', function () {
      var wrapper = getWrapper({
        focusSharedLinkOnLoad: true,
        sharedLink: {
          isNewSharedLink: false
        },
        sharedLinkLoaded: true
      });
      expect(wrapper.instance().shouldAutoFocusSharedLink()).toBe(true);
    });
    test('should return true if forced focus and link is loaded and createSharedLinkOnLoad is true', function () {
      var wrapper = getWrapper({
        createSharedLinkOnLoad: true,
        focusSharedLinkOnLoad: true,
        sharedLink: {
          isNewSharedLink: false
        },
        sharedLinkLoaded: true
      });
      expect(wrapper.instance().shouldAutoFocusSharedLink()).toBe(true);
    });
    test('should return true if new shared link and link is loaded', function () {
      var wrapper = getWrapper({
        createSharedLinkOnLoad: true,
        focusSharedLinkOnLoad: false,
        sharedLink: {
          isNewSharedLink: true
        },
        sharedLinkLoaded: true
      });
      expect(wrapper.instance().shouldAutoFocusSharedLink()).toBe(true);
    });
  });
  describe('componendDidUpdate()', function () {
    test.each(_templateObject(), false, [], false, 'not fetch', 'collab restrictions do not change', false, defaultContacts.map(function (_ref3) {
      var email = _ref3.email;
      return email;
    }), false, 'not fetch', 'collab restrictions change but justification is not allowed', true, ['unmatched_email@example.com'], false, 'not fetch', 'collab restrictions change but no restricted collabs are present', true, defaultContacts.map(function (_ref4) {
      var email = _ref4.email;
      return email;
    }), true, 'fetch', 'collab restrictions change, justification is allowed and restricted collabs are present')('should $actionDescription justification reasons when $conditionDescription', function (_ref5) {
      var isCollabRestrictionJustificationAllowed = _ref5.isCollabRestrictionJustificationAllowed,
          restrictedExternalCollabEmails = _ref5.restrictedExternalCollabEmails,
          shouldFetch = _ref5.shouldFetch;
      var getJustificationReasons = jest.fn().mockResolvedValue({});
      var wrapper = getWrapper({
        getJustificationReasons: getJustificationReasons,
        isCollabRestrictionJustificationAllowed: false,
        item: defaultItem,
        restrictedExternalCollabEmails: []
      });
      wrapper.instance().updateInviteCollabsContacts(defaultContacts);
      wrapper.setProps({
        isCollabRestrictionJustificationAllowed: isCollabRestrictionJustificationAllowed,
        restrictedExternalCollabEmails: restrictedExternalCollabEmails
      });

      if (shouldFetch) {
        expect(getJustificationReasons).toHaveBeenCalledTimes(1);
        expect(getJustificationReasons).toHaveBeenCalledWith(defaultItem.typedID, JUSTIFICATION_CHECKPOINT_EXTERNAL_COLLAB);
      } else {
        expect(getJustificationReasons).toHaveBeenCalledTimes(0);
      }
    });
  });
  describe('fetchJustificationReasons()', function () {
    var justificationReasons = [{
      id: '123',
      title: 'Reason A'
    }, {
      id: '234',
      title: 'Reason B'
    }, {
      id: '345',
      title: 'Reason C'
    }];
    var justificationReasonOptions = justificationReasons.map(function (_ref6) {
      var id = _ref6.id,
          title = _ref6.title;
      return {
        value: id,
        displayText: title
      };
    });
    test('should fetch justification reasons, pass them on to external collab email form and store classification label id',
    /*#__PURE__*/
    _asyncToGenerator(
    /*#__PURE__*/
    regeneratorRuntime.mark(function _callee3() {
      var classificationLabelId, getJustificationReasons, wrapper, externalCollabEmailForm;
      return regeneratorRuntime.wrap(function _callee3$(_context3) {
        while (1) {
          switch (_context3.prev = _context3.next) {
            case 0:
              classificationLabelId = '123';
              getJustificationReasons = jest.fn().mockResolvedValue({
                classificationLabelId: classificationLabelId,
                options: justificationReasons
              });
              wrapper = getWrapper({
                getJustificationReasons: getJustificationReasons,
                isCollabRestrictionJustificationAllowed: false,
                item: defaultItem,
                restrictedExternalCollabEmails: []
              });
              _context3.next = 5;
              return wrapper.instance().fetchJustificationReasons(defaultItem, JUSTIFICATION_CHECKPOINT_EXTERNAL_COLLAB);

            case 5:
              externalCollabEmailForm = wrapper.find('[data-testid="invite-collaborator-container"] EmailForm');
              expect(externalCollabEmailForm).toHaveLength(1);
              expect(externalCollabEmailForm.props().justificationReasons).toEqual(justificationReasonOptions);
              expect(externalCollabEmailForm.props().isFetchingJustificationReasons).toBe(false);
              expect(wrapper.state().classificationLabelId).toBe(classificationLabelId);
              expect(getJustificationReasons).toHaveBeenCalledTimes(1);
              expect(getJustificationReasons).toHaveBeenCalledWith(defaultItem.typedID, JUSTIFICATION_CHECKPOINT_EXTERNAL_COLLAB);

            case 12:
            case "end":
              return _context3.stop();
          }
        }
      }, _callee3);
    })));
    test('should set isFetchingJustificationReasons to false when fetching justification reasons fails',
    /*#__PURE__*/
    _asyncToGenerator(
    /*#__PURE__*/
    regeneratorRuntime.mark(function _callee4() {
      var getJustificationReasons, wrapper;
      return regeneratorRuntime.wrap(function _callee4$(_context4) {
        while (1) {
          switch (_context4.prev = _context4.next) {
            case 0:
              getJustificationReasons = jest.fn().mockRejectedValue('Error');
              wrapper = getWrapper({
                getJustificationReasons: getJustificationReasons,
                isCollabRestrictionJustificationAllowed: false,
                item: defaultItem,
                restrictedExternalCollabEmails: []
              });
              wrapper.setState({
                isFetchingJustificationReasons: true
              });
              _context4.prev = 3;
              _context4.next = 6;
              return wrapper.instance().fetchJustificationReasons(defaultItem, JUSTIFICATION_CHECKPOINT_EXTERNAL_COLLAB);

            case 6:
              _context4.next = 10;
              break;

            case 8:
              _context4.prev = 8;
              _context4.t0 = _context4["catch"](3);

            case 10:
              expect(wrapper.state().isFetchingJustificationReasons).toBe(false);

            case 11:
            case "end":
              return _context4.stop();
          }
        }
      }, _callee4, null, [[3, 8]]);
    })));
  });
  describe('updateInviteCollabsContacts()', function () {
    test('should store updated contacts and call setUpdatedContacts', function () {
      var setUpdatedContacts = jest.fn();
      var wrapper = getWrapper({
        setUpdatedContacts: setUpdatedContacts
      });
      wrapper.instance().updateInviteCollabsContacts(defaultContacts);
      var externalCollabEmailForm = wrapper.find('[data-testid="invite-collaborator-container"] EmailForm');
      expect(externalCollabEmailForm).toHaveLength(1);
      expect(externalCollabEmailForm.props().selectedContacts).toEqual(defaultContacts);
      expect(setUpdatedContacts).toHaveBeenCalledTimes(1);
      expect(setUpdatedContacts).toHaveBeenCalledWith(defaultContacts);
    });
    test('should call onRemoveAllRestrictedExternalCollabs when update results in all restricted external contacts being removed', function () {
      var onRemoveAllRestrictedExternalCollabs = jest.fn();
      var restrictedExternalCollabEmails = ['x@example.com', 'y@example.com'];
      var wrapper = getWrapper({
        onRemoveAllRestrictedExternalCollabs: onRemoveAllRestrictedExternalCollabs,
        restrictedExternalCollabEmails: restrictedExternalCollabEmails
      });
      wrapper.instance().updateInviteCollabsContacts(defaultContacts);
      expect(onRemoveAllRestrictedExternalCollabs).toHaveBeenCalledTimes(0); // Minus first contact, which is restricted

      wrapper.instance().updateInviteCollabsContacts(defaultContacts.slice(1));
      expect(onRemoveAllRestrictedExternalCollabs).toHaveBeenCalledTimes(0); // Minus two first contacts, which are all the restricted ones

      wrapper.instance().updateInviteCollabsContacts(defaultContacts.slice(2));
      expect(onRemoveAllRestrictedExternalCollabs).toHaveBeenCalledTimes(1);
    });
  });
  describe('shouldRequireExternalCollabJustification()', function () {
    test.each(_templateObject2(), false, [], false, true, [], false, true, [defaultContacts[0].value], true, true, defaultContacts.map(function (_ref9) {
      var value = _ref9.value;
      return value;
    }), true)('should return $expectedResult when isCollabRestrictionJustificationAllowed is $isCollabRestrictionJustificationAllowed and restrictedExternalCollabEmails is $restrictedExternalCollabEmails', function (_ref10) {
      var isCollabRestrictionJustificationAllowed = _ref10.isCollabRestrictionJustificationAllowed,
          restrictedExternalCollabEmails = _ref10.restrictedExternalCollabEmails,
          expectedResult = _ref10.expectedResult;
      var wrapper = getWrapper({
        isCollabRestrictionJustificationAllowed: isCollabRestrictionJustificationAllowed,
        item: defaultItem,
        restrictedExternalCollabEmails: restrictedExternalCollabEmails
      });
      wrapper.instance().updateInviteCollabsContacts(defaultContacts);
      var externalCollabEmailForm = wrapper.find('[data-testid="invite-collaborator-container"] EmailForm');
      expect(externalCollabEmailForm.props().isRestrictionJustificationEnabled).toBe(expectedResult);
    });
  });
  describe('onPillCreate()', function () {
    var email = 'dev@box.com';
    var displayText = email;
    var name = 'dev';
    var text = name;
    var id = 123;
    var type = 'user';
    var isExternalUser = true;
    var value = email;
    var inviteCollabsContacts = [{
      displayText: email,
      value: email
    }];
    var emailSharedLinkContacts = [{
      displayText: email,
      value: email
    }];
    test('should not retrieve emails if all the pills are select type',
    /*#__PURE__*/
    _asyncToGenerator(
    /*#__PURE__*/
    regeneratorRuntime.mark(function _callee5() {
      var pills, getContactsByEmail, wrapper;
      return regeneratorRuntime.wrap(function _callee5$(_context5) {
        while (1) {
          switch (_context5.prev = _context5.next) {
            case 0:
              pills = [{
                id: 123
              }, {
                id: 456
              }];
              getContactsByEmail = jest.fn();
              wrapper = getWrapper({
                getContactsByEmail: getContactsByEmail
              });
              _context5.next = 5;
              return wrapper.instance().onPillCreate('test', pills);

            case 5:
              expect(getContactsByEmail).not.toHaveBeenCalled();

            case 6:
            case "end":
              return _context5.stop();
          }
        }
      }, _callee5);
    })));
    test('should retrieve emails and set the state for invite collabs contacts when the pills are mixed of selectType and contactType',
    /*#__PURE__*/
    _asyncToGenerator(
    /*#__PURE__*/
    regeneratorRuntime.mark(function _callee6() {
      var pills, state, getContactsByEmail, expectedSelectedContacts, wrapper, newSelectedContacts;
      return regeneratorRuntime.wrap(function _callee6$(_context6) {
        while (1) {
          switch (_context6.prev = _context6.next) {
            case 0:
              pills = [{
                displayText: displayText,
                text: text,
                value: value
              }, {
                id: 123
              }];
              state = {
                inviteCollabsContacts: inviteCollabsContacts
              };
              getContactsByEmail = jest.fn().mockResolvedValue(_defineProperty({}, email, {
                email: email,
                id: id,
                isExternalUser: isExternalUser,
                name: name,
                type: type
              }));
              expectedSelectedContacts = [{
                email: email,
                id: id,
                isExternalUser: isExternalUser,
                name: name,
                text: text,
                type: type,
                value: value
              }];
              wrapper = getWrapper({
                getContactsByEmail: getContactsByEmail
              });
              wrapper.setState(state);
              _context6.next = 8;
              return wrapper.instance().onPillCreate('inviteCollabsContacts', pills);

            case 8:
              newSelectedContacts = wrapper.state('inviteCollabsContacts');
              expect(newSelectedContacts).toEqual(expectedSelectedContacts);

            case 10:
            case "end":
              return _context6.stop();
          }
        }
      }, _callee6);
    })));
    test('should retrieve emails and set the state for email shared link contacts',
    /*#__PURE__*/
    _asyncToGenerator(
    /*#__PURE__*/
    regeneratorRuntime.mark(function _callee7() {
      var pills, state, getContactsByEmail, expectedSelectedContacts, wrapper, newSelectedContacts;
      return regeneratorRuntime.wrap(function _callee7$(_context7) {
        while (1) {
          switch (_context7.prev = _context7.next) {
            case 0:
              pills = [{
                displayText: displayText,
                text: text,
                value: value
              }];
              state = {
                emailSharedLinkContacts: emailSharedLinkContacts
              };
              getContactsByEmail = jest.fn().mockResolvedValue(_defineProperty({}, email, {
                email: email,
                id: id,
                isExternalUser: isExternalUser,
                name: name,
                type: type
              }));
              expectedSelectedContacts = [{
                email: email,
                id: id,
                isExternalUser: isExternalUser,
                name: name,
                text: text,
                type: type,
                value: value
              }];
              wrapper = getWrapper({
                getContactsByEmail: getContactsByEmail
              });
              wrapper.setState(state);
              _context7.next = 8;
              return wrapper.instance().onPillCreate('emailSharedLinkContacts', pills);

            case 8:
              newSelectedContacts = wrapper.state('emailSharedLinkContacts');
              expect(newSelectedContacts).toEqual(expectedSelectedContacts);

            case 10:
            case "end":
              return _context7.stop();
          }
        }
      }, _callee7);
    })));
  });
  describe('hasExternalContact()', function () {
    test('should return true if the invited collabs include at least one external user', function () {
      var wrapper = getWrapper();
      wrapper.setState({
        inviteCollabsContacts: defaultContacts
      });
      expect(wrapper.instance().hasExternalContact('inviteCollabsContacts')).toBe(true);
    });
    test('should return false if the invited collabs does not include any external user', function () {
      var contacts = [{
        email: 'x@example.com',
        id: '12345',
        isExternalUser: false,
        name: 'X User',
        type: 'group'
      }, {
        email: 'z@example.com',
        id: '34567',
        isExternalUser: false,
        name: 'Z User',
        type: 'user'
      }];
      var wrapper = getWrapper();
      wrapper.setState({
        inviteCollabsContacts: contacts
      });
      expect(wrapper.instance().hasExternalContact('inviteCollabsContacts')).toBe(false);
    });
    test('should return true if the "Email Shared Link" contacts include at least one external user', function () {
      var wrapper = getWrapper();
      wrapper.setState({
        emailSharedLinkContacts: defaultContacts
      });
      expect(wrapper.instance().hasExternalContact('emailSharedLinkContacts')).toBe(true);
    });
    test('should not set isExternalUserInEmailSharedLinkContacts to true if the "Email Shared Link" contacts does not include any external user', function () {
      var contacts = [{
        email: 'x@example.com',
        id: '12345',
        isExternalUser: false,
        name: 'X User',
        type: 'group'
      }, {
        email: 'z@example.com',
        id: '34567',
        isExternalUser: false,
        name: 'Z User',
        type: 'user'
      }];
      var wrapper = getWrapper();
      wrapper.setState({
        emailSharedLinkContacts: contacts
      });
      expect(wrapper.instance().hasExternalContact('emailSharedLinkContacts')).toBe(false);
    });
    test('should set isInviteSectionExpanded and inviteCollabsContacts correctly if there are initiallySelectedContacts', function () {
      var initiallySelectedContacts = [{
        email: 'x@example.com',
        id: '12345',
        isExternalUser: false,
        name: 'X User',
        type: 'group'
      }];
      var wrapper = getWrapper({
        initiallySelectedContacts: initiallySelectedContacts
      });
      expect(wrapper.state('inviteCollabsContacts')).toEqual(initiallySelectedContacts);
      expect(wrapper.state('isInviteSectionExpanded')).toEqual(true);
    });
    test('should set isInviteSectionExpanded and inviteCollabsContacts correctly if there are NO initiallySelectedContacts', function () {
      var wrapper = getWrapper();
      expect(wrapper.state('inviteCollabsContacts')).toEqual([]);
      expect(wrapper.state('isInviteSectionExpanded')).toEqual(false);
    });
  });
  describe('renderCollaboratorAvatars()', function () {
    test('should not render if hideCollaborators is true and canInvite is false', function () {
      var wrapper = getWrapper({
        canInvite: false,
        item: {
          hideCollaborators: true
        }
      });
      var emailForm = wrapper.find('EmailForm');
      var contactsFieldAvatars = emailForm.prop('contactsFieldAvatars');
      expect(contactsFieldAvatars).toMatchSnapshot();
    });
    test('should filter out current user', function () {
      var wrapper = getWrapper({
        currentUserID: '1234',
        collaboratorsList: {
          collaborators: [{
            userID: 1234
          }, {
            userID: 5678
          }]
        }
      });
      var emailForm = wrapper.find('EmailForm');
      var contactsFieldAvatars = emailForm.prop('contactsFieldAvatars');
      expect(contactsFieldAvatars).toMatchSnapshot();
    });
  });
  describe('renderInviteSection()', function () {
    test('should pass the config object into EmailForm', function () {
      var config = {
        showEmailSharedLinkForm: true,
        showInviteCollaboratorMessageSection: true
      };
      var wrapper = getWrapper({
        config: config
      });
      expect(wrapper.find('EmailForm').prop('config')).toBe(config);
    });
  });
});