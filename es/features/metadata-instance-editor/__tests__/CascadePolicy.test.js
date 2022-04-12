import React from 'react';
import CascadePolicy from '../CascadePolicy';
describe('features/metadata-instance-editor/CascadePolicy', function () {
  test('should correctly render cascade policy read only mode', function () {
    var wrapper = shallow(React.createElement(CascadePolicy, {
      id: "fakeId",
      isCascadingEnabled: true,
      shouldShowCascadeOptions: true
    }));
    expect(wrapper).toMatchSnapshot();
  });
  test('should correctly render cascade policy in edit mode', function () {
    var wrapper = shallow(React.createElement(CascadePolicy, {
      id: "fakeId",
      isCascadingEnabled: true,
      isEditable: true,
      onCascadeModeChange: jest.fn(),
      onCascadeToggle: jest.fn(),
      shouldShowCascadeOptions: true
    }));
    expect(wrapper).toMatchSnapshot();
  });
  test('should correctly render cascade policy in edit mode and overwrite is on', function () {
    var wrapper = shallow(React.createElement(CascadePolicy, {
      id: "fakeId",
      isCascadingEnabled: true,
      isEditable: true,
      onCascadeModeChange: jest.fn(),
      onCascadeToggle: jest.fn(),
      shouldCascadeOverwrite: true,
      shouldShowCascadeOptions: true
    }));
    expect(wrapper).toMatchSnapshot();
  });
  test('should correctly render cascade policy when the template is Custom Metadata', function () {
    var wrapper = shallow(React.createElement(CascadePolicy, {
      canEdit: true,
      id: "fakeId",
      isCustomMetadata: true,
      isEditable: true,
      onCascadeModeChange: jest.fn(),
      onCascadeToggle: jest.fn(),
      shouldShowCascadeOptions: true
    }));
    expect(wrapper).toMatchSnapshot();
  });
});