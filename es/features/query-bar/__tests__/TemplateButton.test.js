function _templateObject2() {
  var data = _taggedTemplateLiteral(["\n            templates | expectedMessage             | description\n            ", "   | ", "          | ", "\n            ", "     | ", " | ", "\n        "]);

  _templateObject2 = function _templateObject2() {
    return data;
  };

  return data;
}

function _templateObject() {
  var data = _taggedTemplateLiteral(["\n            activeTemplate | expectedReturn | description\n            ", "       | ", "        | ", "\n            ", "        | ", "       | ", "\n        "]);

  _templateObject = function _templateObject() {
    return data;
  };

  return data;
}

function _taggedTemplateLiteral(strings, raw) { if (!raw) { raw = strings.slice(0); } return Object.freeze(Object.defineProperties(strings, { raw: { value: Object.freeze(raw) } })); }

import * as React from 'react';
import TemplateButton from '../components/TemplateButton';
import { template } from '../components/fixtures';
describe('feature/query-bar/components/TemplateButton', function () {
  var getWrapper = function getWrapper() {
    var props = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    return shallow(React.createElement(TemplateButton, props));
  };

  describe('render()', function () {
    test('should render TemplateButton', function () {
      var wrapper = getWrapper();
      expect(wrapper).toMatchSnapshot();
    });
  });
  describe('updateActiveTemplate', function () {
    test('should call onTemplateChange', function () {
      var onTemplateChangeMock = jest.fn();
      var wrapper = getWrapper({
        onTemplateChange: onTemplateChangeMock
      });
      wrapper.instance().updateActiveTemplate(template);
      expect(onTemplateChangeMock.mock.calls.length).toBe(1);
    });
  });
  describe('toggleTemplateDropdownButton()', function () {
    [{
      description: 'Should open the dropdown',
      initialState: {
        isTemplateMenuOpen: false
      },
      updatedState: {
        isTemplateMenuOpen: true
      }
    }, {
      description: 'Should close the dropdown',
      initialState: {
        isTemplateMenuOpen: true
      },
      updatedState: {
        isTemplateMenuOpen: false
      }
    }].forEach(function (_ref) {
      var description = _ref.description,
          initialState = _ref.initialState,
          updatedState = _ref.updatedState;
      test("".concat(description), function () {
        var wrapper = getWrapper();
        wrapper.instance().setState({
          isTemplateMenuOpen: initialState.isTemplateMenuOpen
        });
        wrapper.instance().toggleTemplateDropdownButton();
        expect(wrapper.state('isTemplateMenuOpen')).toEqual(updatedState.isTemplateMenuOpen);
      });
    });
  });
  describe('renderEntryButton()', function () {
    var templ = {
      id: '123',
      displayName: 'template name 1'
    };
    var activeTemplateClassName = 'is-active';
    test.each(_templateObject(), templ, true, 'Should render div with class containing is-active', null, false, 'Should render div with class that does not contain is-active')('$description', function (_ref2) {
      var activeTemplate = _ref2.activeTemplate,
          expectedReturn = _ref2.expectedReturn;
      var wrapper = getWrapper({
        activeTemplate: activeTemplate
      });
      wrapper.instance().setState({
        isTemplateMenuOpen: true
      });
      var entryButtonWrapper = shallow(wrapper.instance().renderEntryButton());
      expect(entryButtonWrapper.props().className.includes(activeTemplateClassName)).toEqual(expectedReturn);
    });
    test.each(_templateObject2(), null, 'Template Name', 'Should render templates loading message', [], 'No Templates Available', 'Should render no templates message')('$description', function (_ref3) {
      var templates = _ref3.templates,
          expectedMessage = _ref3.expectedMessage;
      var wrapper = getWrapper({
        templates: templates
      });
      var entryButtonWrapper = shallow(wrapper.instance().renderEntryButton());
      expect(entryButtonWrapper.find('FormattedMessage').props().defaultMessage).toEqual(expectedMessage);
    });
  });
});