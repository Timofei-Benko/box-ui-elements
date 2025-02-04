import * as React from 'react';
import AccessibleSVG from '../accessible-svg';

var IconPencil = function IconPencil(_ref) {
  var _ref$className = _ref.className,
      className = _ref$className === void 0 ? '' : _ref$className,
      _ref$color = _ref.color,
      color = _ref$color === void 0 ? '#777777' : _ref$color,
      _ref$height = _ref.height,
      height = _ref$height === void 0 ? 13 : _ref$height,
      title = _ref.title,
      _ref$width = _ref.width,
      width = _ref$width === void 0 ? 13 : _ref$width;
  return React.createElement(AccessibleSVG, {
    className: "icon-pencil ".concat(className),
    height: height,
    title: title,
    viewBox: "0 0 13 13",
    width: width
  }, React.createElement("path", {
    className: "fill-color",
    d: "M12,1c-0.8-0.8-2.1-0.8-2.9,0L2,8.1c0,0,0,0-0.1,0.1l0,0c0,0,0,0,0,0.1l0,0L0.6,12c-0.1,0.2,0,0.4,0.2,0.5 c0.1,0,0.2,0,0.2,0l3.7-1.3l0,0c0,0,0,0,0.1,0l0,0c0,0,0,0,0.1-0.1l6.5-6.5l0,0L12,3.9C12.8,3.1,12.8,1.8,12,1z M4.6,10.2L2.8,8.4 l6-6l1.8,1.8L4.6,10.2z M2.4,9.1l1.5,1.5l-2.4,0.8L2.4,9.1z M11.5,3.4l-0.4,0.4L9.3,1.9l0.4-0.4c0.5-0.5,1.3-0.5,1.8,0 C12,2.1,12,2.9,11.5,3.4z",
    fill: color
  }));
};

export default IconPencil;
//# sourceMappingURL=IconPencil.js.map