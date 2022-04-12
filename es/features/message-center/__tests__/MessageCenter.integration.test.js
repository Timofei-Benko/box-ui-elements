function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

import * as React from 'react';
import { act } from 'react-dom/test-utils';
import { AutoSizer } from '@box/react-virtualized';
import { mountConnected } from '../../../test-utils/enzyme';
import MessageCenter from '../components/MessageCenter';
import PlainButton from '../../../components/plain-button';
import Message from '../components/message/Message';
var countResponse = {
  count: 3
};
var messageResponse = [{
  activateDate: 1598857200,
  id: 1,
  name: 'messagecenter_test_message1',
  priority: 50,
  templateName: 'preview-title-body-tags',
  templateParams: {
    fileUpload: {
      fileId: '21313',
      sharedLinkUrl: 'https://app.box.com/s/e32eddass'
    },
    title: 'Test message 1',
    body: 'This is a <em>test</em>',
    tags: 'lorem,ipsum',
    category: 'product',
    button1: {
      label: 'learn more',
      actions: [{
        type: 'openURL',
        target: '_blank',
        url: 'https://support.box.com/hc/en-us'
      }, {
        type: 'close'
      }]
    }
  }
}, {
  activateDate: 1599202800,
  id: 2,
  name: 'messagecenter_test_message2',
  priority: 30,
  templateName: 'preview-title-body-tags',
  templateParams: {
    fileUpload: {
      fileId: '21313',
      sharedLinkUrl: 'https://app.box.com/s/e32eddass'
    },
    title: 'Test message 2',
    body: 'lorem ipsum',
    tags: 'lorem,ipsum',
    category: 'product',
    button1: {
      label: 'check this out',
      actions: [{
        type: 'openURL',
        target: '_blank',
        url: 'http://community.box.com'
      }, {
        type: 'close'
      }]
    }
  }
}, {
  activateDate: 1599202800,
  id: 3,
  name: 'messagecenter_test_message3',
  priority: 20,
  templateName: 'preview-title-body-tags',
  templateParams: {
    fileUpload: {
      fileId: '321321',
      sharedLinkUrl: 'https://app.box.com/s/e32eddass'
    },
    title: 'Test message 3',
    body: 'lorem',
    tags: 'ipsum',
    category: 'education',
    button1: {
      label: 'foo',
      actions: [{
        type: 'openURL',
        target: '_blank',
        url: 'http://www.google.com'
      }, {
        type: 'close'
      }]
    }
  }
}]; // the following are workarounds from https://github.com/enzymejs/enzyme/issues/2073#issuecomment-531488981
// and are used to prevent warnings for surrounding with act

function wait() {
  var amount = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 0;
  return new Promise(function (resolve) {
    return setTimeout(resolve, amount);
  });
} // Use this in your test after mounting if you need just need to let the query finish without updating the wrapper


function actWait() {
  return _actWait.apply(this, arguments);
}

function _actWait() {
  _actWait = _asyncToGenerator(
  /*#__PURE__*/
  regeneratorRuntime.mark(function _callee8() {
    var amount,
        _args8 = arguments;
    return regeneratorRuntime.wrap(function _callee8$(_context8) {
      while (1) {
        switch (_context8.prev = _context8.next) {
          case 0:
            amount = _args8.length > 0 && _args8[0] !== undefined ? _args8[0] : 0;
            _context8.next = 3;
            return act(
            /*#__PURE__*/
            _asyncToGenerator(
            /*#__PURE__*/
            regeneratorRuntime.mark(function _callee7() {
              return regeneratorRuntime.wrap(function _callee7$(_context7) {
                while (1) {
                  switch (_context7.prev = _context7.next) {
                    case 0:
                      _context7.next = 2;
                      return wait(amount);

                    case 2:
                    case "end":
                      return _context7.stop();
                  }
                }
              }, _callee7);
            })));

          case 3:
          case "end":
            return _context8.stop();
        }
      }
    }, _callee8);
  }));
  return _actWait.apply(this, arguments);
}

function ButtonComponent(_ref) {
  var render = _ref.render,
      rest = _objectWithoutProperties(_ref, ["render"]);

  return React.createElement(PlainButton, rest, render());
}

