import React from 'react';
import RetentionPolicy from '../RetentionPolicy';
describe('features/item-details/RetentionPolicy', function () {
  var getWrapper = function getWrapper() {
    var props = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    return shallow(React.createElement(RetentionPolicy, props));
  };

  test('should render null when retentionPolicyDescription is not specified', function () {
    var wrapper = getWrapper();
    expect(wrapper).toMatchSnapshot();
  });
  test('should not render policy expiration', function () {
    var wrapper = getWrapper({
      retentionPolicyDescription: 'Policy one',
      policyType: 'indefinite'
    });
    expect(wrapper).toMatchSnapshot();
  });
  test('should render policy expiration', function () {
    var wrapper = getWrapper({
      retentionPolicyDescription: 'Policy one',
      policyType: 'finite',
      dispositionTime: 1489899991883
    });
    expect(wrapper).toMatchSnapshot();
  });
  test('should render retention policy extend button', function () {
    var wrapper = getWrapper({
      retentionPolicyDescription: 'Retention',
      policyType: 'finite',
      openModal: function openModal() {},
      dispositionTime: 1489899991883
    });
    expect(wrapper).toMatchSnapshot();
  });
});