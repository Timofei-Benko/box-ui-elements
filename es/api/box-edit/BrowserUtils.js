function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var BROWSER_CONSTANTS = {
  CHROME: 'Chrome',
  EDGE: 'Edge',
  FIREFOX: 'Firefox',
  MAC: 'Mac',
  SAFARI: 'Safari',
  IE: 'Explorer'
};
var MIN_FOLDER_UPLOAD_CHROME = '21';
var MIN_FOLDER_UPLOAD_EDGE = '14';
var MIN_FOLDER_UPLOAD_FIREFOX = '50';
var MIN_FOLDER_UPLOAD_SAFARI = '11.1';
var BROWSER_DATA = [{
  key: 'userAgent',
  subString: BROWSER_CONSTANTS.EDGE,
  identity: BROWSER_CONSTANTS.EDGE
}, {
  key: 'userAgent',
  subString: BROWSER_CONSTANTS.CHROME,
  identity: BROWSER_CONSTANTS.CHROME
}, {
  // Chrome on iOS uses criOS to indicate that it is a chrome browser
  // https://developer.chrome.com/multidevice/user-agent
  key: 'userAgent',
  subString: 'criOS',
  identity: BROWSER_CONSTANTS.CHROME,
  versionSearch: 'criOS'
}, {
  key: 'vendor',
  subString: 'Apple',
  identity: BROWSER_CONSTANTS.SAFARI,
  versionSearch: 'Version'
}, {
  key: 'userAgent',
  subString: BROWSER_CONSTANTS.FIREFOX,
  identity: BROWSER_CONSTANTS.FIREFOX
}, {
  key: 'userAgent',
  subString: 'MSIE',
  identity: 'Explorer',
  versionSearch: 'MSIE'
}, {
  key: 'userAgent',
  subString: 'Trident',
  identity: 'Explorer',
  versionSearch: 'rv'
}, {
  key: 'userAgent',
  subString: 'Gecko',
  identity: 'Mozilla',
  versionSearch: 'rv'
}];
var OS_DATA = [{
  key: 'platform',
  subString: 'Win',
  identity: 'Windows'
}, {
  key: 'userAgent',
  subString: 'iPod',
  identity: 'iOS',
  device: 'iPod'
}, {
  key: 'userAgent',
  subString: 'iPhone',
  identity: 'iOS',
  device: 'iPhone'
}, {
  key: 'userAgent',
  subString: 'iPad',
  identity: 'iOS',
  device: 'iPad'
}, {
  // Make sure Mac is lower than iPhone/iPad/iPod in the array order as iOS user agent also includes 'Mac'
  key: 'platform',
  subString: BROWSER_CONSTANTS.MAC,
  identity: BROWSER_CONSTANTS.MAC
}, {
  // Make sure Android is above Linux, as Android user agent also includes 'Linux'
  key: 'userAgent',
  subString: 'Android',
  identity: 'Android'
}, {
  key: 'platform',
  subString: 'Linux',
  identity: 'Linux'
}];
/**
 * Searches for the identity of the browser in the provided array or known browsers.
 * @param {Object} navigator
 * @param {Array} data - list of supported browsers, filled with browser information
 * to determine the current browser identity
 * @returns {Object} - the identity of the browser
 */

function getBrowserData(navigator, data) {
  var dataString;
  var identity = null;
  var device = null;
  var versionSearchString = '';

  for (var i = 0, len = data.length; i < len; i += 1) {
    dataString = navigator[data[i].key];
    versionSearchString = data[i].versionSearch || data[i].identity;

    if (dataString && dataString.indexOf(data[i].subString) !== -1) {
      /* eslint-disable prefer-destructuring */
      identity = data[i].identity;
      device = data[i].device;
      /* eslint-enable prefer-destructuring */

      break;
    }
  }

  return {
    identity: identity,
    device: device,
    versionSearchString: versionSearchString
  };
}
/**
 * searches for the version of the browser in the provided array
 *
 * @param {string} dataString - a string that contains the version information,
 *        either navigator.userAgent or navigator.appVersion
 * @param {string} versionSearchString
 * @returns {string} - empty if versionString does not exist in dataString, else the version as a string.
 */


function getBrowserVersion(dataString, versionSearchString) {
  var index = dataString.indexOf(versionSearchString);

  if (index === -1) {
    return '';
  } // This regex grabs the decimal value of the version


  var versionArr = dataString.substring(index + versionSearchString.length + 1).match(/[0-9]+(?:\.[0-9]*)?/);

  if (versionArr && versionArr.length) {
    return versionArr[0];
  }

  return '';
}
/**
 * @param {string} [objectID] optional. Defaults to a random string, just to validate
 * the ability of creating the ActiveXObject on the browser
 * @returns {boolean}
 */


