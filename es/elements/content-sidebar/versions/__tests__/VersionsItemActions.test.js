function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

import * as React from 'react';
import { shallow } from 'enzyme/build';
import IconClockPast from '../../../../icons/general/IconClockPast';
import IconDownload from '../../../../icons/general/IconDownload';
import IconEllipsis from '../../../../icons/general/IconEllipsis';
import IconOpenWith from '../../../../icons/general/IconOpenWith';
import IconTrash from '../../../../icons/general/IconTrash';
import IconUpload from '../../../../icons/general/IconUpload';
import Tooltip from '../../../../components/tooltip/Tooltip';
import VersionsItemActions from '../VersionsItemActions';
describe('elements/content-sidebar/versions/VersionsItemActions', function () {
  var getWrapper = function getWrapper() {
    var props = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    return shallow(React.createElement(VersionsItemActions, _extends({
      isDownloadable: true,
      isPreviewable: true
    }, props)));
  };

  describe('render', function () {
    test.each([true, false])('should return the correct menu items based on options', function (option) {
      var wrapper = getWrapper({
        showDelete: option,
        showDownload: option,
        showPreview: option,
        showPromote: option,
        showRestore: option
      });
      expect(wrapper.find(IconEllipsis).exists()).toBe(option); // Versions show actions if any permission is true

      expect(wrapper.find(IconClockPast).exists()).toBe(option);
      expect(wrapper.find(IconDownload).exists()).toBe(option);
      expect(wrapper.find(IconOpenWith).exists()).toBe(option);
      expect(wrapper.find(IconTrash).exists()).toBe(option);
      expect(wrapper.find(IconUpload).exists()).toBe(option);
      expect(wrapper).toMatchSnapshot();
    });
    test.each([true, false])('should enable/disable actions and tooltips if isRetained is %s', function (option) {
      var wrapper = getWrapper({
        isRetained: option,
        showDelete: true
      });
      expect(wrapper.find(Tooltip).prop('isDisabled')).toBe(!option);
      expect(wrapper).toMatchSnapshot();
    });
  });
});