describe('components/message-center/MessageCenter.integration', function () {
  function getWrapper() {
    return _getWrapper.apply(this, arguments);
  }

  function _getWrapper() {
    _getWrapper = _asyncToGenerator(
    /*#__PURE__*/
    regeneratorRuntime.mark(function _callee6() {
      var props,
          getEligibleMessages,
          getUnreadMessageCount,
          postMarkAllMessagesAsSeen,
          defaultProps,
          wrapper,
          _args6 = arguments;
      return regeneratorRuntime.wrap(function _callee6$(_context6) {
        while (1) {
          switch (_context6.prev = _context6.next) {
            case 0:
              props = _args6.length > 0 && _args6[0] !== undefined ? _args6[0] : {};
              getEligibleMessages = jest.fn().mockResolvedValue(messageResponse);
              getUnreadMessageCount = jest.fn().mockResolvedValue(countResponse);
              postMarkAllMessagesAsSeen = jest.fn().mockResolvedValue(null);
              defaultProps = {
                apiHost: 'https://www.box.com/api',
                buttonComponent: ButtonComponent,
                getEligibleMessages: getEligibleMessages,
                getToken: jest.fn().mockResolvedValue('token123'),
                getUnreadMessageCount: getUnreadMessageCount,
                postMarkAllMessagesAsSeen: postMarkAllMessagesAsSeen,
                overscanRowCount: 10
              };
              wrapper = mountConnected(React.createElement(MessageCenter, _extends({}, defaultProps, props)));
              _context6.next = 8;
              return actWait();

            case 8:
              return _context6.abrupt("return", wrapper);

            case 9:
            case "end":
              return _context6.stop();
          }
        }
      }, _callee6);
    }));
    return _getWrapper.apply(this, arguments);
  }

  function openModal(wrapper) {
    act(function () {
      wrapper.find('Megaphone20').simulate('click');
    });
  }

  beforeEach(function () {
    jest.spyOn(AutoSizer.prototype, 'render').mockImplementation(function render() {
      return React.createElement("div", null, this.props.children({
        width: 720,
        height: 1024
      }));
    });
  });
  test('should render the icon with count',
  /*#__PURE__*/
  _asyncToGenerator(
  /*#__PURE__*/
  regeneratorRuntime.mark(function _callee() {
    var wrapper;
    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.next = 2;
            return getWrapper();

          case 2:
            wrapper = _context.sent;
            expect(wrapper.find('ButtonComponent[data-testid="message-center-unread-count"]').text()).toBe(countResponse.count.toString());

          case 4:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  })));
  test('should render ghost state while fetching messages',
  /*#__PURE__*/
  _asyncToGenerator(
  /*#__PURE__*/
  regeneratorRuntime.mark(function _callee2() {
    var getEligibleMessages, wrapper;
    return regeneratorRuntime.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            getEligibleMessages = jest.fn().mockImplementation(function () {
              return new Promise(function () {});
            });
            _context2.next = 3;
            return getWrapper({
              getEligibleMessages: getEligibleMessages
            });

          case 3:
            wrapper = _context2.sent;
            openModal(wrapper);
            wrapper.update();
            expect(wrapper.find('MessagePreviewGhost').exists()).toBe(true);
            expect(wrapper.find('ContentGhost').exists()).toBe(true);

          case 8:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2);
  })));
  test('should render all the messages by default',
  /*#__PURE__*/
  _asyncToGenerator(
  /*#__PURE__*/
  regeneratorRuntime.mark(function _callee3() {
    var wrapper;
    return regeneratorRuntime.wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            _context3.next = 2;
            return getWrapper();

          case 2:
            wrapper = _context3.sent;
            openModal(wrapper);
            wrapper.update();
            expect(wrapper.find('Message')).toHaveLength(messageResponse.length);

          case 6:
          case "end":
            return _context3.stop();
        }
      }
    }, _callee3);
  })));
  test('should set the message count to 0 when modal is opened',
  /*#__PURE__*/
  _asyncToGenerator(
  /*#__PURE__*/
  regeneratorRuntime.mark(function _callee4() {
    var wrapper;
    return regeneratorRuntime.wrap(function _callee4$(_context4) {
      while (1) {
        switch (_context4.prev = _context4.next) {
          case 0:
            _context4.next = 2;
            return getWrapper();

          case 2:
            wrapper = _context4.sent;
            openModal(wrapper);
            wrapper.update();
            expect(wrapper.find('CountBadge').props().isVisible).toBe(false);
            expect(wrapper.find('CountBadge').props().value).toBe(0);
            expect(wrapper.prop('postMarkAllMessagesAsSeen')).toHaveBeenCalled();

          case 8:
          case "end":
            return _context4.stop();
        }
      }
    }, _callee4);
  })));
  test('should filter messages by product category',
  /*#__PURE__*/
  _asyncToGenerator(
  /*#__PURE__*/
  regeneratorRuntime.mark(function _callee5() {
    var wrapper;
    return regeneratorRuntime.wrap(function _callee5$(_context5) {
      while (1) {
        switch (_context5.prev = _context5.next) {
          case 0:
            _context5.next = 2;
            return getWrapper();

          case 2:
            wrapper = _context5.sent;
            openModal(wrapper);
            wrapper.update();
            act(function () {
              wrapper.find('CategorySelector').find('.bdl-CategorySelector-pill').findWhere(function (n) {
                return n.text() === 'Product';
              }).at(0).simulate('click');
            });
            wrapper.update();
            expect(wrapper.find(Message)).toHaveLength(2);

          case 8:
          case "end":
            return _context5.stop();
        }
      }
    }, _callee5);
  })));
});