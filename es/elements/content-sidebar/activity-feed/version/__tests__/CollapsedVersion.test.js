function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

import * as React from 'react';
import { shallow } from 'enzyme';
import selectors from '../../../../common/selectors/version';
import { CollapsedVersionBase as CollapsedVersion } from '../CollapsedVersion';
var translationProps = {
  intl: {
    formatMessage: function formatMessage() {}
  }
};
describe('elements/content-sidebar/ActivityFeed/version/CollapsedVersion', function () {
  var render = function render(item) {
    return shallow(React.createElement(CollapsedVersion, _extends({}, translationProps, item)));
  };

  beforeEach(function () {
    selectors.getVersionAction = jest.fn().mockReturnValue('upload');
  });
  test('should correctly render for single collaborator', function () {
    var version_start = 1;
    var version_end = 10;
    var item = {
      collaborators: {
        1: {
          name: 'Person one',
          id: 1
        }
      },
      version_start: version_start,
      version_end: version_end
    };
    var wrapper = render(item);
    var formattedMessage = wrapper.find('FormattedMessage');
    expect(wrapper).toMatchSnapshot();
    var renderedVersionsMessage = shallow(formattedMessage.prop('values').versions);
    expect(renderedVersionsMessage).toMatchSnapshot();
  });
  test('should correctly render for multiple collaborators', function () {
    var version_start = 1;
    var version_end = 10;
    var item = {
      collaborators: {
        1: {
          name: 'Person one',
          id: 1
        },
        2: {
          name: 'Person two',
          id: 2
        }
      },
      version_start: version_start,
      version_end: version_end
    };
    var wrapper = render(item);
    var formattedMessage = wrapper.find('FormattedMessage');
    expect(wrapper).toMatchSnapshot();
    var renderedVersionsMessage = shallow(formattedMessage.prop('values').versions);
    expect(renderedVersionsMessage).toMatchSnapshot();
  });
  test('should correctly render info icon if onInfo is passed', function () {
    var item = {
      onInfo: function onInfo() {},
      collaborators: {
        1: {
          name: 'Person one',
          id: 1
        },
        2: {
          name: 'Person two',
          id: 2
        }
      },
      version_start: 1,
      version_end: 10
    };
    var wrapper = render(item);
    expect(wrapper.exists('IconInfo')).toBe(true);
  });
  test('should not render a message if action is not upload', function () {
    selectors.getVersionAction.mockReturnValueOnce('delete');
    var item = {
      collaborators: {
        1: {
          name: 'Person one',
          id: 1
        }
      },
      version_start: 1,
      version_end: 10
    };
    var wrapper = render(item);
    var formattedMessage = wrapper.find('FormattedMessage');
    expect(formattedMessage.length).toBe(0);
  });
});