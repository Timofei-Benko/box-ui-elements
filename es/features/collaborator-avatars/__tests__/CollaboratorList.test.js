function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

import * as React from 'react';
import CollaboratorList from '../CollaboratorList';
describe('features/collaborator-avatars/CollaboratorList', function () {
  var collaborators = [{
    collabID: 1,
    userID: 1,
    type: 'user',
    name: 'test a',
    email: 'testa@example.com',
    hasCustomAvatar: false
  }, {
    collabID: 2,
    userID: 2,
    type: 'user',
    name: 'test b',
    email: 'testb@example.com'
  }, {
    collabID: 3,
    userID: 3,
    type: 'user',
    name: 'test c',
    email: 'testc@example.com',
    profileUrl: 'http://foo.bar.profile',
    hasCustomAvatar: true,
    imageUrl: 'https://foo.bar'
  }];
  collaborators.size = collaborators.length;
  var item = {
    id: '111',
    name: 'test file',
    type: 'file',
    hideCollaborators: false
  };

  var getWrapper = function getWrapper() {
    var props = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    return shallow(React.createElement(CollaboratorList, _extends({
      collaborators: collaborators,
      item: item,
      name: "test",
      trackingProps: {}
    }, props)));
  };

  describe('render()', function () {
    test('should render default component', function () {
      var wrapper = getWrapper();
      expect(wrapper).toMatchSnapshot();
    });
    test('should call onDoneClick() when done button is clicked', function () {
      var onDoneClickMock = jest.fn();
      var wrapper = getWrapper({
        onDoneClick: onDoneClickMock
      });
      var doneBtn = wrapper.find('Button');
      expect(doneBtn.length).toBe(1);
      doneBtn.simulate('click');
      expect(onDoneClickMock).toHaveBeenCalled();
    });
    test('should render extra row with View additional people if list.size > maxCollaboratorListSize', function () {
      var wrapper = getWrapper({
        maxCollaboratorListSize: 2
      });
      expect(wrapper).toMatchSnapshot();
    });
  });
});