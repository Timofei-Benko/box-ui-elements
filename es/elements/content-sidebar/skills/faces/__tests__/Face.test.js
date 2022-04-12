import * as React from 'react';
import { shallow } from 'enzyme';
import Face from '../Face';
describe('elements/content-sidebar/Skills/Face/Face', function () {
  test('should correctly render a face', function () {
    var props = {
      face: {
        text: 'foo',
        image_url: 'bar'
      },
      isEditing: false,
      onDelete: jest.fn(),
      onSelect: jest.fn()
    };
    var wrapper = shallow(React.createElement(Face, props));
    expect(wrapper).toMatchSnapshot();
  });
  test('should correctly render a face when editing', function () {
    var props = {
      face: {
        text: 'foo',
        image_url: 'bar'
      },
      isEditing: true,
      onDelete: jest.fn(),
      onSelect: jest.fn()
    };
    var wrapper = shallow(React.createElement(Face, props));
    expect(wrapper).toMatchSnapshot();
  });
  test('should correctly render a face when selected face is being rendered', function () {
    var face = {
      text: 'foo',
      image_url: 'bar'
    };
    var props = {
      face: face,
      selected: face,
      isEditing: false,
      onDelete: jest.fn(),
      onSelect: jest.fn()
    };
    var wrapper = shallow(React.createElement(Face, props));
    expect(wrapper).toMatchSnapshot();
  });
  test('should correctly render a face when un-selected face is being rendered', function () {
    var face = {
      text: 'foo',
      image_url: 'bar'
    };
    var props = {
      face: face,
      selected: {
        text: 'baz',
        image_url: 'buz'
      },
      isEditing: false,
      onDelete: jest.fn(),
      onSelect: jest.fn()
    };
    var wrapper = shallow(React.createElement(Face, props));
    expect(wrapper).toMatchSnapshot();
  });
});