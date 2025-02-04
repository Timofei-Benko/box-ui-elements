function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

/* eslint-disable no-console */
import * as React from 'react';
import { IntlProvider } from 'react-intl';
import { State, Store } from '@sambego/storybook-state';
import Button from '../../../components/button/Button';
import UnifiedShareModal from '../UnifiedShareModal';
import notes from './UnifiedShareModal.stories.md';
import * as constants from '../constants'; // Base Example. Extend for different initial loads or to demonstrate different interactions

var DEFAULT_SHARED_LINK_STATE = {
  accessLevel: '',
  allowedAccessLevels: {},
  canChangeAccessLevel: true,
  enterpriseName: '',
  expirationTimestamp: null,
  isDownloadSettingAvailable: true,
  isNewSharedLink: false,
  permissionLevel: '',
  url: ''
};
var INITIAL_STATE = {
  isConfirmModalOpen: false,
  isOpen: false,
  item: {
    bannerPolicy: {
      body: 'test'
    },
    canUserSeeClassification: true,
    classification: 'internal',
    grantedPermissions: {
      itemShare: true
    },
    hideCollaborators: false,
    id: 12345,
    name: 'My Example Folder',
    type: 'folder',
    typedID: 'd_12345'
  },
  collaboratorsList: {
    collaborators: []
  },
  selectorOptions: [],
  sharedLink: DEFAULT_SHARED_LINK_STATE,
  submitting: false
};
var contacts = [{
  id: '0',
  collabID: 0,
  name: 'Jackie',
  email: 'j@example.com',
  type: 'user',
  hasCustomAvatar: false,
  translatedRole: 'Owner',
  userID: '0',
  profileURL: 'https://foo.bar'
}, {
  id: '1',
  collabID: '1',
  name: 'Jeff',
  email: 'jt@example.com',
  type: 'user',
  hasCustomAvatar: false,
  translatedRole: 'Viewer',
  userID: '1'
}, {
  id: '2',
  collabID: '2',
  name: 'David',
  email: 'dt@example.com',
  type: 'user',
  hasCustomAvatar: false,
  translatedRole: 'Editor',
  userID: '2'
}, {
  id: '3',
  collabID: '3',
  name: 'Yang',
  email: 'yz@example.com',
  type: 'user',
  hasCustomAvatar: false,
  translatedRole: 'Editor',
  userID: '3'
}, {
  id: '4',
  collabID: '4',
  name: 'Yong',
  email: 'ysu@example.com',
  type: 'user',
  hasCustomAvatar: false,
  translatedRole: 'Editor',
  userID: '4'
}, {
  id: '5',
  collabID: '5',
  name: 'Will',
  email: 'wy@example.com',
  type: 'pending',
  hasCustomAvatar: false,
  translatedRole: 'Editor',
  userID: '5'
}, {
  id: '6',
  collabID: '6',
  name: 'Dave',
  email: 'd@example.com',
  type: 'user',
  hasCustomAvatar: false,
  translatedRole: 'Editor',
  userID: '6'
}, {
  id: '7',
  collabID: '7',
  name: 'Ke',
  email: 'k@example.com',
  isExternalUser: true,
  type: 'user',
  hasCustomAvatar: false,
  translatedRole: 'Editor',
  userID: '7'
}, {
  id: '8',
  collabID: '8',
  name: 'Wenbo',
  email: 'w@example.com',
  type: 'user',
  hasCustomAvatar: false,
  translatedRole: 'Editor',
  userID: '8'
}, {
  id: '11',
  collabID: '11',
  name: 'Supersupersupersuperreallyreallyreallylongfirstname incrediblyspectacularlylonglastname',
  email: 'Supersupersupersuperreallyreallyreallyincrediblyspectacularlylongemail@example.com',
  type: 'user',
  hasCustomAvatar: false,
  translatedRole: 'Editor',
  userID: '11'
}, {
  /* example group contact */
  id: '14',
  collabID: '14',
  type: 'group',
  name: 'my group',
  hasCustomAvatar: false,
  translatedRole: 'Viewer',
  userID: null
}];

