import * as React from 'react';
import { shallow } from 'enzyme';
import IconPuzzlePiece from '../IconPuzzlePiece';
describe('icons/general/IconPuzzlePiece', function () {
  test('should correctly render default icon with default color', function () {
    var wrapper = shallow(React.createElement(IconPuzzlePiece, null));
    expect(wrapper).toMatchSnapshot();
  });
  test('should correctly render icon with specified color', function () {
    var wrapper = shallow(React.createElement(IconPuzzlePiece, {
      color: "#fcfcfc"
    }));
    expect(wrapper).toMatchSnapshot();
  });
  test('should correctly render icon with specified width and height and default viewBox value', function () {
    var wrapper = shallow(React.createElement(IconPuzzlePiece, {
      height: 16,
      width: 16
    }));
    expect(wrapper).toMatchSnapshot();
  });
  test('should correctly render icon with title', function () {
    var wrapper = shallow(React.createElement(IconPuzzlePiece, {
      title: "abcde"
    }));
    expect(wrapper).toMatchSnapshot();
  });
  test('should correctly render icon with custom class name', function () {
    var wrapper = shallow(React.createElement(IconPuzzlePiece, {
      className: "rectangular"
    }));
    expect(wrapper).toMatchSnapshot();
  });
});