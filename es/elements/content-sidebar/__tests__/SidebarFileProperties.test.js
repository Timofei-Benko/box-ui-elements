function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

import set from 'lodash/set';
import React from 'react';
import { shallow, mount } from 'enzyme';
import ItemProperties from '../../../features/item-details/ItemProperties';
import InlineError from '../../../components/inline-error/InlineError';
import SidebarFileProperties, { SidebarFilePropertiesComponent } from '../SidebarFileProperties';
import { PLACEHOLDER_USER } from '../../../constants';
describe('elements/content-sidebar/SidebarFileProperties', function () {
  var getWrapper = function getWrapper(props) {
    return shallow(React.createElement(SidebarFilePropertiesComponent, props));
  };

  var getMountWrapper = function getMountWrapper(props) {
    return mount(React.createElement(SidebarFilePropertiesComponent, props));
  };

  var props = {
    file: {
      content_created_at: '2018-04-18T16:56:05.352Z',
      content_modified_at: '2018-04-18T16:56:05.352Z',
      description: 'foo',
      owned_by: {
        name: 'foo'
      },
      created_by: {
        name: 'foo'
      },
      size: '1',
      permissions: {
        can_rename: true
      },
      uploader_display_name: 'File Request'
    },
    onDescriptionChange: jest.fn(),
    intl: {
      locale: 'en'
    }
  };
  var retentionPolicyProps = {
    file: {
      size: '1'
    },
    hasRetentionPolicy: true,
    onRetentionPolicyExtendClick: jest.fn(),
    retentionPolicy: {
      dispositionTime: 1556317461,
      policyName: 'test policy',
      policyType: 'finite',
      retentionPolicyDescription: 'test policy (1 year retention & auto-deletion'
    },
    intl: {
      locale: 'en'
    }
  };
  describe('render()', function () {
    test('should render ItemProperties', function () {
      var wrapper = getWrapper(props);
      expect(wrapper.find(ItemProperties)).toHaveLength(1);
      expect(wrapper).toMatchSnapshot();
    });
    test('should render ItemProperties for anonymous uploaders', function () {
      var propsHere = set(_objectSpread({}, props), 'file.created_by.id', PLACEHOLDER_USER.id);
      var wrapper = getWrapper(propsHere);
      expect(wrapper.find(ItemProperties)).toHaveLength(1);
      expect(wrapper).toMatchSnapshot();
    });
    test('should render an error', function () {
      var fakeError = {
        id: 'foo',
        description: 'bar',
        defaultMessage: 'baz'
      };
      var errorProps = {
        inlineError: {
          title: fakeError,
          content: fakeError
        }
      };
      var wrapper = shallow(React.createElement(SidebarFileProperties, errorProps)).dive();
      expect(wrapper.find(InlineError)).toHaveLength(1);
      expect(wrapper).toMatchSnapshot();
    });
    test('should render retention policy information when given proper props and callback', function () {
      var wrapper = getMountWrapper(retentionPolicyProps);
      expect(wrapper).toMatchSnapshot();
    });
  });
});