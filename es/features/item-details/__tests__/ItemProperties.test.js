import React from 'react';
import ItemProperties from '../ItemProperties';
describe('features/item-details/ItemProperties', function () {
  var getWrapper = function getWrapper() {
    var props = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    return shallow(React.createElement(ItemProperties, props));
  };

  test('should not render properties when not specified', function () {
    var wrapper = getWrapper();
    expect(wrapper).toMatchSnapshot();
  });
  test('should render properties when specified', function () {
    var wrapper = getWrapper({
      createdAt: '2012-12-12T11:04:26-08:00',
      description: 'Hi\ntesting this link http://box.com',
      enterpriseOwner: 'Test Enterprise Owner',
      modifiedAt: 1459832991883,
      owner: 'Test Owner',
      size: '3.3 KB',
      trashedAt: '2013-02-07T10:49:34-08:00',
      uploader: 'Test Uploader'
    });
    expect(wrapper).toMatchSnapshot();
  });
  [{
    description: 'description'
  }, {
    description: ''
  }].forEach(function (_ref) {
    var description = _ref.description;
    test('should render editable description when onDescriptionChange is specified', function () {
      var wrapper = getWrapper({
        description: description,
        descriptionTextareaProps: {
          'data-resin-target': 'description'
        },
        onDescriptionChange: function onDescriptionChange() {}
      });
      expect(wrapper).toMatchSnapshot();
    });
  });
  test('should pass classification props to ClassificationProperty when specified', function () {
    var wrapper = getWrapper({
      classificationProps: {
        openModal: function openModal() {},
        tooltip: 'tooltip',
        value: 'value'
      }
    });
    expect(wrapper).toMatchSnapshot();
  });
  test('should render readonly url when only url is specified', function () {
    var wrapper = getWrapper({
      url: 'box.com'
    });
    expect(wrapper).toMatchSnapshot();
  });
  test('should render editable url when url and onValidURLChange are specified', function () {
    var wrapper = getWrapper({
      onValidURLChange: function onValidURLChange() {},
      url: 'box.com'
    });
    expect(wrapper).toMatchSnapshot();
  });
});