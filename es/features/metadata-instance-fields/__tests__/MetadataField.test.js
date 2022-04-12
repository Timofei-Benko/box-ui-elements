import React from 'react';
import MetadataField from '../MetadataField';
describe('features/metadata-instance-editor/fields/MetadataField', function () {
  var onChange = jest.fn();
  var onRemove = jest.fn();
  test('should correctly render a read only field when not editable', function () {
    var wrapper = shallow(React.createElement(MetadataField, {
      dataValue: "value"
    }));
    expect(wrapper).toMatchSnapshot();
  });
  test('should correctly not render a text field', function () {
    var wrapper = shallow(React.createElement(MetadataField, {
      canEdit: true,
      dataValue: "value",
      isHidden: true,
      onChange: onChange,
      onRemove: onRemove,
      type: "string"
    }));
    expect(wrapper).toMatchSnapshot();
  });
  test('should correctly render a text field', function () {
    var wrapper = shallow(React.createElement(MetadataField, {
      canEdit: true,
      dataValue: "value",
      onChange: onChange,
      onRemove: onRemove,
      type: "string"
    }));
    expect(wrapper).toMatchSnapshot();
  });
  test('should correctly render an enum field', function () {
    var wrapper = shallow(React.createElement(MetadataField, {
      canEdit: true,
      dataValue: "value",
      onChange: onChange,
      onRemove: onRemove,
      type: "enum"
    }));
    expect(wrapper).toMatchSnapshot();
  });
  test('should correctly render a date field', function () {
    var wrapper = shallow(React.createElement(MetadataField, {
      canEdit: true,
      dataValue: "value",
      onChange: onChange,
      onRemove: onRemove,
      type: "date"
    }));
    expect(wrapper).toMatchSnapshot();
  });
  test('should correctly render a float field', function () {
    var wrapper = shallow(React.createElement(MetadataField, {
      canEdit: true,
      dataValue: "value",
      onChange: onChange,
      onRemove: onRemove,
      type: "float"
    }));
    expect(wrapper).toMatchSnapshot();
  });
  test('should correctly render a multi-select field', function () {
    var wrapper = shallow(React.createElement(MetadataField, {
      canEdit: true,
      dataValue: ['value'],
      onChange: onChange,
      onRemove: onRemove,
      type: "multiSelect"
    }));
    expect(wrapper).toMatchSnapshot();
  });
  test('should correctly render an integer field', function () {
    var wrapper = shallow(React.createElement(MetadataField, {
      canEdit: true,
      dataValue: "value",
      onChange: onChange,
      onRemove: onRemove,
      type: "integer"
    }));
    expect(wrapper).toMatchSnapshot();
  });
  test('should correctly render an inline error for an invalid field type', function () {
    var wrapper = shallow(React.createElement(MetadataField, {
      canEdit: true,
      dataValue: "value",
      onChange: onChange,
      onRemove: onRemove,
      type: "badbadbad"
    }));
    expect(wrapper).toMatchSnapshot();
  });
});