import React from 'react';
import { shallow } from 'enzyme';
import CustomInstance from '../CustomInstance';
describe('CustomInstance', function () {
  describe('onAddFieldToggle()', function () {
    test('should toggle add field', function () {
      var component = shallow(React.createElement(CustomInstance, null));
      var instance = component.instance();
      instance.onAddFieldToggle();
      expect(component.state('isAddFieldVisible')).toEqual(true);
    });
  });
  describe('getDerivedStateFromProps()', function () {
    test('should merge data into the state properties', function () {
      var fakeData = {
        test: '123',
        file: '345'
      };
      var mockRespData = {
        test: '789',
        file: 'ABC'
      };
      var component = shallow(React.createElement(CustomInstance, {
        data: fakeData
      }));
      component.setProps({
        data: mockRespData
      });
      expect(component.state('properties')).toEqual(mockRespData);
    });
  });
});