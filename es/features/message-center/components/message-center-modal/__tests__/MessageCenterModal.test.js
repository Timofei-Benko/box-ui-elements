function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

import * as React from 'react';
import { act } from 'react-dom/test-utils';
import debounce from 'lodash/debounce';
import throttle from 'lodash/throttle';
import { AutoSizer } from '@box/react-virtualized';
import { mountConnected } from '../../../../../test-utils/enzyme';
import MessageCenterModal from '../MessageCenterModal';
import Message from '../../message/Message';
import CollapsibleScrollbar from '../../collapsibile-scrollbar/CollapsibleScrollbar';
jest.mock('lodash/debounce');
jest.mock('lodash/throttle');
jest.mock('../../message/Message', function () {
  return function () {
    return 'message';
  };
});
describe('components/message-center/components/message-center-modal/MessageCenterModal', function () {
  beforeEach(function () {
    debounce.mockImplementation(function (fn) {
      return fn;
    });
    throttle.mockImplementation(function (fn) {
      return fn;
    });
    jest.spyOn(AutoSizer.prototype, 'render').mockImplementation(function render() {
      return React.createElement("div", null, this.props.children({
        width: 720,
        height: 1024
      }));
    });
  });
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
  }];
  var defaultProps = {
    messages: messageResponse,
    onMessageShown: function onMessageShown() {}
  };

  function getWrapper(props) {
    return mountConnected(React.createElement(MessageCenterModal, _extends({}, defaultProps, props)));
  }

  test('should collapse filters when scrolled down and mouse is not in title',
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
            act(function () {
              wrapper.find('[data-testid="modal-title"]').prop('onMouseEnter')();
            });
            wrapper.update();
            expect(wrapper.find('[data-testid="modal-title"]').hasClass('is-collapsed')).toBe(false);
            act(function () {
              wrapper.find('[data-testid="modal-title"]').prop('onMouseLeave')();
              wrapper.find(CollapsibleScrollbar).prop('onScroll')({
                scrollHeight: 100,
                clientHeight: 200,
                scrollTop: 10
              }, {
                scrollHeight: 100,
                clientHeight: 200,
                scrollTop: 0
              });
            });
            wrapper.update();
            expect(wrapper.find('[data-testid="modal-title"]').hasClass('is-collapsed')).toBe(true);

          case 9:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  })));
  test('should expand filters when scrolled up',
  /*#__PURE__*/
  _asyncToGenerator(
  /*#__PURE__*/
  regeneratorRuntime.mark(function _callee2() {
    var wrapper;
    return regeneratorRuntime.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            _context2.next = 2;
            return getWrapper();

          case 2:
            wrapper = _context2.sent;
            act(function () {
              wrapper.find('[data-testid="modal-title"]').prop('onMouseLeave')();
              wrapper.find(CollapsibleScrollbar).prop('onScroll')({
                scrollHeight: 100,
                clientHeight: 200,
                scrollTop: 10
              }, {
                scrollHeight: 100,
                clientHeight: 200,
                scrollTop: 0
              });
            });
            wrapper.update();
            expect(wrapper.find('[data-testid="modal-title"]').hasClass('is-expanded')).toBe(false);
            act(function () {
              wrapper.find(CollapsibleScrollbar).prop('onScroll')({
                scrollHeight: 100,
                clientHeight: 200,
                scrollTop: 0
              }, {
                scrollHeight: 100,
                clientHeight: 200,
                scrollTop: 10
              });
            });
            wrapper.update();
            expect(wrapper.find('[data-testid="modal-title"]').hasClass('is-expanded')).toBe(true);

          case 9:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2);
  })));
  test('should expand filters when mouse moves into title',
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
            act(function () {
              wrapper.find('[data-testid="modal-title"]').prop('onMouseLeave')();
              wrapper.find(CollapsibleScrollbar).prop('onScroll')({
                scrollHeight: 100,
                clientHeight: 200,
                scrollTop: 10
              }, {
                scrollHeight: 100,
                clientHeight: 200,
                scrollTop: 0
              });
            });
            wrapper.update();
            expect(wrapper.find('[data-testid="modal-title"]').hasClass('is-expanded')).toBe(false);
            act(function () {
              wrapper.find('[data-testid="modal-title"]').prop('onMouseEnter')();
            });
            wrapper.update();
            expect(wrapper.find('[data-testid="modal-title"]').hasClass('is-expanded')).toBe(true);

          case 9:
          case "end":
            return _context3.stop();
        }
      }
    }, _callee3);
  })));
  test('should not expand/collapse when client height changes',
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
            expect(wrapper.find('[data-testid="modal-title"]').hasClass('is-expanded')).toBe(true);
            act(function () {
              wrapper.find(CollapsibleScrollbar).prop('onScroll')({
                scrollHeight: 100,
                clientHeight: 200,
                scrollTop: 10
              }, {
                scrollHeight: 100,
                clientHeight: 300,
                scrollTop: 0
              });
            });
            wrapper.update();
            expect(wrapper.find('[data-testid="modal-title"]').hasClass('is-expanded')).toBe(true);

          case 7:
          case "end":
            return _context4.stop();
        }
      }
    }, _callee4);
  })));
  test('should render ErrorState when messages is an error',
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
            return getWrapper({
              messages: new Error('network error')
            });

          case 2:
            wrapper = _context5.sent;
            expect(wrapper.find('ErrorState').exists()).toBe(true);

          case 4:
          case "end":
            return _context5.stop();
        }
      }
    }, _callee5);
  })));
  test('should display in correct order',
  /*#__PURE__*/
  _asyncToGenerator(
  /*#__PURE__*/
  regeneratorRuntime.mark(function _callee6() {
    var wrapper;
    return regeneratorRuntime.wrap(function _callee6$(_context6) {
      while (1) {
        switch (_context6.prev = _context6.next) {
          case 0:
            _context6.next = 2;
            return getWrapper();

          case 2:
            wrapper = _context6.sent;
            expect(wrapper.find(Message)).toHaveLength(3);
            expect(wrapper.find(Message).at(0).prop('id')).toBe(2);
            expect(wrapper.find(Message).at(1).prop('id')).toBe(3);
            expect(wrapper.find(Message).at(2).prop('id')).toBe(1);

          case 7:
          case "end":
            return _context6.stop();
        }
      }
    }, _callee6);
  })));
  test('should display all categories when > 1 categories in messages',
  /*#__PURE__*/
  _asyncToGenerator(
  /*#__PURE__*/
  regeneratorRuntime.mark(function _callee7() {
    var wrapper;
    return regeneratorRuntime.wrap(function _callee7$(_context7) {
      while (1) {
        switch (_context7.prev = _context7.next) {
          case 0:
            _context7.next = 2;
            return getWrapper();

          case 2:
            wrapper = _context7.sent;
            expect(wrapper.find('CategorySelector').exists()).toBe(true);

          case 4:
          case "end":
            return _context7.stop();
        }
      }
    }, _callee7);
  })));
  test('should not display any categories when 1 or less category in messages',
  /*#__PURE__*/
  _asyncToGenerator(
  /*#__PURE__*/
  regeneratorRuntime.mark(function _callee8() {
    var messages, wrapper;
    return regeneratorRuntime.wrap(function _callee8$(_context8) {
      while (1) {
        switch (_context8.prev = _context8.next) {
          case 0:
            messages = [{
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
            }];
            _context8.next = 3;
            return getWrapper({
              messages: messages
            });

          case 3:
            wrapper = _context8.sent;
            expect(wrapper.find('CategorySelector').exists()).toBe(false);

          case 5:
          case "end":
            return _context8.stop();
        }
      }
    }, _callee8);
  })));
  test('should call onMessageShown when message rendered',
  /*#__PURE__*/
  _asyncToGenerator(
  /*#__PURE__*/
  regeneratorRuntime.mark(function _callee9() {
    var onMessageShown;
    return regeneratorRuntime.wrap(function _callee9$(_context9) {
      while (1) {
        switch (_context9.prev = _context9.next) {
          case 0:
            onMessageShown = jest.fn();
            _context9.next = 3;
            return getWrapper({
              onMessageShown: onMessageShown
            });

          case 3:
            expect(onMessageShown).toHaveBeenCalledTimes(3);

          case 4:
          case "end":
            return _context9.stop();
        }
      }
    }, _callee9);
  })));
});