function isActiveXObjectEnabledForIE(objectID) {
  var objectIdentifier = objectID || 'htmlfile';
  var enabled = false;

  try {
    if ('ActiveXObject' in window) {
      var _window = window,
          ActiveXObject = _window.ActiveXObject;
      enabled = !!new ActiveXObject(objectIdentifier);
    }
  } catch (exception) {
    enabled = false;
  }

  return enabled;
}

var BrowserUtils =
/*#__PURE__*/
function () {
  function BrowserUtils() {
    _classCallCheck(this, BrowserUtils);

    var _window2 = window,
        navigator = _window2.navigator;
    var browserData = getBrowserData(navigator, BROWSER_DATA);
    var osInfo = getBrowserData(navigator, OS_DATA);
    this.browser = browserData.identity || 'unknown';
    this.version = getBrowserVersion(navigator.userAgent, browserData.versionSearchString) || getBrowserVersion(navigator.appVersion, browserData.versionSearchString) || 'unknown';
    this.OS = osInfo.identity || 'unknown';
    this.device = osInfo.device || 'unknown';
  }
  /**
   * Returns the browser name as a string if recognized, else 'an unknown browser'.
   * @returns {string} browser name
   */


  _createClass(BrowserUtils, [{
    key: "getName",
    value: function getName() {
      return this.browser;
    }
    /**
     * Returns the browser version as a string.
     * @returns {string} version string
     */

  }, {
    key: "getVersion",
    value: function getVersion() {
      return this.version;
    }
    /**
     * Returns true if the browser is of type 'type' and the version of browser >= 'min' parameter.
     *
     * @param {string} name - The name of the browser
     * @param {string | number} minVersion - The version number to be equal to or greater than.
     * @returns {boolean} - true if current browser name is same as passed in and
     *     browser version greater or equal to minVersion
     */

  }, {
    key: "isMinBrowser",
    value: function isMinBrowser(name, minVersion) {
      return this.browser.toLowerCase() === name.toLowerCase() && parseFloat(this.version) >= parseFloat(minVersion);
    }
    /**
     * Returns true if the current browser is Safari.
     * @returns {boolean} True if browser is Safari
     */

  }, {
    key: "isSafari",
    value: function isSafari() {
      return this.browser === BROWSER_CONSTANTS.SAFARI;
    }
    /**
     * Returns true if the current browser is firefox.
     * @returns {boolean}
     */

  }, {
    key: "isFirefox",
    value: function isFirefox() {
      return this.browser === BROWSER_CONSTANTS.FIREFOX;
    }
    /**
     * Returns true if the current browser is chrome.
     * @returns {boolean}
     */

  }, {
    key: "isChrome",
    value: function isChrome() {
      return this.browser === BROWSER_CONSTANTS.CHROME;
    }
    /**
     * Returns true if the current browser is internet explorer (ie).
     * @returns {boolean}
     */

  }, {
    key: "isIE",
    value: function isIE() {
      return this.browser === BROWSER_CONSTANTS.IE;
    }
    /**
     * Returns true if the current browser is microsoft edge.
     * @returns {boolean}
     */

  }, {
    key: "isEdge",
    value: function isEdge() {
      return this.browser === BROWSER_CONSTANTS.EDGE;
    }
    /**
     * Checks if a specific plugin is supported and does not realy on
     * plugins generally being supported.
     * @param {string} [pluginID] optional. The specific plugin which should be checked for support
     * @returns {boolean}
     */

  }, {
    key: "isIEAndSpecificBrowserPluginSupported",
    value: function isIEAndSpecificBrowserPluginSupported(pluginID) {
      return this.isIE() && isActiveXObjectEnabledForIE(pluginID);
    }
  }]);

  return BrowserUtils;
}();

var BrowserInstance = new BrowserUtils(); // for testing only

export { BrowserUtils, BROWSER_CONSTANTS, MIN_FOLDER_UPLOAD_CHROME, MIN_FOLDER_UPLOAD_EDGE, MIN_FOLDER_UPLOAD_FIREFOX, MIN_FOLDER_UPLOAD_SAFARI }; // export as a singleton

export default BrowserInstance;
//# sourceMappingURL=BrowserUtils.js.map