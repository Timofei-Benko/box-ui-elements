import * as React from 'react';
import AccessibleSVG from '../accessible-svg';
import { bdlGray40 } from '../../styles/variables';

var IconSearchJuicy = function IconSearchJuicy(_ref) {
  var _ref$className = _ref.className,
      className = _ref$className === void 0 ? '' : _ref$className,
      _ref$color = _ref.color,
      color = _ref$color === void 0 ? bdlGray40 : _ref$color,
      _ref$height = _ref.height,
      height = _ref$height === void 0 ? 14 : _ref$height,
      title = _ref.title,
      _ref$width = _ref.width,
      width = _ref$width === void 0 ? 14 : _ref$width;
  return React.createElement(AccessibleSVG, {
    className: "icon-search-juicy ".concat(className),
    height: height,
    title: title,
    viewBox: "0 0 24 24",
    width: width
  }, React.createElement("path", {
    className: "fill-color",
    d: "M10.491 1.5a8.99 8.99 0 0 1 7.359 14.157l4.21 4.21a1.5 1.5 0 0 1 0 2.123l-.07.07a1.5 1.5 0 0 1-2.122 0l-4.211-4.21A8.99 8.99 0 1 1 10.491 1.5zm0 2.997a5.994 5.994 0 1 0 0 11.988 5.994 5.994 0 0 0 0-11.988z",
    fill: color,
    fillRule: "evenodd"
  }));
};

export default IconSearchJuicy;
//# sourceMappingURL=IconSearchJuicy.js.map