var createComponentStore = function createComponentStore() {
  return new Store(INITIAL_STATE);
};

export var basic = function basic() {
  var componentStore = createComponentStore();

  var closeModal = function closeModal() {
    componentStore.set({
      isOpen: false,
      sharedLink: DEFAULT_SHARED_LINK_STATE,
      collaboratorsList: {
        collaborators: []
      }
    });
  };

  var fakeRequest = function fakeRequest() {
    // submitting is used to disable input fields, and not to show the loading indicator
    componentStore.set({
      submitting: true
    });
    return new Promise(function (resolve) {
      setTimeout(function () {
        componentStore.set({
          submitting: false
        });
        resolve();
      }, 500);
    });
  };

  var getInitialData = function getInitialData() {
    var initialPromise = fakeRequest();
    var fetchCollaborators = new Promise(function (resolved) {
      setTimeout(function () {
        var collaborators = contacts.slice().map(function (contact) {
          // convert the existing contact entries to compatible collaborator entries in this example
          var collaborator = {
            collabID: 1234,
            email: contact.email,
            id: contact.id,
            name: contact.name || '',
            type: contact.type !== 'group' ? constants.COLLAB_USER_TYPE : constants.COLLAB_GROUP_TYPE,
            isExternalCollab: contact.isExternalUser || false,
            userID: parseInt(contact.id, 10),
            expiration: {
              executeAt: contact.isExternalUser ? 'November 27, 2022' : ''
            },
            hasCustomAvatar: false,
            imageURL: null
          };
          return collaborator;
        });
        var collaboratorsList = {
          collaborators: collaborators
        };
        componentStore.set({
          collaboratorsList: collaboratorsList
        });
        resolved();
      }, 1000);
    });
    return Promise.all([initialPromise, fetchCollaborators]);
  };

  return React.createElement(State, {
    store: componentStore
  }, function (state) {
    return React.createElement(IntlProvider, {
      locale: "en"
    }, React.createElement("div", null, state.isOpen && React.createElement(UnifiedShareModal, {
      canInvite: true,
      changeSharedLinkAccessLevel: function changeSharedLinkAccessLevel(newLevel) {
        return fakeRequest().then(function () {
          return componentStore.set({
            sharedLink: _objectSpread({}, state.sharedLink, {
              accessLevel: newLevel
            })
          });
        });
      },
      changeSharedLinkPermissionLevel: function changeSharedLinkPermissionLevel(newLevel) {
        return fakeRequest().then(function () {
          return componentStore.set({
            sharedLink: _objectSpread({}, state.sharedLink, {
              permissionLevel: newLevel
            })
          });
        });
      },
      collaboratorsList: state.collaboratorsList,
      collaborationRestrictionWarning: "Collaboration invitations can only be sent to people within Box Corporate",
      currentUserID: "0",
      getCollaboratorContacts: function getCollaboratorContacts() {
        return Promise.resolve(contacts);
      },
      getSharedLinkContacts: function getSharedLinkContacts() {
        return Promise.resolve(contacts);
      },
      getInitialData: getInitialData,
      inviteePermissions: [{
        default: false,
        text: 'Co-owner',
        value: 'Co-owner'
      }, {
        default: true,
        text: 'Editor',
        value: 'Editor'
      }, {
        default: false,
        text: 'Viewer Uploader',
        value: 'Viewer Uploader'
      }, {
        default: false,
        text: 'Previewer Uploader',
        value: 'Previewer Uploader'
      }, {
        default: false,
        text: 'Viewer',
        value: 'Viewer'
      }, {
        default: false,
        text: 'Previewer',
        value: 'Previewer'
      }, {
        default: false,
        text: 'Uploader',
        value: 'Uploader'
      }],
      isOpen: state.isOpen,
      isToggleEnabled: true,
      item: state.item,
      onAddLink: function onAddLink() {
        fakeRequest().then(function () {
          componentStore.set({
            sharedLink: {
              accessLevel: 'peopleInYourCompany',
              allowedAccessLevels: {
                peopleWithTheLink: true,
                peopleInYourCompany: true,
                peopleInThisItem: true
              },
              canChangeAccessLevel: true,
              enterpriseName: 'Box',
              expirationTimestamp: 1509173940,
              isDownloadSettingAvailable: true,
              isNewSharedLink: true,
              permissionLevel: 'canViewDownload',
              url: 'https://box.com/s/abcdefg'
            }
          });
        });
      },
      onRemoveLink: function onRemoveLink() {
        fakeRequest().then(function () {
          componentStore.set({
            sharedLink: DEFAULT_SHARED_LINK_STATE
          });
          closeModal();
        });
      },
      onRequestClose: closeModal
      /* eslint-disable-next-line no-alert */
      ,
      onSettingsClick: function onSettingsClick() {
        return alert('hi!');
      },
      recommendedSharingTooltipCalloutName: "",
      sendInvites: function sendInvites() {
        return fakeRequest().then(function () {
          closeModal();
        });
      },
      sendInvitesError: "",
      sendSharedLink: function sendSharedLink() {
        return fakeRequest().then(function () {
          closeModal();
        });
      },
      sendSharedLinkError: "",
      sharedLink: state.sharedLink,
      showCalloutForUser: true,
      showUpgradeOptions: true,
      submitting: state.submitting,
      suggestedCollaborators: {
        '2': {
          id: '2',
          userScore: 0.1,
          name: 'David',
          email: 'dt@example.com',
          type: 'user'
        },
        '5': {
          id: '5',
          userScore: 0.2,
          name: 'Will',
          email: 'wy@example.com',
          type: 'user'
        },
        '1': {
          id: '1',
          userScore: 0.5,
          name: 'Jeff',
          email: 'jt@example.com',
          type: 'user'
        },
        '3': {
          id: '3',
          userScore: 2,
          name: 'Yang',
          email: 'yz@example.com',
          type: 'user'
        }
      },
      trackingProps: {
        collaboratorListTracking: {},
        inviteCollabsEmailTracking: {},
        inviteCollabTracking: {},
        modalTracking: {},
        removeLinkConfirmModalTracking: {},
        sharedLinkEmailTracking: {},
        sharedLinkTracking: {}
      }
    }), React.createElement(Button, {
      onClick: function onClick() {
        return componentStore.set({
          isOpen: true
        });
      }
    }, "Open USM Modal")));
  });
};
export var withSharedLink = function withSharedLink() {
  var componentStore = createComponentStore();

  var closeModal = function closeModal() {
    componentStore.set({
      isOpen: false,
      sharedLink: DEFAULT_SHARED_LINK_STATE,
      collaboratorsList: {
        collaborators: []
      }
    });
  };

  var fakeRequest = function fakeRequest() {
    // submitting is used to disable input fields, and not to show the loading indicator
    componentStore.set({
      submitting: true
    });
    return new Promise(function (resolve) {
      setTimeout(function () {
        componentStore.set({
          submitting: false
        });
        resolve();
      }, 500);
    });
  };

  var getInitialData = function getInitialData() {
    var resolveSharedLink = new Promise(function (resolved) {
      setTimeout(function () {
        componentStore.set({
          sharedLink: {
            accessLevel: 'peopleInYourCompany',
            allowedAccessLevels: {
              peopleWithTheLink: true,
              peopleInYourCompany: true,
              peopleInThisItem: true
            },
            canChangeAccessLevel: true,
            enterpriseName: 'Box',
            expirationTimestamp: 1509173940,
            isDownloadSettingAvailable: true,
            permissionLevel: 'canViewDownload',
            url: 'https://box.com/s/abcdefg'
          }
        });
        resolved();
      }, 400);
    });
    return Promise.all([fakeRequest, resolveSharedLink]);
  };

  return React.createElement(State, {
    store: componentStore
  }, function (state) {
    return React.createElement(IntlProvider, {
      locale: "en"
    }, React.createElement("div", null, state.isOpen && React.createElement(UnifiedShareModal, {
      canInvite: true,
      changeSharedLinkAccessLevel: function changeSharedLinkAccessLevel(newLevel) {
        return fakeRequest().then(function () {
          return componentStore.set({
            sharedLink: _objectSpread({}, state.sharedLink, {
              accessLevel: newLevel
            })
          });
        });
      },
      changeSharedLinkPermissionLevel: function changeSharedLinkPermissionLevel(newLevel) {
        return fakeRequest().then(function () {
          return componentStore.set({
            sharedLink: _objectSpread({}, state.sharedLink, {
              permissionLevel: newLevel
            })
          });
        });
      },
      collaboratorsList: state.collaboratorsList,
      collaborationRestrictionWarning: "Collaboration invitations can only be sent to people within Box Corporate",
      currentUserID: "0",
      focusSharedLinkOnLoad: false,
      getCollaboratorContacts: function getCollaboratorContacts() {
        return Promise.resolve(contacts);
      },
      getSharedLinkContacts: function getSharedLinkContacts() {
        return Promise.resolve(contacts);
      },
      getInitialData: getInitialData,
      inviteePermissions: [{
        default: false,
        text: 'Co-owner',
        value: 'Co-owner'
      }, {
        default: true,
        text: 'Editor',
        value: 'Editor'
      }, {
        default: false,
        text: 'Viewer Uploader',
        value: 'Viewer Uploader'
      }, {
        default: false,
        text: 'Previewer Uploader',
        value: 'Previewer Uploader'
      }, {
        default: false,
        text: 'Viewer',
        value: 'Viewer'
      }, {
        default: false,
        text: 'Previewer',
        value: 'Previewer'
      }, {
        default: false,
        text: 'Uploader',
        value: 'Uploader'
      }],
      isOpen: state.isOpen,
      isToggleEnabled: true,
      item: state.item,
      onAddLink: function onAddLink() {
        fakeRequest().then(function () {
          componentStore.set({
            sharedLink: {
              accessLevel: 'peopleInYourCompany',
              allowedAccessLevels: {
                peopleWithTheLink: true,
                peopleInYourCompany: true,
                peopleInThisItem: true
              },
              canChangeAccessLevel: true,
              enterpriseName: 'Box',
              expirationTimestamp: 1509173940,
              isDownloadSettingAvailable: true,
              isNewSharedLink: true,
              permissionLevel: 'canViewDownload',
              url: 'https://box.com/s/abcdefg'
            }
          });
        });
      },
      onRemoveLink: function onRemoveLink() {
        fakeRequest().then(function () {
          componentStore.set({
            sharedLink: DEFAULT_SHARED_LINK_STATE
          });
          closeModal();
        });
      },
      onRequestClose: closeModal
      /* eslint-disable-next-line no-alert */
      ,
      onSettingsClick: function onSettingsClick() {
        return alert('hi!');
      },
      recommendedSharingTooltipCalloutName: "",
      sendInvites: function sendInvites() {
        return fakeRequest().then(function () {
          closeModal();
        });
      },
      sendInvitesError: "",
      sendSharedLink: function sendSharedLink() {
        return fakeRequest().then(function () {
          closeModal();
        });
      },
      sendSharedLinkError: "",
      sharedLink: state.sharedLink,
      showCalloutForUser: true,
      showUpgradeOptions: true,
      submitting: state.submitting,
      suggestedCollaborators: {
        '2': {
          id: '2',
          userScore: 0.1,
          name: 'David',
          email: 'dt@example.com',
          type: 'user'
        },
        '5': {
          id: '5',
          userScore: 0.2,
          name: 'Will',
          email: 'wy@example.com',
          type: 'user'
        },
        '1': {
          id: '1',
          userScore: 0.5,
          name: 'Jeff',
          email: 'jt@example.com',
          type: 'user'
        },
        '3': {
          id: '3',
          userScore: 2,
          name: 'Yang',
          email: 'yz@example.com',
          type: 'user'
        }
      },
      trackingProps: {
        collaboratorListTracking: {},
        inviteCollabsEmailTracking: {},
        inviteCollabTracking: {},
        modalTracking: {},
        removeLinkConfirmModalTracking: {},
        sharedLinkEmailTracking: {},
        sharedLinkTracking: {}
      }
    }), React.createElement(Button, {
      onClick: function onClick() {
        return componentStore.set({
          isOpen: true
        });
      }
    }, "Open USM Modal")));
  });
};
export var withAutofocusedSharedLink = function withAutofocusedSharedLink() {
  var componentStore = createComponentStore();

  var closeModal = function closeModal() {
    componentStore.set({
      isOpen: false,
      sharedLink: DEFAULT_SHARED_LINK_STATE,
      collaboratorsList: {
        collaborators: []
      }
    });
  };

  var fakeRequest = function fakeRequest() {
    // submitting is used to disable input fields, and not to show the loading indicator
    componentStore.set({
      submitting: true
    });
    return new Promise(function (resolve) {
      setTimeout(function () {
        componentStore.set({
          submitting: false
        });
        resolve();
      }, 500);
    });
  };

  var getInitialData = function getInitialData() {
    var resolveSharedLink = new Promise(function (resolved) {
      setTimeout(function () {
        componentStore.set({
          sharedLink: {
            accessLevel: 'peopleInYourCompany',
            allowedAccessLevels: {
              peopleWithTheLink: true,
              peopleInYourCompany: true,
              peopleInThisItem: true
            },
            canChangeAccessLevel: true,
            enterpriseName: 'Box',
            expirationTimestamp: 1509173940,
            isDownloadSettingAvailable: true,
            permissionLevel: 'canViewDownload',
            url: 'https://box.com/s/abcdefg'
          }
        });
        resolved();
      }, 400);
    });
    return Promise.all([fakeRequest, resolveSharedLink]);
  };

  return React.createElement(State, {
    store: componentStore
  }, function (state) {
    return React.createElement(IntlProvider, {
      locale: "en"
    }, React.createElement("div", null, state.isOpen && React.createElement(UnifiedShareModal, {
      canInvite: true,
      changeSharedLinkAccessLevel: function changeSharedLinkAccessLevel(newLevel) {
        return fakeRequest().then(function () {
          return componentStore.set({
            sharedLink: _objectSpread({}, state.sharedLink, {
              accessLevel: newLevel
            })
          });
        });
      },
      changeSharedLinkPermissionLevel: function changeSharedLinkPermissionLevel(newLevel) {
        return fakeRequest().then(function () {
          return componentStore.set({
            sharedLink: _objectSpread({}, state.sharedLink, {
              permissionLevel: newLevel
            })
          });
        });
      },
      collaboratorsList: state.collaboratorsList,
      collaborationRestrictionWarning: "Collaboration invitations can only be sent to people within Box Corporate",
      currentUserID: "0",
      focusSharedLinkOnLoad: true,
      getCollaboratorContacts: function getCollaboratorContacts() {
        return Promise.resolve(contacts);
      },
      getSharedLinkContacts: function getSharedLinkContacts() {
        return Promise.resolve(contacts);
      },
      getInitialData: getInitialData,
      inviteePermissions: [{
        default: false,
        text: 'Co-owner',
        value: 'Co-owner'
      }, {
        default: true,
        text: 'Editor',
        value: 'Editor'
      }, {
        default: false,
        text: 'Viewer Uploader',
        value: 'Viewer Uploader'
      }, {
        default: false,
        text: 'Previewer Uploader',
        value: 'Previewer Uploader'
      }, {
        default: false,
        text: 'Viewer',
        value: 'Viewer'
      }, {
        default: false,
        text: 'Previewer',
        value: 'Previewer'
      }, {
        default: false,
        text: 'Uploader',
        value: 'Uploader'
      }],
      isOpen: state.isOpen,
      isToggleEnabled: true,
      item: state.item,
      onAddLink: function onAddLink() {
        fakeRequest().then(function () {
          componentStore.set({
            sharedLink: {
              accessLevel: 'peopleInYourCompany',
              allowedAccessLevels: {
                peopleWithTheLink: true,
                peopleInYourCompany: true,
                peopleInThisItem: true
              },
              canChangeAccessLevel: true,
              enterpriseName: 'Box',
              expirationTimestamp: 1509173940,
              isDownloadSettingAvailable: true,
              isNewSharedLink: true,
              permissionLevel: 'canViewDownload',
              url: 'https://box.com/s/abcdefg'
            }
          });
        });
      },
      onRemoveLink: function onRemoveLink() {
        fakeRequest().then(function () {
          componentStore.set({
            sharedLink: DEFAULT_SHARED_LINK_STATE
          });
          closeModal();
        });
      },
      onRequestClose: closeModal
      /* eslint-disable-next-line no-alert */
      ,
      onSettingsClick: function onSettingsClick() {
        return alert('hi!');
      },
      recommendedSharingTooltipCalloutName: "",
      sendInvites: function sendInvites() {
        return fakeRequest().then(function () {
          closeModal();
        });
      },
      sendInvitesError: "",
      sendSharedLink: function sendSharedLink() {
        return fakeRequest().then(function () {
          closeModal();
        });
      },
      sendSharedLinkError: "",
      sharedLink: state.sharedLink,
      showCalloutForUser: true,
      showUpgradeOptions: true,
      submitting: state.submitting,
      suggestedCollaborators: {
        '2': {
          id: '2',
          userScore: 0.1,
          name: 'David',
          email: 'dt@example.com',
          type: 'user'
        },
        '5': {
          id: '5',
          userScore: 0.2,
          name: 'Will',
          email: 'wy@example.com',
          type: 'user'
        },
        '1': {
          id: '1',
          userScore: 0.5,
          name: 'Jeff',
          email: 'jt@example.com',
          type: 'user'
        },
        '3': {
          id: '3',
          userScore: 2,
          name: 'Yang',
          email: 'yz@example.com',
          type: 'user'
        }
      },
      trackingProps: {
        collaboratorListTracking: {},
        inviteCollabsEmailTracking: {},
        inviteCollabTracking: {},
        modalTracking: {},
        removeLinkConfirmModalTracking: {},
        sharedLinkEmailTracking: {},
        sharedLinkTracking: {}
      }
    }), React.createElement(Button, {
      onClick: function onClick() {
        return componentStore.set({
          isOpen: true
        });
      }
    }, "Open USM Modal")));
  });
};
export var withFormOnly = function withFormOnly() {
  var componentStore = createComponentStore();

  var fakeRequest = function fakeRequest() {
    // submitting is used to disable input fields, and not to show the loading indicator
    componentStore.set({
      submitting: true
    });
    return new Promise(function (resolve) {
      setTimeout(function () {
        componentStore.set({
          submitting: false
        });
        resolve();
      }, 500);
    });
  };

  var getInitialData = function getInitialData() {
    var initialPromise = fakeRequest();
    var fetchCollaborators = new Promise(function (resolved) {
      setTimeout(function () {
        var collaborators = contacts.slice();
        var collaboratorsList = {
          collaborators: collaborators
        };
        componentStore.set({
          collaboratorsList: collaboratorsList
        });
        resolved();
      }, 1000);
    });
    return Promise.all([initialPromise, fetchCollaborators]);
  };

  return React.createElement(State, {
    store: componentStore
  }, function (state) {
    return React.createElement(IntlProvider, {
      locale: "en"
    }, React.createElement(UnifiedShareModal, {
      canInvite: true,
      changeSharedLinkAccessLevel: function changeSharedLinkAccessLevel(newLevel) {
        return fakeRequest().then(function () {
          return componentStore.set({
            sharedLink: _objectSpread({}, state.sharedLink, {
              accessLevel: newLevel
            })
          });
        });
      },
      changeSharedLinkPermissionLevel: function changeSharedLinkPermissionLevel(newLevel) {
        return fakeRequest().then(function () {
          return componentStore.set({
            sharedLink: _objectSpread({}, state.sharedLink, {
              permissionLevel: newLevel
            })
          });
        });
      },
      collaboratorsList: state.collaboratorsList,
      collaborationRestrictionWarning: "Collaboration invitations can only be sent to people within Box Corporate",
      currentUserID: "0",
      displayInModal: false,
      getCollaboratorContacts: function getCollaboratorContacts() {
        return Promise.resolve(contacts);
      },
      getSharedLinkContacts: function getSharedLinkContacts() {
        return Promise.resolve(contacts);
      },
      getInitialData: getInitialData,
      inviteePermissions: [{
        default: false,
        text: 'Co-owner',
        value: 'Co-owner'
      }, {
        default: true,
        text: 'Editor',
        value: 'Editor'
      }, {
        default: false,
        text: 'Viewer Uploader',
        value: 'Viewer Uploader'
      }, {
        default: false,
        text: 'Previewer Uploader',
        value: 'Previewer Uploader'
      }, {
        default: false,
        text: 'Viewer',
        value: 'Viewer'
      }, {
        default: false,
        text: 'Previewer',
        value: 'Previewer'
      }, {
        default: false,
        text: 'Uploader',
        value: 'Uploader'
      }],
      isOpen: state.isOpen,
      isToggleEnabled: true,
      item: state.item,
      onAddLink: function onAddLink() {
        fakeRequest().then(function () {
          componentStore.set({
            sharedLink: {
              accessLevel: 'peopleInYourCompany',
              allowedAccessLevels: {
                peopleWithTheLink: true,
                peopleInYourCompany: true,
                peopleInThisItem: true
              },
              canChangeAccessLevel: true,
              enterpriseName: 'Box',
              expirationTimestamp: 1509173940,
              isDownloadSettingAvailable: true,
              isNewSharedLink: true,
              permissionLevel: 'canViewDownload',
              url: 'https://box.com/s/abcdefg'
            }
          });
        });
      },
      onRemoveLink: function onRemoveLink() {
        fakeRequest().then(function () {
          componentStore.set({
            sharedLink: DEFAULT_SHARED_LINK_STATE
          });
          console.log('removed link');
        });
      }
      /* eslint-disable-next-line no-alert */
      ,
      onSettingsClick: function onSettingsClick() {
        return alert('hi!');
      },
      recommendedSharingTooltipCalloutName: "",
      sendInvites: function sendInvites() {
        return fakeRequest().then(function () {
          console.log('sent invites');
        });
      },
      sendInvitesError: "",
      sendSharedLink: function sendSharedLink() {
        return fakeRequest().then(function () {
          console.log('sent shared link');
        });
      },
      sendSharedLinkError: "",
      sharedLink: state.sharedLink,
      showCalloutForUser: true,
      showFormOnly: true,
      showUpgradeOptions: true,
      submitting: state.submitting,
      suggestedCollaborators: {
        '2': {
          id: '2',
          userScore: 0.1,
          name: 'David',
          email: 'dt@example.com',
          type: 'user'
        },
        '5': {
          id: '5',
          userScore: 0.2,
          name: 'Will',
          email: 'wy@example.com',
          type: 'user'
        },
        '1': {
          id: '1',
          userScore: 0.5,
          name: 'Jeff',
          email: 'jt@example.com',
          type: 'user'
        },
        '3': {
          id: '3',
          userScore: 2,
          name: 'Yang',
          email: 'yz@example.com',
          type: 'user'
        }
      },
      trackingProps: {
        collaboratorListTracking: {},
        inviteCollabsEmailTracking: {},
        inviteCollabTracking: {},
        modalTracking: {},
        removeLinkConfirmModalTracking: {},
        sharedLinkEmailTracking: {},
        sharedLinkTracking: {}
      }
    }));
  });
};
export default {
  title: 'Features|UnifiedShareModal',
  component: UnifiedShareModal,
  parameters: {
    notes: notes
  }
};
//# sourceMappingURL=UnifiedShareModal.stories.js.map