function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

/* eslint-disable react/jsx-sort-props */
import * as React from 'react';
import * as vars from '../../styles/variables';
import AccessibleSVG from '../../components/accessible-svg/AccessibleSVG';
/**
 * This is an auto-generated component and should not be edited
 * manually in contributor pull requests.
 *
 * If you have problems with this component:
 * - https://github.com/box/box-ui-elements/issues/new?template=Bug_report.md
 *
 * If there are missing features in this component:
 * - https://github.com/box/box-ui-elements/issues/new?template=Feature_request.md
 */

var LightningBolt16 = function LightningBolt16(props) {
  return React.createElement(AccessibleSVG, _extends({
    width: 16,
    height: 16,
    viewBox: "0 0 16 16"
  }, props), React.createElement("path", {
    fill: vars.bdlGray50,
    d: "M11.503 1a.496.496 0 01.447.712L9.302 6.998h2.193a.5.5 0 01.423.766L6.91 14.792a.5.5 0 01-.902-.365L6.836 9H4.493a.496.496 0 01-.483-.602l1.516-7A.495.495 0 016.008 1h5.495z"
  }));
};

export default LightningBolt16;