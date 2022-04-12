function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

import * as React from 'react';
import CollaboratorListItem from '../CollaboratorListItem';
describe('features/collaborator-avatars/CollaboratorListItem', function () {
  var collaborator = {
    name: 'test c',
    email: 'testc@example.com',
    profileUrl: 'http://foo.bar.profile',
    hasCustomAvatar: true,
    imageUrl: 'https://foo.bar',
    expiration: {
      expiresAt: 'Jan 1, 1966'
    }
  };

  var getWrapper = function getWrapper() {
    var props = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    return shallow(React.createElement(CollaboratorListItem, _extends({
      collaborator: collaborator,
      id: "111",
      index: 1,
      trackingProps: {
        usernameProps: undefined,
        emailProps: undefined
      }
    }, props)));
  };

  describe('render()', function () {
    test('should render default component', function () {
      var wrapper = getWrapper();
      expect(wrapper).toMatchSnapshot();
    });
    test('should render pending collaborator', function () {
      var wrapper = getWrapper({
        collaborator: {
          name: 'test c',
          email: 'testc@example.com',
          profileUrl: 'http://foo.bar.profile',
          hasCustomAvatar: true,
          imageUrl: 'https://foo.bar',
          expiration: {
            expiresAt: 'Jan 1, 1966'
          },
          type: 'pending'
        }
      });
      expect(wrapper).toMatchSnapshot();
    });
    test('should render group collaborator', function () {
      var wrapper = getWrapper({
        collaborator: {
          name: 'test c',
          email: 'testc@example.com',
          profileUrl: 'http://foo.bar.profile',
          hasCustomAvatar: true,
          imageUrl: 'https://foo.bar',
          expiration: {
            expiresAt: 'Jan 1, 1966'
          },
          type: 'group'
        }
      });
      expect(wrapper).toMatchSnapshot();
    });
  });
});