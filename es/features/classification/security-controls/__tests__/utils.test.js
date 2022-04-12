function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

import messages from '../messages';
import appRestrictionsMessageMap from '../appRestrictionsMessageMap';
import downloadRestrictionsMessageMap from '../downloadRestrictionsMessageMap';
import { getShortSecurityControlsMessage, getFullSecurityControlsMessages } from '../utils';
import { APP_RESTRICTION_MESSAGE_TYPE, DOWNLOAD_CONTROL, LIST_ACCESS_LEVEL, MANAGED_USERS_ACCESS_LEVEL, SHARED_LINK_ACCESS_LEVEL } from '../../constants';
var DEFAULT = APP_RESTRICTION_MESSAGE_TYPE.DEFAULT,
    WITH_APP_LIST = APP_RESTRICTION_MESSAGE_TYPE.WITH_APP_LIST,
    WITH_OVERFLOWN_APP_LIST = APP_RESTRICTION_MESSAGE_TYPE.WITH_OVERFLOWN_APP_LIST;
var DESKTOP = DOWNLOAD_CONTROL.DESKTOP,
    MOBILE = DOWNLOAD_CONTROL.MOBILE,
    WEB = DOWNLOAD_CONTROL.WEB;
var BLOCK = LIST_ACCESS_LEVEL.BLOCK,
    WHITELIST = LIST_ACCESS_LEVEL.WHITELIST,
    BLACKLIST = LIST_ACCESS_LEVEL.BLACKLIST;
var OWNERS_AND_COOWNERS = MANAGED_USERS_ACCESS_LEVEL.OWNERS_AND_COOWNERS,
    OWNERS_COOWNERS_AND_EDITORS = MANAGED_USERS_ACCESS_LEVEL.OWNERS_COOWNERS_AND_EDITORS;
var COLLAB_ONLY = SHARED_LINK_ACCESS_LEVEL.COLLAB_ONLY,
    COLLAB_AND_COMPANY_ONLY = SHARED_LINK_ACCESS_LEVEL.COLLAB_AND_COMPANY_ONLY,
    PUBLIC = SHARED_LINK_ACCESS_LEVEL.PUBLIC;
