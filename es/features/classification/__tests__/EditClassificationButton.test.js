import React from 'react';
import EditClassificationButton from '../EditClassificationButton';
describe('features/classification/EditClassificationButton', function () {
  var getWrapper = function getWrapper() {
    var props = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    return shallow(React.createElement(EditClassificationButton, props));
  };

  test.each([[true], [false]])('should render correctly when isEditing is %s', function (isEditing) {
    var wrapper = getWrapper({
      className: 'foo',
      foo: 'bar',
      isEditing: isEditing,
      onEdit: function onEdit() {}
    });
    expect(wrapper).toMatchSnapshot();
  });
  test('should call onEdit when edit button is clicked', function () {
    var onEdit = jest.fn();
    var wrapper = getWrapper({
      onEdit: onEdit
    });
    wrapper.simulate('click');
    expect(onEdit).toHaveBeenCalled();
  });
});