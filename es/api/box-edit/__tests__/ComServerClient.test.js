function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

import ComServerClient from '../ComServerClient';
import CONSTANTS from '../constants';
import Browser, { BROWSER_CONSTANTS } from '../BrowserUtils';
import HTTPChannel from '../HTTPChannel';
import SafariChannel from '../SafariChannel';
import ActiveXChannel from '../ActiveXChannel';
jest.mock('../HTTPChannel', function () {
  return jest.fn().mockImplementation(function () {
    return {
      getComServerStatus: jest.fn().mockResolvedValue()
    };
  });
});
jest.mock('../SafariChannel', function () {
  return jest.fn().mockImplementation(function () {
    return {
      getComServerStatus: jest.fn().mockResolvedValue()
    };
  });
});
jest.mock('../ActiveXChannel', function () {
  return jest.fn().mockImplementation(function () {
    return {
      getComServerStatus: jest.fn().mockResolvedValue()
    };
  });
});
var APP_NAME = 'Box_Edit';
describe('lib/box-edit/ComServerClient', function () {
  var client;
  beforeEach(function () {});
  afterEach(function () {
    HTTPChannel.mockClear();
    SafariChannel.mockClear();
    ActiveXChannel.mockClear();
    jest.restoreAllMocks();
  });
  describe('constructor()', function () {
    var BOX_UNSECURE_LOCAL_BASE_URL = CONSTANTS.BOX_UNSECURE_LOCAL_BASE_URL;
    describe('on browsers that support mixed content', function () {
      beforeEach(function () {
        Browser.isMinBrowser = jest.fn(function (name, version) {
          return name === BROWSER_CONSTANTS.CHROME && version === 53;
        });
      });
      test('should create an HTTP channel when called', function () {
        client = new ComServerClient(APP_NAME);
        expect(HTTPChannel).toBeCalled();
        expect(HTTPChannel.mock.calls[0]).toContain(APP_NAME);
        expect(HTTPChannel.mock.calls[0]).toContain(BOX_UNSECURE_LOCAL_BASE_URL);
      });
    });
    describe('on safari', function () {
      beforeEach(function () {
        Browser.isMinBrowser = jest.fn(function (name, version) {
          return name === BROWSER_CONSTANTS.SAFARI && version === 10;
        });
      });
      test('should create a Safari channel and an HTTPS channel when called and HTTPS certificate unrevoked', function () {
        client = new ComServerClient(APP_NAME);
        expect(SafariChannel).toBeCalled();
        expect(SafariChannel).toBeCalledWith(APP_NAME);
      });
    });
    describe('on browsers that rely on activex for mixed content communication', function () {
      beforeEach(function () {
        Browser.isMinBrowser = jest.fn(function (name, version) {
          return name === BROWSER_CONSTANTS.IE && version === 11;
        });
        Browser.isIEAndSpecificBrowserPluginSupported = jest.fn().mockReturnValue(true);
      });
      test('should create a ActiveX channel and no HTTPS channel when called and HTTPS certificate revoked', function () {
        client = new ComServerClient(APP_NAME);
        expect(ActiveXChannel.mock.calls[0]).toContain(APP_NAME);
      });
    });
    describe('on browsers with no means of communicating over localhost via HTTP or custom/unknown user agents', function () {
      beforeEach(function () {
        Browser.isMinBrowser = jest.fn().mockReturnValue(false);
        Browser.isIEAndSpecificBrowserPluginSupported = jest.fn().mockReturnValue(false);
        Browser.isFirefox = jest.fn().mockReturnValue(false);
      });
      test('should create four channels to try all of them, and activex channel should be set to synchronous mode', function () {
        client = new ComServerClient(APP_NAME);
        expect(HTTPChannel.mock.calls[0]).toContain(APP_NAME);
        expect(HTTPChannel.mock.calls[0]).toContain(BOX_UNSECURE_LOCAL_BASE_URL);
        expect(SafariChannel).toBeCalledWith(APP_NAME);
        expect(ActiveXChannel.mock.calls[0]).toContain(APP_NAME);
      });
    });
  });
  describe('getComServerStatus', function () {
    describe('MSEdge Support', function () {
      describe.each([['14.19000', false], ['15.19000', false], ['16.16000', false], ['16.16298', false], ['17.17000', true], ['17.17133', false]])('%o', function (edgeVersion, isVersionGreaterThanSupportedEdge16Version) {
        beforeEach(function () {
          // ARRANGE
          Browser.isEdge = jest.fn().mockReturnValue(true);
          Browser.getVersion = jest.fn().mockReturnValue(edgeVersion);
          Browser.isMinBrowser = jest.fn(function (name, version) {
            if (name === BROWSER_CONSTANTS && version === '17.17134') {
              return false;
            }

            if (name === BROWSER_CONSTANTS.EDGE && version === '16.16299') {
              return isVersionGreaterThanSupportedEdge16Version;
            }

            return null;
          });
        });
        test("should return a rejected Promise when Edge support is enabled and the browser is Edge version ".concat(edgeVersion),
        /*#__PURE__*/
        _asyncToGenerator(
        /*#__PURE__*/
        regeneratorRuntime.mark(function _callee() {
          return regeneratorRuntime.wrap(function _callee$(_context) {
            while (1) {
              switch (_context.prev = _context.next) {
                case 0:
                  // ACT
                  client = new ComServerClient(APP_NAME);
                  _context.prev = 1;
                  _context.next = 4;
                  return client.getComServerStatus();

                case 4:
                  _context.next = 9;
                  break;

                case 6:
                  _context.prev = 6;
                  _context.t0 = _context["catch"](1);
                  // ASSERT
                  expect(_context.t0.message).toEqual(CONSTANTS.BOX_EDIT_UPGRADE_BROWSER_ERROR);

                case 9:
                case "end":
                  return _context.stop();
              }
            }
          }, _callee, null, [[1, 6]]);
        })));
      });
      describe.each([['16.16299', true, false], ['16.16999', true, false], ['17.17134', false, true], ['17.17999', false, true]])('%o', function (edgeVersion, isVersionGreaterThanMinimumSupportedEdge16Version, isVersionGreaterThanMinimumSupportedEdge17Version) {
        test('should call getComServerStatus on all active channels when called',
        /*#__PURE__*/
        _asyncToGenerator(
        /*#__PURE__*/
        regeneratorRuntime.mark(function _callee2() {
          var EDGE;
          return regeneratorRuntime.wrap(function _callee2$(_context2) {
            while (1) {
              switch (_context2.prev = _context2.next) {
                case 0:
                  // ARRANGE
                  EDGE = BROWSER_CONSTANTS.EDGE;
                  Browser.isEdge = jest.fn().mockReturnValue(true);
                  Browser.getVersion = jest.fn().mockReturnValue(edgeVersion);
                  Browser.isMinBrowser = jest.fn(function (name, version) {
                    if (name === EDGE && version === '17.17134') {
                      return isVersionGreaterThanMinimumSupportedEdge17Version;
                    }

                    if (name === EDGE && version === '16.16299') {
                      return isVersionGreaterThanMinimumSupportedEdge16Version;
                    }

                    return null;
                  }); // ACT

                  client = new ComServerClient(APP_NAME);
                  _context2.next = 7;
                  return client.getComServerStatus();

                case 7:
                  // ASSERT
                  client.channels.forEach(function (channel) {
                    expect(channel.getComServerStatus).toBeCalledTimes(1);
                  });

                case 8:
                case "end":
                  return _context2.stop();
              }
            }
          }, _callee2);
        })));
      });
    });
    test('should call getComServerStatus on all active channels when called',
    /*#__PURE__*/
    _asyncToGenerator(
    /*#__PURE__*/
    regeneratorRuntime.mark(function _callee3() {
      return regeneratorRuntime.wrap(function _callee3$(_context3) {
        while (1) {
          switch (_context3.prev = _context3.next) {
            case 0:
              // ARRANGE
              Browser.isMinBrowser = jest.fn(function (name, version) {
                return name === BROWSER_CONSTANTS.CHROME && version === 53;
              });
              Browser.isEdge = jest.fn().mockReturnValue(false); // ACT

              client = new ComServerClient(APP_NAME);
              _context3.next = 5;
              return client.getComServerStatus();

            case 5:
              // ASSERT
              client.channels.forEach(function (channel) {
                expect(channel.getComServerStatus).toBeCalledTimes(1);
              });

            case 6:
            case "end":
              return _context3.stop();
          }
        }
      }, _callee3);
    })));
    describe('when using a browser that supports mixed-mode localhost', function () {
      beforeEach(function () {
        Browser.browserName = jest.fn().mockReturnValue('Chrome');
        Browser.isChrome = jest.fn().mockReturnValue(true);
        Browser.isMinBrowser = jest.fn(function (name, version) {
          return name === BROWSER_CONSTANTS.CHROME && version === 53;
        });
      });
      test("should return the result of the primary channel's getComServerStatus call when it resolves first",
      /*#__PURE__*/
      _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee4() {
        var expectedResolution, value;
        return regeneratorRuntime.wrap(function _callee4$(_context4) {
          while (1) {
            switch (_context4.prev = _context4.next) {
              case 0:
                // Arrange
                expectedResolution = 'first';
                HTTPChannel.mockImplementation(function () {
                  return {
                    getComServerStatus: jest.fn().mockResolvedValue(expectedResolution)
                  };
                });
                client = new ComServerClient(APP_NAME); // Act

                _context4.next = 5;
                return client.getComServerStatus();

              case 5:
                value = _context4.sent;
                // Assert
                expect(value).toEqual(expectedResolution);

              case 7:
              case "end":
                return _context4.stop();
            }
          }
        }, _callee4);
      })));
      test("should return the result of the secondary channel's getComServerStatus call when it resolves first",
      /*#__PURE__*/
      _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee5() {
        var expectedResolution, value;
        return regeneratorRuntime.wrap(function _callee5$(_context5) {
          while (1) {
            switch (_context5.prev = _context5.next) {
              case 0:
                // Arrange
                expectedResolution = 'first foo';
                Browser.isMinBrowser = jest.fn().mockReturnValue(false);
                Browser.isIEAndSpecificBrowserPluginSupported = jest.fn().mockReturnValue(false);
                Browser.isFirefox = jest.fn().mockReturnValue(false);
                HTTPChannel.mockImplementation(function () {
                  return {
                    getComServerStatus: jest.fn().mockRejectedValue()
                  };
                });
                SafariChannel.mockImplementation(function () {
                  return {
                    getComServerStatus: jest.fn().mockResolvedValue(expectedResolution)
                  };
                });
                client = new ComServerClient(APP_NAME); // Act

                _context5.next = 9;
                return client.getComServerStatus();

              case 9:
                value = _context5.sent;
                // Assert
                expect(value).toEqual(expectedResolution);

              case 11:
              case "end":
                return _context5.stop();
            }
          }
        }, _callee5);
      })));
      test("should fail gracefully when called and neither channel's getComServerStatus call succeeds",
      /*#__PURE__*/
      _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee6() {
        return regeneratorRuntime.wrap(function _callee6$(_context6) {
          while (1) {
            switch (_context6.prev = _context6.next) {
              case 0:
                // arrange
                HTTPChannel.mockImplementation(function () {
                  return {
                    getComServerStatus: jest.fn().mockRejectedValue()
                  };
                });
                client = new ComServerClient(APP_NAME); // act

                _context6.next = 4;
                return expect(client.getComServerStatus()).rejects.toThrow();

              case 4:
              case "end":
                return _context6.stop();
            }
          }
        }, _callee6);
      })));
      test('should return a rejected Promise when the browser is Chrome 53 and Box Edit v4 is not installed',
      /*#__PURE__*/
      _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee7() {
        return regeneratorRuntime.wrap(function _callee7$(_context7) {
          while (1) {
            switch (_context7.prev = _context7.next) {
              case 0:
                // arrange
                Browser.isChrome = jest.fn().mockReturnValue(true);
                Browser.isMinBrowser = jest.fn(function (name, version) {
                  return name === BROWSER_CONSTANTS.CHROME && version === 53;
                });
                HTTPChannel.mockImplementation(function () {
                  return {
                    getComServerStatus: jest.fn().mockRejectedValue()
                  };
                });
                client = new ComServerClient(APP_NAME); // act

                _context7.next = 6;
                return expect(client.getComServerStatus()).rejects.toThrow(CONSTANTS.BOX_EDIT_UNINSTALLED_ERROR);

              case 6:
              case "end":
                return _context7.stop();
            }
          }
        }, _callee7);
      })));
      test('should return a rejected Promise when the browser is Firefox 55 and Box Edit v4 is not installed',
      /*#__PURE__*/
      _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee8() {
        return regeneratorRuntime.wrap(function _callee8$(_context8) {
          while (1) {
            switch (_context8.prev = _context8.next) {
              case 0:
                // arrange
                Browser.isChrome = jest.fn().mockReturnValue(false);
                Browser.isFirefox = jest.fn().mockReturnValue(true);
                Browser.isMinBrowser = jest.fn(function (name, version) {
                  return name === BROWSER_CONSTANTS.FIREFOX && version === 55;
                });
                HTTPChannel.mockImplementation(function () {
                  return {
                    getComServerStatus: jest.fn().mockRejectedValue()
                  };
                });
                client = new ComServerClient(APP_NAME); // act

                _context8.next = 7;
                return expect(client.getComServerStatus()).rejects.toThrow(CONSTANTS.BOX_EDIT_UNINSTALLED_ERROR);

              case 7:
              case "end":
                return _context8.stop();
            }
          }
        }, _callee8);
      })));
      test('should return a rejected Promise when the browser is IE 11 and Box Edit v4 is not installed',
      /*#__PURE__*/
      _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee9() {
        return regeneratorRuntime.wrap(function _callee9$(_context9) {
          while (1) {
            switch (_context9.prev = _context9.next) {
              case 0:
                // arrange
                Browser.isMinBrowser = jest.fn(function (name, version) {
                  return name === BROWSER_CONSTANTS.IE && version === 11;
                });
                Browser.isIEAndSpecificBrowserPluginSupported = jest.fn().mockReturnValue(true);
                ActiveXChannel.mockImplementation(function () {
                  return {
                    getComServerStatus: jest.fn().mockRejectedValue()
                  };
                }); // act

                client = new ComServerClient(APP_NAME);
                _context9.next = 6;
                return expect(client.getComServerStatus()).rejects.toThrow(CONSTANTS.BOX_EDIT_UNINSTALLED_ERROR);

              case 6:
              case "end":
                return _context9.stop();
            }
          }
        }, _callee9);
      })));
      test('should return a rejected Promise when the browser is Chrome under version 53',
      /*#__PURE__*/
      _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee10() {
        return regeneratorRuntime.wrap(function _callee10$(_context10) {
          while (1) {
            switch (_context10.prev = _context10.next) {
              case 0:
                Browser.isMinBrowser = jest.fn(function (name, version) {
                  if (name === BROWSER_CONSTANTS.CHROME && version === 53) {
                    return false;
                  }

                  return null;
                }); // arrange

                Browser.isChrome = jest.fn(function () {
                  return true;
                });
                Browser.version = 52;
                HTTPChannel.mockImplementation(function () {
                  return {
                    getComServerStatus: jest.fn().mockResolvedValue()
                  };
                });
                client = new ComServerClient(APP_NAME); // act

                _context10.next = 7;
                return expect(client.getComServerStatus()).rejects.toThrow(CONSTANTS.BOX_EDIT_UPGRADE_BROWSER_ERROR);

              case 7:
              case "end":
                return _context10.stop();
            }
          }
        }, _callee10);
      })));
      test('should return a rejected Promise when the browser is Firefox under version 55',
      /*#__PURE__*/
      _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee11() {
        return regeneratorRuntime.wrap(function _callee11$(_context11) {
          while (1) {
            switch (_context11.prev = _context11.next) {
              case 0:
                // arrange
                Browser.isMinBrowser = jest.fn(function (name, version) {
                  if (name === BROWSER_CONSTANTS.FIREFOX && version === 55) {
                    return false;
                  }

                  return null;
                });
                Browser.isFirefox = jest.fn().mockReturnValue(true);
                Browser.getVersion = jest.fn().mockReturnValue(42);
                HTTPChannel.mockImplementation(function () {
                  return {
                    getComServerStatus: jest.fn().mockRejectedValue()
                  };
                });
                client = new ComServerClient(APP_NAME); // act

                _context11.next = 7;
                return expect(client.getComServerStatus()).rejects.toThrow(CONSTANTS.BOX_EDIT_UPGRADE_BROWSER_ERROR);

              case 7:
              case "end":
                return _context11.stop();
            }
          }
        }, _callee11);
      })));
      test('should return a rejected Promise when the browser is Safari',
      /*#__PURE__*/
      _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee12() {
        return regeneratorRuntime.wrap(function _callee12$(_context12) {
          while (1) {
            switch (_context12.prev = _context12.next) {
              case 0:
                Browser.isMinBrowser = jest.fn(function (name, version) {
                  if (name === BROWSER_CONSTANTS.SAFARI && version === 10) {
                    return true;
                  }

                  if (name === BROWSER_CONSTANTS.CHROME && version === 53) {
                    return false;
                  }

                  return null;
                }); // arrange

                Browser.isFirefox = jest.fn().mockReturnValue(false);
                Browser.isChrome = jest.fn().mockReturnValue(false);
                Browser.isSafari = jest.fn().mockReturnValue(true);
                SafariChannel.mockImplementation(function () {
                  return {
                    getComServerStatus: jest.fn().mockRejectedValue()
                  };
                });
                client = new ComServerClient(APP_NAME);
                _context12.next = 8;
                return expect(client.getComServerStatus()).rejects.toThrow(CONSTANTS.BOX_EDIT_SAFARI_ERROR);

              case 8:
              case "end":
                return _context12.stop();
            }
          }
        }, _callee12);
      })));
      test('should return an upgrade browser message when user is on a browser (Safari) that does not support Box Tools v4',
      /*#__PURE__*/
      _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee13() {
        return regeneratorRuntime.wrap(function _callee13$(_context13) {
          while (1) {
            switch (_context13.prev = _context13.next) {
              case 0:
                // arrange
                Browser.isFirefox = jest.fn().mockReturnValue(false);
                Browser.isChrome = jest.fn().mockReturnValue(false);
                Browser.isSafari = jest.fn().mockReturnValue(true);
                Browser.isMinBrowser = jest.fn(function () {
                  return false;
                });
                client = new ComServerClient(APP_NAME);
                HTTPChannel.mockImplementation(function () {
                  return {
                    getComServerStatus: jest.fn().mockRejectedValue()
                  };
                });
                SafariChannel.mockImplementation(function () {
                  return {
                    getComServerStatus: jest.fn().mockRejectedValue()
                  };
                });
                ActiveXChannel.mockImplementation(function () {
                  return {
                    getComServerStatus: jest.fn().mockRejectedValue()
                  };
                });
                _context13.next = 10;
                return expect(client.getComServerStatus()).rejects.toThrow(CONSTANTS.BOX_EDIT_UPGRADE_BROWSER_ERROR);

              case 10:
              case "end":
                return _context13.stop();
            }
          }
        }, _callee13);
      })));
      test('should return an upgrade browser message when  user is on a Firefox that does not support Box Tools v4',
      /*#__PURE__*/
      _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee14() {
        return regeneratorRuntime.wrap(function _callee14$(_context14) {
          while (1) {
            switch (_context14.prev = _context14.next) {
              case 0:
                // arrange
                Browser.isFirefox = jest.fn().mockReturnValue(true);
                Browser.isChrome = jest.fn().mockReturnValue(false);
                Browser.isSafari = jest.fn().mockReturnValue(false);
                Browser.isMinBrowser = jest.fn(function () {
                  return false;
                });
                client = new ComServerClient(APP_NAME); // act

                _context14.next = 7;
                return expect(client.getComServerStatus()).rejects.toThrow(CONSTANTS.BOX_EDIT_UPGRADE_BROWSER_ERROR);

              case 7:
              case "end":
                return _context14.stop();
            }
          }
        }, _callee14);
      })));
      test('should return an upgrade browser message with EOL enabled and user is on a Chrome that does not support Box Tools v4',
      /*#__PURE__*/
      _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee15() {
        return regeneratorRuntime.wrap(function _callee15$(_context15) {
          while (1) {
            switch (_context15.prev = _context15.next) {
              case 0:
                // arrange
                Browser.isFirefox = jest.fn().mockReturnValue(false);
                Browser.isChrome = jest.fn().mockReturnValue(true);
                Browser.isSafari = jest.fn().mockReturnValue(false);
                Browser.isMinBrowser = jest.fn(function () {
                  return false;
                });
                client = new ComServerClient(APP_NAME);
                HTTPChannel.mockImplementation(function () {
                  return {
                    getComServerStatus: jest.fn().mockRejectedValue()
                  };
                });
                SafariChannel.mockImplementation(function () {
                  return {
                    getComServerStatus: jest.fn().mockRejectedValue()
                  };
                });
                ActiveXChannel.mockImplementation(function () {
                  return {
                    getComServerStatus: jest.fn().mockRejectedValue()
                  };
                });
                _context15.next = 10;
                return expect(client.getComServerStatus()).rejects.toThrow(CONSTANTS.BOX_EDIT_UPGRADE_BROWSER_ERROR);

              case 10:
              case "end":
                return _context15.stop();
            }
          }
        }, _callee15);
      })));
    });
  });
});