import React from 'react';
import Header from '../Header';
describe('features/metadata-instance-editor/fields/Header', function () {
  test('should correctly render when not editable', function () {
    var wrapper = shallow(React.createElement(Header, null));
    expect(wrapper).toMatchSnapshot();
  });
  test('should correctly render when editable', function () {
    var wrapper = shallow(React.createElement(Header, {
      canEdit: true,
      onAdd: jest.fn(),
      templates: ['foo']
    }));
    expect(wrapper).toMatchSnapshot();
  });
  test('should correctly render with custom title', function () {
    var wrapper = shallow(React.createElement(Header, {
      canEdit: true,
      onAdd: jest.fn(),
      templates: ['foo'],
      title: "title"
    }));
    expect(wrapper).toMatchSnapshot();
  });
  test('should correctly render filtered templates that are not hidden', function () {
    var wrapper = shallow(React.createElement(Header, {
      canAdd: true,
      canEdit: true,
      editors: [],
      onAdd: jest.fn(),
      templates: [{
        displayName: 'visible-template',
        isHidden: false
      }, {
        displayName: 'hidden-template',
        isHidden: true
      }, {
        displayName: 'another-hidden-template',
        hidden: true
      }],
      title: "title",
      usedTemplates: []
    }));
    expect(wrapper).toMatchSnapshot();
  });
});