function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

import * as React from 'react';
import { ITEM_TYPE_WEBLINK, ITEM_TYPE_FOLDER } from '../../../common/constants';
import { UnifiedShareModalBase as UnifiedShareModal } from '../UnifiedShareModal';
describe('features/unified-share-modal/UnifiedShareModal', function () {
  var intl = {
    formatMessage: jest.fn()
  };
  var defaultItem = {
    id: '111',
    name: 'test file',
    type: 'file',
    grantedPermissions: {
      itemShare: true
    },
    hideCollaborators: false
  };
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
    return shallow(React.createElement(UnifiedShareModal, _extends({
      classification: {
        definition: undefined,
        name: undefined
      },
      collaborationRestrictionWarning: "",
      collaboratorsList: collaboratorsList,
      getInitialData: jest.fn().mockImplementation(function () {
        return Promise.resolve('test');
      }),
      intl: intl,
      inviteePermissions: [testPermission],
      item: defaultItem,
      sharedLink: {},
      trackingProps: props.trackingProps || defaultTrackingProps
    }, props)));
  };

  describe('render()', function () {
    test('should render a default component with default props', function () {
      var wrapper = getWrapper();
      wrapper.setState({
        isFetching: false
      });
      expect(wrapper).toMatchSnapshot();
    });
    test('should render an allShareRestrictionWarning message when it is available', function () {
      var SharingRestrictionWarning = React.createElement("div", {
        className: "test-class"
      }, "Sharing is prohibited");
      var wrapper = getWrapper({
        allShareRestrictionWarning: SharingRestrictionWarning
      });
      wrapper.setState({
        isFetching: false
      });
      expect(wrapper.find('.test-class')).toMatchSnapshot();
    });
    test('should render a default component in initial loading state', function () {
      var wrapper = getWrapper();
      wrapper.setState({
        isFetching: true
      });
      expect(wrapper).toMatchSnapshot();
    });
    test('should render a default component when showing invite section expanded', function () {
      var wrapper = getWrapper();
      wrapper.setState({
        isFetching: false,
        isInviteSectionExpanded: true
      });
      expect(wrapper).toMatchSnapshot();
    });
    test('should render a default component FTUX based on enabled prop and state', function () {
      var wrapper = getWrapper({
        showCalloutForUser: true
      });
      wrapper.setState({
        shouldRenderFTUXTooltip: true
      });
      expect(wrapper).toMatchSnapshot();
    });
    test('should not render a default component FTUX when prop is false', function () {
      var wrapper = getWrapper({
        showCalloutForUser: false
      });
      wrapper.setState({
        shouldRenderFTUXTooltip: true
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
      var wrapper = getWrapper();
      wrapper.setState({
        isFetching: false,
        isConfirmModalOpen: true
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
        item: item
      });
      wrapper.setState({
        isFetching: false
      });
      expect(wrapper).toMatchSnapshot();
    });
    test('should render a default component with send invite error specified', function () {
      var errorNode = React.createElement("span", null, "Some Error");
      var wrapper = getWrapper({
        canInvite: true,
        sendInvitesError: errorNode
      });
      wrapper.setState({
        isFetching: false,
        isInviteSectionExpanded: true
      });
      expect(wrapper).toMatchSnapshot();
    });
    test('should render a default component with collaboration restriction warning specified and invite section is expanded', function () {
      var collaborationRestrictionWarning = 'Collaboration invitations can only be sent to people within company.';
      var wrapper = getWrapper({
        canInvite: true,
        collaborationRestrictionWarning: collaborationRestrictionWarning
      });
      wrapper.setState({
        isFetching: false,
        isInviteSectionExpanded: true
      });
      expect(wrapper).toMatchSnapshot();
    });
    test('should render a default component with collaboration restriction warning specified and invite section is NOT expanded', function () {
      var collaborationRestrictionWarning = 'Collaboration invitations can only be sent to people within company.';
      var wrapper = getWrapper({
        canInvite: true,
        collaborationRestrictionWarning: collaborationRestrictionWarning
      });
      wrapper.setState({
        isFetching: false,
        isInviteSectionExpanded: false
      });
      expect(wrapper).toMatchSnapshot();
    });
    test('should render a default component with invitee permissions listed', function () {
      var wrapper = getWrapper({
        canInvite: true,
        submitting: false,
        inviteePermissions: ['Editor']
      });
      wrapper.setState({
        isFetching: false
      });
      expect(wrapper).toMatchSnapshot();
    });
    test('should render a default component with upgrade CTA when showUpgradeOptions is enabled', function () {
      var wrapper = getWrapper({
        canInvite: true,
        showUpgradeOptions: true
      });
      wrapper.setState({
        isFetching: false,
        isInviteSectionExpanded: true
      });
      expect(wrapper).toMatchSnapshot();
    });
    test('should render a default component with correct Focus element and props when focusSharedLinkOnLoad is enabled', function () {
      var wrapper = getWrapper({
        focusSharedLinkOnLoad: true,
        sharedLink: {
          url: 'https://foo.com'
        }
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
        }
      });
      wrapper.setState({
        isEmailLinkSectionExpanded: false,
        isInviteSectionExpanded: false,
        sharedLinkLoaded: true
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
  describe('getInitialData()', function () {
    test('getInitialData is not called when item.type is null', function () {
      var getInitialDataStub = jest.fn();

      var item = _objectSpread({}, defaultItem, {
        type: null,
        typedID: 'f_id'
      });

      getWrapper({
        item: item,
        getInitialData: getInitialDataStub
      });
      expect(getInitialDataStub).toHaveBeenCalledTimes(0);
    });
    test('getInitialData is not called when item.typedID is null', function () {
      var getInitialDataStub = jest.fn();

      var item = _objectSpread({}, defaultItem, {
        type: 'folder',
        typedID: null
      });

      getWrapper({
        item: item,
        getInitialData: getInitialDataStub
      });
      expect(getInitialDataStub).toHaveBeenCalledTimes(0);
    });
    test('getInitialData is called and getInitialDataCalled is set to true', function () {
      var getInitialDataStub = jest.fn().mockImplementation(function () {
        return Promise.resolve('test');
      });

      var item = _objectSpread({}, defaultItem, {
        type: 'folder',
        typedID: 'f_id'
      });

      var wrapper = getWrapper({
        item: item,
        getInitialData: getInitialDataStub
      });
      expect(getInitialDataStub).toHaveBeenCalled();
      expect(wrapper.state('getInitialDataCalled')).toBe(true);
    });
  });
  describe('handleFtuxCloseClick()', function () {
    var wrapper = getWrapper();
    wrapper.instance().handleFtuxCloseClick();
    expect(wrapper.state('shouldRenderFTUXTooltip')).toEqual(false);
  });
  describe('closeConfirmModal()', function () {
    test('should keep the state as closed when called', function () {
      var wrapper = getWrapper();
      wrapper.instance().closeConfirmModal();
      expect(wrapper.state('isConfirmModalOpen')).toBe(false);
    });
    test('should set the state to closed if it was formerly open', function () {
      var wrapper = getWrapper();
      wrapper.instance().openConfirmModal();
      expect(wrapper.state('isConfirmModalOpen')).toBe(true);
      wrapper.instance().closeConfirmModal();
      expect(wrapper.state('isConfirmModalOpen')).toBe(false);
    });
  });
});