describe('features/classification/security-controls/utils', function () {
  var accessPolicy;
  beforeEach(function () {
    accessPolicy = {};
  });
  describe('getShortSecurityControlsMessage()', function () {
    test('should return null when there are no restrictions', function () {
      expect(getShortSecurityControlsMessage({})).toEqual([]);
    });
    test('should not return messages when shared link restriction has a "public" access level', function () {
      accessPolicy = {
        sharedLink: {
          accessLevel: PUBLIC
        }
      };
      expect(getShortSecurityControlsMessage(accessPolicy)).toEqual([]);
    });
    test('should return correct message when all restrictions are present', function () {
      accessPolicy = {
        sharedLink: {},
        download: {},
        externalCollab: {},
        app: {},
        watermark: {}
      };
      expect(getShortSecurityControlsMessage(accessPolicy)[0].message).toBe(messages.shortAllRestrictions);
      expect(getShortSecurityControlsMessage(accessPolicy)[1].message).toBe(messages.shortWatermarking);
    });
    test('should return all restrictions message when download, app and either shared link, or external collab restrictions are present', function () {
      accessPolicy = {
        sharedLink: {},
        download: {},
        app: {}
      };
      expect(getShortSecurityControlsMessage(accessPolicy)[0].message).toBe(messages.shortAllRestrictions);
      accessPolicy = {
        externalCollab: {},
        download: {},
        app: {}
      };
      expect(getShortSecurityControlsMessage(accessPolicy)[0].message).toBe(messages.shortAllRestrictions);
    });
    test('should return correct message when download and either shared link, or external collab restrictions are present', function () {
      accessPolicy = {
        sharedLink: {},
        download: {}
      };
      expect(getShortSecurityControlsMessage(accessPolicy)[0].message).toBe(messages.shortSharingDownload);
      accessPolicy = {
        externalCollab: {},
        download: {}
      };
      expect(getShortSecurityControlsMessage(accessPolicy)[0].message).toBe(messages.shortSharingDownload);
    });
    test('should return correct message when app and either shared link, or external collab restrictions are present', function () {
      accessPolicy = {
        sharedLink: {},
        app: {}
      };
      expect(getShortSecurityControlsMessage(accessPolicy)[0].message).toBe(messages.shortSharingApp);
      accessPolicy = {
        externalCollab: {},
        app: {}
      };
      expect(getShortSecurityControlsMessage(accessPolicy)[0].message).toBe(messages.shortSharingApp);
    });
    test('should return correct message when app and download restrictions are present', function () {
      accessPolicy = {
        download: {},
        app: {}
      };
      expect(getShortSecurityControlsMessage(accessPolicy)[0].message).toBe(messages.shortDownloadApp);
    });
    test('should return correct message when there are shared link or external collab restrictions', function () {
      accessPolicy = {
        sharedLink: {},
        externalCollab: {}
      };
      expect(getShortSecurityControlsMessage(accessPolicy)[0].message).toBe(messages.shortSharing);
      accessPolicy = {
        sharedLink: {}
      };
      expect(getShortSecurityControlsMessage(accessPolicy)[0].message).toBe(messages.shortSharing);
      accessPolicy = {
        externalCollab: {}
      };
      expect(getShortSecurityControlsMessage(accessPolicy)[0].message).toBe(messages.shortSharing);
    });
    test('should return correct message when there is a download restriction', function () {
      accessPolicy = {
        download: {}
      };
      expect(getShortSecurityControlsMessage(accessPolicy)[0].message).toBe(messages.shortDownload);
    });
    test('should return correct message when there is a download restriction', function () {
      accessPolicy = {
        app: {}
      };
      expect(getShortSecurityControlsMessage(accessPolicy)[0].message).toBe(messages.shortApp);
    });
    test('should return correct message when there is a watermark restriction', function () {
      accessPolicy = {
        watermark: {}
      };
      expect(getShortSecurityControlsMessage(accessPolicy)[0].message).toBe(messages.shortWatermarking);
    });
    test('should not return tooltipMessage', function () {
      accessPolicy = {
        sharedLink: {},
        download: {},
        externalCollab: {},
        app: {}
      };
      expect(getShortSecurityControlsMessage(accessPolicy)[0].tooltipMessage).toBeUndefined();
    });
  });
  describe('getFullSecurityControlsMessages()', function () {
    test('should include correct message when shared link is restricted to collaborators', function () {
      accessPolicy = {
        sharedLink: {
          accessLevel: COLLAB_ONLY
        }
      };
      expect(getFullSecurityControlsMessages(accessPolicy)).toEqual([{
        message: messages.sharingCollabOnly
      }]);
    });
    test('should include correct message when shared link is restricted to collaborators and company', function () {
      accessPolicy = {
        sharedLink: {
          accessLevel: COLLAB_AND_COMPANY_ONLY
        }
      };
      expect(getFullSecurityControlsMessages(accessPolicy)).toEqual([{
        message: messages.sharingCollabAndCompanyOnly
      }]);
    });
    test('should include correct message when watermark is applied', function () {
      accessPolicy = {
        watermark: {
          enabled: true
        }
      };
      var formattedCompMessage = getFullSecurityControlsMessages(accessPolicy)[0].message;
      var _formattedCompMessage = formattedCompMessage.props,
          formattedCompMessageProps = _formattedCompMessage === void 0 ? {} : _formattedCompMessage;
      var expectedMessageId = 'boxui.securityControls.watermarkingAppliedWithLink';
      expect(formattedCompMessageProps.id).toEqual(expectedMessageId);
      expect(formattedCompMessage).toMatchSnapshot();
    });
    test('should include correct message when external collab is blocked', function () {
      accessPolicy = {
        externalCollab: {
          accessLevel: BLOCK
        }
      };
      expect(getFullSecurityControlsMessages(accessPolicy)).toEqual([{
        message: messages.externalCollabBlock
      }]);
    });
    test.each([WHITELIST, BLACKLIST])('should include correct message when external collab is restricted to %s', function (listType) {
      accessPolicy = {
        externalCollab: {
          accessLevel: listType
        }
      };
      expect(getFullSecurityControlsMessages(accessPolicy)).toEqual([{
        message: messages.externalCollabDomainList
      }]);
    });
    test('should include correct message when app download is blocked', function () {
      accessPolicy = {
        app: {
          accessLevel: BLOCK
        }
      };
      expect(getFullSecurityControlsMessages(accessPolicy)).toEqual([{
        message: messages.appDownloadRestricted
      }]);
    });
    test.each([WHITELIST, BLACKLIST])('should include correct message when app download is restricted by %s and apps list is not provided', function (listType) {
      accessPolicy = {
        app: {
          accessLevel: listType,
          apps: []
        }
      };
      var expectedMessage = appRestrictionsMessageMap[listType][DEFAULT];
      expect(expectedMessage).toBeTruthy();
      expect(getFullSecurityControlsMessages(accessPolicy, 3)).toEqual([{
        message: _objectSpread({}, expectedMessage, {
          values: {
            appNames: ''
          }
        })
      }]);
    });
    test.each([WHITELIST, BLACKLIST])('should include correct message when app download is restricted by %s and apps are less than maxAppCount', function (listType) {
      accessPolicy = {
        app: {
          accessLevel: listType,
          apps: [{
            displayText: 'a'
          }, {
            displayText: 'b'
          }, {
            displayText: 'c'
          }]
        }
      };
      var expectedMessage = appRestrictionsMessageMap[listType][WITH_APP_LIST];
      expect(expectedMessage).toBeTruthy();
      expect(getFullSecurityControlsMessages(accessPolicy, 3)).toEqual([{
        message: _objectSpread({}, expectedMessage, {
          values: {
            appNames: 'a, b, c'
          }
        })
      }]);
    });
    test.each([WHITELIST, BLACKLIST])('should include correct message and tooltipMessage when app download is restricted by %s and apps are maxAppCount or more', function (listType) {
      accessPolicy = {
        app: {
          accessLevel: listType,
          apps: [{
            displayText: 'a'
          }, {
            displayText: 'b'
          }, {
            displayText: 'c'
          }, {
            displayText: 'd'
          }, {
            displayText: 'e'
          }]
        }
      };
      var expectedMessage = appRestrictionsMessageMap[listType][WITH_OVERFLOWN_APP_LIST];
      expect(expectedMessage).toBeTruthy();
      expect(getFullSecurityControlsMessages(accessPolicy, 3)).toEqual([{
        message: _objectSpread({}, expectedMessage, {
          values: {
            appNames: 'a, b, c',
            remainingAppCount: 2
          }
        }),
        tooltipMessage: _objectSpread({}, messages.allAppNames, {
          values: {
            appsList: 'a, b, c, d, e'
          }
        })
      }]);
    });
    describe.each([DESKTOP, MOBILE, WEB])('%s download restriction', function (platform) {
      test.each([OWNERS_AND_COOWNERS, OWNERS_COOWNERS_AND_EDITORS])('should include correct message when both external and "%s" managed users are restricted', function (managedUsersCombo) {
        accessPolicy.download = _defineProperty({}, platform, {
          restrictManagedUsers: managedUsersCombo,
          restrictExternalUsers: true
        });
        expect(getFullSecurityControlsMessages(accessPolicy)).toEqual([{
          message: downloadRestrictionsMessageMap[platform].externalRestricted[managedUsersCombo]
        }]);
      });
      test.each([OWNERS_AND_COOWNERS, OWNERS_COOWNERS_AND_EDITORS])('should include correct message when "%s" managed users are restricted', function (managedUsersCombo) {
        accessPolicy.download = _defineProperty({}, platform, {
          restrictManagedUsers: managedUsersCombo,
          restrictExternalUsers: false
        });
        expect(getFullSecurityControlsMessages(accessPolicy)).toEqual([{
          message: downloadRestrictionsMessageMap[platform].externalAllowed[managedUsersCombo]
        }]);
      });
      test('should include correct message when external users are restricted', function () {
        accessPolicy.download = _defineProperty({}, platform, {
          restrictExternalUsers: true
        });
        expect(getFullSecurityControlsMessages(accessPolicy)).toEqual([{
          message: downloadRestrictionsMessageMap[platform].externalRestricted.default
        }]);
      });
    });
  });
});