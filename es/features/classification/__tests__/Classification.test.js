function _templateObject() {
  var data = _taggedTemplateLiteral(["\n        isImportedClassification | expectedModifedByMessageId\n        ", "             | ", "\n        ", "                 | ", "\n        ", "                  | ", "\n    "]);

  _templateObject = function _templateObject() {
    return data;
  };

  return data;
}

function _taggedTemplateLiteral(strings, raw) { if (!raw) { raw = strings.slice(0); } return Object.freeze(Object.defineProperties(strings, { raw: { value: Object.freeze(raw) } })); }

import React from 'react';
import Classification from '../Classification';
import ClassifiedBadge from '../ClassifiedBadge';
import SecurityControls from '../security-controls';
import LoadingIndicator from '../../../components/loading-indicator/LoadingIndicator';
import messages from '../messages';
describe('features/classification/Classification', function () {
  var getWrapper = function getWrapper() {
    var props = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    return shallow(React.createElement(Classification, props));
  };

  test('should render a classified badge with no definition', function () {
    var wrapper = getWrapper({
      name: 'Confidential'
    });
    expect(wrapper).toMatchSnapshot();
  });
  test('should render empty when classification does not exist but is editable', function () {
    var wrapper = getWrapper();
    expect(wrapper.find(ClassifiedBadge).length).toBe(0);
    expect(wrapper.find('.bdl-Classification-definition').length).toBe(0);
    expect(wrapper.find('.bdl-Classification-missingMessage').length).toBe(0);
  });
  test('should render not classified message', function () {
    var wrapper = getWrapper({
      messageStyle: 'inline'
    });
    expect(wrapper).toMatchSnapshot();
  });
  test('should render a classified badge with an inline definition', function () {
    var wrapper = getWrapper({
      name: 'Confidential',
      definition: 'fubar',
      messageStyle: 'inline'
    });
    expect(wrapper).toMatchSnapshot();
  });
  test('should render a classified badge with definition in tooltip', function () {
    var wrapper = getWrapper({
      name: 'Confidential',
      definition: 'fubar',
      messageStyle: 'tooltip'
    });
    expect(wrapper).toMatchSnapshot();
  });
  test('should render a classified badge with click functionality', function () {
    var wrapper = getWrapper({
      name: 'Confidential',
      definition: 'fubar',
      messageStyle: 'tooltip',
      onClick: function onClick() {}
    });
    expect(wrapper).toMatchSnapshot();
  });
  test('should not render classification last modified information when modified props are not provided', function () {
    var wrapper = getWrapper({
      name: 'Confidential',
      definition: 'fubar',
      messageStyle: 'inline'
    });
    expect(wrapper.exists('[data-testid="classification-modifiedby"]')).toBe(false);
  });
  test('should not render classification last modified information when message is tooltip', function () {
    var wrapper = getWrapper({
      name: 'Confidential',
      definition: 'fubar',
      messageStyle: 'tooltip',
      modifiedAt: '2020-07-16T00:51:10.000Z',
      modifiedBy: 'A User'
    });
    expect(wrapper.exists('[data-testid="classification-modifiedby"]')).toBe(false);
  });
  test.each(_templateObject(), undefined, messages.modifiedBy.id, false, messages.modifiedBy.id, true, messages.importedBy.id)("should render classification last modified information with message id ($expectedModifedByMessageId)\n        when it has modifiedBy (and isImportedClassification: $isImportedClassification) and message style is inline", function (_ref) {
    var isImportedClassification = _ref.isImportedClassification,
        expectedModifedByMessageId = _ref.expectedModifedByMessageId;
    var wrapper = getWrapper({
      name: 'Confidential',
      definition: 'fubar',
      isImportedClassification: isImportedClassification,
      messageStyle: 'inline',
      modifiedAt: '2020-07-16T00:51:10.000Z',
      modifiedBy: 'A User'
    });
    var modifiedByFormattedMsg = wrapper.find('FormattedMessage');
    expect(wrapper.exists('[data-testid="classification-modifiedby"]')).toBe(true);
    expect(modifiedByFormattedMsg.prop('id')).toEqual(expectedModifedByMessageId);
    expect(modifiedByFormattedMsg).toMatchSnapshot();
  });
  test('should render a classified badge with security controls when provided and message style is inline', function () {
    var wrapper = getWrapper({
      name: 'Confidential',
      definition: 'fubar',
      messageStyle: 'inline',
      controls: {
        sharedLink: {
          accessLevel: 'collabOnly'
        }
      }
    });
    expect(wrapper).toMatchSnapshot();
  });
  test('should not render security controls when message style is tooltip', function () {
    var wrapper = getWrapper({
      name: 'Confidential',
      definition: 'fubar',
      messageStyle: 'inline',
      controls: {
        sharedLink: {
          accessLevel: 'collabOnly'
        }
      }
    });
    expect(wrapper.find(SecurityControls)).toHaveLength(1);
    wrapper.setProps({
      messageStyle: 'tooltip'
    });
    expect(wrapper.find(SecurityControls)).toHaveLength(0);
  });
  test('should render loading indicator when isLoadingControls is true and controls are not provided', function () {
    var wrapper = getWrapper({
      name: 'Confidential',
      definition: 'fubar',
      messageStyle: 'inline',
      isLoadingControls: true
    });
    expect(wrapper.find(LoadingIndicator)).toHaveLength(1);
    expect(wrapper.find(SecurityControls)).toHaveLength(0);
  });
  test('should render loading indicator when isLoadingControls is true and controls are provided', function () {
    var wrapper = getWrapper({
      name: 'Confidential',
      definition: 'fubar',
      messageStyle: 'inline',
      isLoadingControls: true,
      controls: {
        sharedLink: {
          accessLevel: 'collabOnly'
        }
      }
    });
    expect(wrapper.find(LoadingIndicator)).toHaveLength(1);
    expect(wrapper.find(SecurityControls)).toHaveLength(0);
  });
  test('should not render loading indicator when item is not classified', function () {
    var wrapper = getWrapper({
      messageStyle: 'inline',
      isLoadingControls: true
    });
    expect(wrapper.find(LoadingIndicator)).toHaveLength(0);
    expect(wrapper.find(SecurityControls)).toHaveLength(0);
  });
  test('should not render loading indicator when message style is not inline', function () {
    var wrapper = getWrapper({
      messageStyle: 'tooltip',
      isLoadingControls: true
    });
    expect(wrapper.find(LoadingIndicator)).toHaveLength(0);
    expect(wrapper.find(SecurityControls)).toHaveLength(0);
  });
});