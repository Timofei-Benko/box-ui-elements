import * as React from 'react';
import AccessibleSVG from '../accessible-svg';
import { bdlBoxBlue } from '../../styles/variables';

var IconTag = function IconTag(_ref) {
  var _ref$className = _ref.className,
      className = _ref$className === void 0 ? '' : _ref$className,
      _ref$color = _ref.color,
      color = _ref$color === void 0 ? bdlBoxBlue : _ref$color,
      _ref$height = _ref.height,
      height = _ref$height === void 0 ? 13 : _ref$height,
      title = _ref.title,
      _ref$width = _ref.width,
      width = _ref$width === void 0 ? 13 : _ref$width;
  return React.createElement(AccessibleSVG, {
    className: "icon-tag ".concat(className),
    height: height,
    title: title,
    viewBox: "0 0 13 13",
    width: width
  }, React.createElement("g", {
    className: "fill-color",
    fill: color,
    fillRule: "evenodd"
  }, React.createElement("path", {
    d: "M5.83 9.9c-.005.003-2.837-2.835-2.837-2.835.008.007 3.84-3.826 3.84-3.826.148-.15.54-.26.745-.213l1.484.35c.17.04.42.29.46.46l.35 1.485c.048.202-.065.6-.21.745L5.828 9.9zm4.538-3.126c.39-.39.605-1.142.478-1.682l-.35-1.484C10.37 3.07 9.83 2.53 9.29 2.404l-1.483-.35c-.538-.127-1.287.083-1.682.478l-3.832 3.83c-.39.392-.388 1.028-.007 1.41l2.842 2.84c.387.388 1.013.39 1.408-.006l3.832-3.832z"
  }), React.createElement("path", {
    d: "M8.657 5.657c.39-.39.39-1.024 0-1.414-.39-.39-1.024-.39-1.414 0-.39.39-.39 1.023 0 1.414.39.39 1.023.39 1.414 0z"
  })));
};

export default IconTag;
//# sourceMappingURL=IconTag.js.map