import * as React from 'react';
import { shallow } from 'enzyme';
import IconPuzzlePieceCircle from '../IconPuzzlePieceCircle';
describe('icons/general/IconPuzzlePieceCircle', function () {
  test('should correctly render default icon with default color', function () {
    var wrapper = shallow(React.createElement(IconPuzzlePieceCircle, null));
    expect(wrapper).toMatchSnapshot();
  });
  test('should correctly render icon with specified color', function () {
    var wrapper = shallow(React.createElement(IconPuzzlePieceCircle, {
      color: "#fcfcfc"
    }));
    expect(wrapper).toMatchSnapshot();
  });
  test('should correctly render icon with specified width and height and default viewBox value', function () {
    var wrapper = shallow(React.createElement(IconPuzzlePieceCircle, {
      height: 16,
      width: 16
    }));
    expect(wrapper).toMatchSnapshot();
  });
  test('should correctly render icon with title', function () {
    var wrapper = shallow(React.createElement(IconPuzzlePieceCircle, {
      title: "abcde"
    }));
    expect(wrapper).toMatchSnapshot();
  });
  test('should correctly render icon with custom class name', function () {
    var wrapper = shallow(React.createElement(IconPuzzlePieceCircle, {
      className: "circular"
    }));
    expect(wrapper).toMatchSnapshot();
  });
});