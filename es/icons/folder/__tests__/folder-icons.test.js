import React from 'react';
import { shallow } from 'enzyme';
import IconFolderCollab from '../IconFolderCollab';
import IconFolderExternal from '../IconFolderExternal';
import IconFolderPersonal from '../IconFolderPersonal';
import IconSmallFolder from '../IconSmallFolder';
describe('icons/folder/*', function () {
  [{
    IconComponent: IconFolderPersonal
  }, {
    IconComponent: IconFolderExternal
  }, {
    IconComponent: IconFolderCollab
  }, {
    IconComponent: IconSmallFolder
  }].forEach(function (_ref) {
    var IconComponent = _ref.IconComponent;
    test('should correctly render icon', function () {
      var component = shallow(React.createElement(IconComponent, null));
      expect(component.find('AccessibleSVG').length).toEqual(1);
    });
    test('should correctly render icon with props', function () {
      var component = shallow(React.createElement(IconComponent, {
        className: "test",
        height: 42,
        title: "awesome title",
        width: 42
      }));
      expect(component.find('AccessibleSVG').length).toEqual(1);
      expect(component.find('.test').length).toEqual(1);
      expect(component.find('AccessibleSVG').prop('height')).toEqual(42);
      expect(component.find('AccessibleSVG').prop('width')).toEqual(42);
      expect(component.find('AccessibleSVG').prop('title')).toEqual('awesome title');
    });
    describe('title prop can accept a string type or an element type', function () {
      test('should render icon with title prop being a string type', function () {
        var component = shallow(React.createElement(IconComponent, {
          title: "hello"
        }));
        expect(component.find('AccessibleSVG').prop('title')).toEqual('hello');
      });
      test('should render icon with title prop being element type', function () {
        var TestElement = React.createElement("div", null, "Funny Title");
        var component = shallow(React.createElement(IconComponent, {
          title: TestElement
        }));
        expect(component.find('AccessibleSVG').prop('title')).toEqual(TestElement);
      });
    });
  });
});