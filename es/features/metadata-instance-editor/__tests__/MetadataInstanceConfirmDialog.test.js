import React from 'react';
import MetadataInstanceConfirmDialog from '../MetadataInstanceConfirmDialog';
describe('features/metadata-instance-editor/MetadataInstanceConfirmDialog', function () {
  test('should correctly render', function () {
    var wrapper = shallow(React.createElement(MetadataInstanceConfirmDialog, {
      onCancel: function onCancel() {},
      onConfirm: function onConfirm() {}
    }));
    expect(wrapper).toMatchSnapshot();
  });
});