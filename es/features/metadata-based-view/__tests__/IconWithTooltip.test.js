import * as React from 'react';
import IconWithTooltip from '../IconWithTooltip';
import messages from '../../../elements/common/messages';
import { CANCEL_ICON_TYPE, EDIT_ICON_TYPE, SAVE_ICON_TYPE } from '../constants';
describe('features/metadata-based-view/IconWithTooltip', function () {
  var getWrapper = function getWrapper(props) {
    return shallow(React.createElement(IconWithTooltip, props));
  };

  var onClick = function onClick() {};

  test('should get IconClose with Tooltip having text "cancel"', function () {
    var props = {
      className: 'bdl-MetadataBasedItemList-cell--cancelIcon',
      onClick: onClick,
      tooltipText: messages.cancel,
      type: CANCEL_ICON_TYPE
    };
    var wrapper = getWrapper(props);
    expect(wrapper).toMatchSnapshot();
  });
  test('should get IconSave with Tooltip having text "save"', function () {
    var props = {
      className: 'bdl-MetadataBasedItemList-cell--saveIcon',
      onClick: onClick,
      tooltipText: messages.save,
      type: SAVE_ICON_TYPE
    };
    var wrapper = getWrapper(props);
    expect(wrapper).toMatchSnapshot();
  });
  test('should get IconPencil with Tooltip having text "edit"', function () {
    var props = {
      onClick: onClick,
      tooltipText: messages.editLabel,
      type: EDIT_ICON_TYPE
    };
    var wrapper = getWrapper(props);
    expect(wrapper).toMatchSnapshot();
  });
});