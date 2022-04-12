import React from 'react';
import { shallow } from 'enzyme';
import Collapsible from '../../../components/collapsible';
import SidebarClassification from '../SidebarClassification';
describe('elements/content-sidebar/SidebarClassification', function () {
  var getWrapper = function getWrapper(props) {
    return shallow(React.createElement(SidebarClassification, props));
  };

  describe('render()', function () {
    test('should render nothing when not classified and can_upload is false', function () {
      var props = {
        file: {
          permissions: {
            can_upload: false
          }
        },
        onEdit: jest.fn(),
        intl: {
          formatMessage: jest.fn()
        }
      };
      var wrapper = getWrapper(props);
      expect(wrapper).toMatchSnapshot();
    });
    test('should render classification with an edit button when can_upload is true', function () {
      var props = {
        classification: {
          name: 'Public',
          definition: 'message'
        },
        file: {
          permissions: {
            can_upload: true
          }
        },
        onEdit: jest.fn(),
        intl: {
          formatMessage: jest.fn()
        }
      };
      var wrapper = getWrapper(props);
      var collapsible = wrapper.find(Collapsible);
      expect(collapsible).toHaveLength(1);
      expect(wrapper).toMatchSnapshot();
    });
    test('should render classification with no edit button when can_upload is false', function () {
      var wrapper = getWrapper({
        classification: {
          name: 'Public',
          definition: 'message'
        },
        onEdit: jest.fn(),
        intl: {
          formatMessage: jest.fn()
        }
      });
      var collapsible = wrapper.find(Collapsible);
      expect(collapsible.prop('headerActionItems')).toBeNull();
      expect(collapsible).toHaveLength(1);
      expect(wrapper).toMatchSnapshot();
    });
    test('should render classification with no edit button when onEdit is null', function () {
      var wrapper = getWrapper({
        classification: {
          name: 'Public',
          definition: 'message'
        },
        onEdit: null,
        file: {
          permissions: {
            can_upload: true
          }
        },
        intl: {
          formatMessage: jest.fn()
        }
      });
      var collapsible = wrapper.find(Collapsible);
      expect(collapsible.prop('headerActionItems')).toBeNull();
      expect(collapsible).toHaveLength(1);
      expect(wrapper).toMatchSnapshot();
    });
  });
});