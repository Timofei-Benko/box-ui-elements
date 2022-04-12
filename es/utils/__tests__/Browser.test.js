function _templateObject4() {
  var data = _taggedTemplateLiteral(["\n        result   | userAgent\n        ", "  | ", "\n        ", " | ", "\n        ", " | ", "\n        ", " | ", "\n    "]);

  _templateObject4 = function _templateObject4() {
    return data;
  };

  return data;
}

function _templateObject3() {
  var data = _taggedTemplateLiteral(["\n        result   | userAgent\n        ", "  | ", "\n        ", " | ", "\n        ", " | ", "\n        ", " | ", "\n        ", " | ", "\n    "]);

  _templateObject3 = function _templateObject3() {
    return data;
  };

  return data;
}

function _templateObject2() {
  var data = _taggedTemplateLiteral(["\n        result   | userAgent\n        ", "  | ", "\n        ", " | ", "\n        ", " | ", "\n    "]);

  _templateObject2 = function _templateObject2() {
    return data;
  };

  return data;
}

function _templateObject() {
  var data = _taggedTemplateLiteral(["\n        device\n        ", "\n        ", "\n        ", "\n        ", "\n        ", "\n        ", "\n        ", "\n        ", "\n        ", "\n    "]);

  _templateObject = function _templateObject() {
    return data;
  };

  return data;
}

function _taggedTemplateLiteral(strings, raw) { if (!raw) { raw = strings.slice(0); } return Object.freeze(Object.defineProperties(strings, { raw: { value: Object.freeze(raw) } })); }

import browser from '../Browser';
describe('util/Browser/isMobile()', function () {
  test('should return false if not mobile', function () {
    browser.getUserAgent = jest.fn().mockReturnValueOnce('foobar');
    expect(browser.isMobile()).toBeFalsy();
  });
  test.each(_templateObject(), 'ipad', 'iphone', 'ipod', 'android', 'blackberry', 'bb10', 'mini', 'windows ce', 'palm')('should return true for $device', function (_ref) {
    var device = _ref.device;
    browser.getUserAgent = jest.fn().mockReturnValueOnce(device);
    expect(browser.isMobile()).toBeTruthy();
  });
  test('should return true if user agent contains the string "Mobi"', function () {
    browser.getUserAgent = jest.fn().mockReturnValueOnce('Mozilla/5.0 (iPad; CPU OS 14_4 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/14.0.3 Mobile/15E148 Safari/604.1');
    expect(browser.isMobile()).toBeTruthy();
  });
});
describe('util/Browser/isIE()', function () {
  test('should return true if IE', function () {
    browser.getUserAgent = jest.fn().mockReturnValueOnce('Trident');
    expect(browser.isIE()).toBeTruthy();
  });
  test('should return false if not IE', function () {
    browser.getUserAgent = jest.fn().mockReturnValueOnce('foobar');
    expect(browser.isIE()).toBeFalsy();
  });
});
describe('util/Browser/isSafari()', function () {
  test.each(_templateObject2(), true, 'AppleWebKit/4.0', false, 'Trident', false, 'AppleWebKit/7.8 (KHTML, like Gecko) Chrome/1.2.3.4 Safari/5.6')('should return $result when user agent is $userAgent', function (_ref2) {
    var result = _ref2.result,
        userAgent = _ref2.userAgent;
    browser.getUserAgent = jest.fn().mockReturnValueOnce(userAgent);
    expect(browser.isSafari()).toBe(result);
  });
});
describe('util/Browser/isMobileSafari()', function () {
  afterEach(function () {
    browser.getUserAgent = jest.fn().mockReset();
  });
  test.each(_templateObject3(), true, 'AppleWebKit/603.1.23 (KHTML, like Gecko) Version/10.0 Mobile/14E5239e Safari/602.1', false, 'AppleWebKit/4.0', false, 'Trident', false, 'AppleWebKit/7.8 (KHTML, like Gecko) Chrome/1.2.3.4 Safari/5.6', false, 'AppleWebKit/605.1.15 (KHTML, like Gecko) CriOS/87.0.4280.77 Mobile/15E148 Safari/604.1')('should return $result when user agent is $userAgent', function (_ref3) {
    var result = _ref3.result,
        userAgent = _ref3.userAgent;
    browser.getUserAgent = jest.fn().mockReturnValue(userAgent);
    expect(browser.isMobileSafari()).toBe(result);
  });
});
describe('util/Browser/isMobileChromeOniOS()', function () {
  afterEach(function () {
    browser.getUserAgent = jest.fn().mockReset();
  });
  test.each(_templateObject4(), true, 'AppleWebKit/605.1.15 (KHTML, like Gecko) CriOS/87.0.4280.77 Mobile/15E148 Safari/604.1', false, 'AppleWebKit/4.0', false, 'Trident', false, 'AppleWebKit/7.8 (KHTML, like Gecko) Chrome/1.2.3.4 Safari/5.6')('should return $result when user agent is $userAgent', function (_ref4) {
    var result = _ref4.result,
        userAgent = _ref4.userAgent;
    browser.getUserAgent = jest.fn().mockReturnValue(userAgent);
    expect(browser.isMobileChromeOniOS()).toBe(result);
  });
});
describe('util/Browser/getUserAgent()', function () {
  test('should return the user agent', function () {
    expect(browser.getUserAgent()).toBeUndefined();
  });
});
describe('util/Browser/canPlayDash()', function () {
  test('should return false when there is no media source', function () {
    expect(browser.canPlayDash()).toBeFalsy();
  });
  test('should return false when isTypeSupported is not a function', function () {
    global.MediaSource = {
      isTypeSupported: 'string'
    };
    expect(browser.canPlayDash(true)).toBeFalsy();
  });
  test('should return true when h264 is supported', function () {
    var isTypeSupportedMock = jest.fn();
    global.MediaSource = {
      isTypeSupported: isTypeSupportedMock.mockReturnValueOnce(true)
    };
    expect(browser.canPlayDash(true)).toBeTruthy();
    expect(isTypeSupportedMock).toHaveBeenCalledWith('video/mp4; codecs="avc1.64001E"');
  });
});
describe('Browser clipboard API', function () {
  // @see https://caniuse.com/#search=clipboard
  afterEach(function () {
    global.navigator.clipboard = undefined;
  });
  test('should return false when clipboard is unavailable', function () {
    expect(browser.canWriteToClipboard()).toBe(false);
    expect(browser.canReadFromClipboard()).toBe(false);
  });
  test('should return false when clipboard is partially available', function () {
    global.navigator.clipboard = {
      read: jest.fn(),
      write: jest.fn()
    };
    expect(browser.canWriteToClipboard()).toBe(false);
    expect(browser.canReadFromClipboard()).toBe(false);
  });
  test('should return true when clipboard is fully available', function () {
    global.navigator.clipboard = {
      read: jest.fn(),
      write: jest.fn(),
      readText: jest.fn(),
      writeText: jest.fn()
    };
    expect(browser.canWriteToClipboard()).toBe(true);
    expect(browser.canReadFromClipboard()).toBe(true);
  });
});