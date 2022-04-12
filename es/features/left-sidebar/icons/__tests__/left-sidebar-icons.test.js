import React from 'react';
import IconAdminConsole from '../IconAdminConsole';
import IconAllFiles from '../IconAllFiles';
import IconAutomations from '../IconAutomations';
import IconBoxRelay from '../IconBoxRelay';
import IconDevConsole from '../IconDevConsole';
import IconFavorites from '../IconFavorites';
import IconFeed from '../IconFeed';
import IconNotes from '../IconNotes';
import IconNotifications from '../IconNotifications';
import IconOwnedByMe from '../IconOwnedByMe';
import IconRecents from '../IconRecents';
import IconRelay from '../IconRelay';
import IconSharedWithMe from '../IconSharedWithMe';
import IconSynced from '../IconSynced';
import IconTrash from '../IconTrash';
describe('icons/left-sidebar', function () {
  [{
    Icon: IconAdminConsole
  }, {
    Icon: IconAutomations
  }, {
    Icon: IconBoxRelay
  }, {
    Icon: IconAllFiles
  }, {
    Icon: IconDevConsole
  }, {
    Icon: IconFavorites
  }, {
    Icon: IconFeed
  }, {
    Icon: IconNotes
  }, {
    Icon: IconNotifications
  }, {
    Icon: IconOwnedByMe
  }, {
    Icon: IconRecents
  }, {
    Icon: IconRelay
  }, {
    Icon: IconSharedWithMe
  }, {
    Icon: IconSynced
  }, {
    Icon: IconTrash
  }].forEach(function (_ref) {
    var Icon = _ref.Icon;
    test('should correctly render default icon', function () {
      var wrapper = shallow(React.createElement(Icon, null));
      expect(wrapper).toMatchSnapshot();
    });
    test('should correctly render icon with specified color', function () {
      var color = '#ffffff';
      var wrapper = shallow(React.createElement(Icon, {
        color: color
      }));
      expect(wrapper).toMatchSnapshot();
    });
    test('should correctly render icon with specified width and height', function () {
      var width = 16;
      var wrapper = shallow(React.createElement(Icon, {
        width: width
      }));
      expect(wrapper).toMatchSnapshot();
    });
    test('should correctly render icon with title', function () {
      var title = 'fool';
      var wrapper = shallow(React.createElement(Icon, {
        title: title
      }));
      expect(wrapper).toMatchSnapshot();
    });
    test('should respect selected state', function () {
      var title = 'pity';
      var isSelected = true;
      var wrapper = shallow(React.createElement(Icon, {
        selected: isSelected,
        title: title
      }));
      expect(wrapper).toMatchSnapshot();
    });
  });
});