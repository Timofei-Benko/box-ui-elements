import * as React from 'react';
import { shallow } from 'enzyme';
import EditableKeywords from '../EditableKeywords';
describe('elements/content-sidebar/Skills/Keywords/EditableKeywords', function () {
  test('should correctly render', function () {
    var props = {
      keywords: [{
        text: 'foo'
      }, {
        text: 'bar'
      }],
      onAdd: jest.fn(),
      onDelete: jest.fn(),
      onSave: jest.fn(),
      onCancel: jest.fn()
    };
    var wrapper = shallow(React.createElement(EditableKeywords, props));
    expect(wrapper).toMatchSnapshot();
  });
  describe('onKeyDown()', function () {
    test('should call onBlur when enter is pressed and is not in composition mode', function () {
      var wrapper = shallow(React.createElement(EditableKeywords, null));
      var instance = wrapper.instance();
      instance.onBlur = jest.fn();
      instance.onKeyDown({
        key: 'Enter'
      });
      expect(instance.onBlur).toBeCalled();
    });
    test('should not call onBlur when in composition mode', function () {
      var wrapper = shallow(React.createElement(EditableKeywords, null));
      var instance = wrapper.instance();
      instance.setState({
        isInCompositionMode: true
      });
      instance.onBlur = jest.fn();
      instance.onKeyDown({
        key: 'Enter'
      });
      expect(instance.onBlur).not.toBeCalled();
    });
  });
  describe('Component Lifecycle', function () {
    test('should reset when new keywords are given', function () {
      var wrapper = shallow(React.createElement(EditableKeywords, null));
      wrapper.setState({
        keyword: 'Test Case'
      });
      wrapper.setProps({
        keywords: ['Test']
      });
      expect(wrapper.state('keyword')).toEqual('');
    });
  });
});