/* eslint-disable no-underscore-dangle */
import React from 'react';
import { createIntl } from 'react-intl';
import collaboratorList from '../__mocks__/collaborators';
import { PresenceComponent as Presence } from '../Presence';
var GlobalDate = Date;
var intl = createIntl({});
describe('features/presence/Presence', function () {
  beforeEach(function () {
    global.Date = jest.fn(function (date) {
      return new GlobalDate(date);
    });

    global.Date.now = function () {
      return 1000;
    };
  });
  afterEach(function () {
    global.Date = GlobalDate;
  });
  describe('render()', function () {
    test('should correctly render empty state', function () {
      var collaborators = [];
      var wrapper = shallow(React.createElement(Presence, {
        intl: intl,
        collaborators: collaborators
      }));
      expect(wrapper.find('.presence-avatar-container').length).toBe(1);
      expect(wrapper.find('PresenceAvatar').length).toBe(0);
      expect(wrapper.find('.presence-count').length).toBe(0);
    });
    test('should set isDropdownActive to true and call OnFlyoutOpen when _handleOverlayOpen is called', function () {
      var onFlyoutOpenSpy = jest.fn();
      var wrapper = shallow(React.createElement(Presence, {
        intl: intl,
        collaborators: collaboratorList,
        onFlyoutOpen: onFlyoutOpenSpy
      }));
      var instance = wrapper.instance();

      instance._handleOverlayOpen();

      expect(wrapper.state('isDropdownActive')).toBe(true);
      expect(onFlyoutOpenSpy).toHaveBeenCalled();
    });
    test('should set isDropdownActive to false and call OnFlyoutOpen and OnflyoutClose when _handleOverlayClose is called after _handleOverlayOpen', function () {
      var onFlyoutOpenSpy = jest.fn();
      var onFlyoutCloseSpy = jest.fn();
      var wrapper = shallow(React.createElement(Presence, {
        intl: intl,
        collaborators: collaboratorList,
        onFlyoutClose: onFlyoutCloseSpy,
        onFlyoutOpen: onFlyoutOpenSpy
      }));
      var instance = wrapper.instance();

      instance._handleOverlayOpen();

      instance._handleOverlayClose();

      expect(wrapper.state('isDropdownActive')).toBe(false);
      expect(onFlyoutOpenSpy).toHaveBeenCalled();
      expect(onFlyoutCloseSpy).toHaveBeenCalled();
    }); // GROWTH-382

    describe('Tests for presence autofly - GROWTH-382 AB test', function () {
      test('should render autofly on load when the experiment bucket is "flyout"', function () {
        var wrapper = shallow(React.createElement(Presence, {
          intl: intl,
          collaborators: collaboratorList,
          experimentBucket: "flyout",
          onClickViewCollaborators: jest.fn()
        }));
        expect(wrapper).toMatchSnapshot();
        expect(wrapper.find('.presence-autofly-first-load').length).toBe(1);
      });
      test('should not render autofly on load when the experiment bucket is "control" or null', function () {
        [{
          bucketName: 'control'
        }, {
          bucketName: null
        }].forEach(function (_ref) {
          var bucketName = _ref.bucketName;
          var wrapper = shallow(React.createElement(Presence, {
            intl: intl,
            collaborators: collaboratorList,
            experimentBucket: bucketName,
            onClickViewCollaborators: jest.fn()
          }));
          expect(wrapper).toMatchSnapshot();
          expect(wrapper.find('.presence-autofly-first-load').length).toBe(0);
        });
      });
      test('should not render autofly treatment when there are no collaborators to list', function () {
        var noCollaborators = [];
        var wrapper = shallow(React.createElement(Presence, {
          intl: intl,
          collaborators: noCollaborators,
          experimentBucket: "flyout",
          onClickViewCollaborators: jest.fn()
        }));
        expect(wrapper).toMatchSnapshot();
        expect(wrapper.find('.presence-autofly-first-load').length).toBe(0);
      });
      test('should not render autofly treatment when there is no click handler to open the recents panel', function () {
        var wrapper = shallow(React.createElement(Presence, {
          intl: intl,
          collaborators: collaboratorList,
          experimentBucket: "flyout"
        }));
        expect(wrapper).toMatchSnapshot();
        expect(wrapper.find('.presence-autofly-first-load').length).toBe(0);
      });
      test('_showRecentsFlyout performs correct actions', function () {
        var mockOnClickViewCollaborators = jest.fn();
        var mockEvent = {
          preventDefault: function preventDefault() {},
          stopPropagation: function stopPropagation() {}
        };
        var wrapper = shallow(React.createElement(Presence, {
          intl: intl,
          collaborators: collaboratorList,
          experimentBucket: "flyout",
          onClickViewCollaborators: mockOnClickViewCollaborators
        }));

        wrapper.instance()._showRecentsFlyout(mockEvent);

        expect(mockOnClickViewCollaborators.mock.calls.length).toBe(1);
        expect(wrapper.state('showActivityPrompt')).toBe(false);
      });
      test('should show the Presence dropdown when state.showActivityPrompt is false', function () {
        var wrapper = shallow(React.createElement(Presence, {
          intl: intl,
          collaborators: collaboratorList,
          experimentBucket: "flyout",
          onClickViewCollaborators: jest.fn()
        }));
        expect(wrapper.find('PresenceCollaboratorsList').length).toBe(0);
        wrapper.setState({
          showActivityPrompt: false
        }).update();
        expect(wrapper.find('PresenceCollaboratorsList').length).toBe(1);
        expect(wrapper.find('.presence-overlay-request-stats').length).toBe(1);
      });
      test('calls callback to open access stats when that link is clicked', function () {
        var mockRequestAccessStats = jest.fn();
        var wrapper = shallow(React.createElement(Presence, {
          intl: intl,
          collaborators: collaboratorList,
          experimentBucket: "flyout",
          onAccessStatsRequested: mockRequestAccessStats,
          onClickViewCollaborators: jest.fn()
        }));
        wrapper.setState({
          showActivityPrompt: false
        }).update();
        wrapper.find('.presence-overlay-request-stats').simulate('click');
        expect(mockRequestAccessStats.mock.calls.length).toBe(1);
      });
    }); // end GROWTH-382
  });
});