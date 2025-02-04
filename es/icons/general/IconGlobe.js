import * as React from 'react';
import AccessibleSVG from '../accessible-svg';
import { bdlGray50, white } from '../../styles/variables';

var IconGlobe = function IconGlobe(_ref) {
  var _ref$className = _ref.className,
      className = _ref$className === void 0 ? '' : _ref$className,
      _ref$color = _ref.color,
      color = _ref$color === void 0 ? bdlGray50 : _ref$color,
      _ref$height = _ref.height,
      height = _ref$height === void 0 ? 20 : _ref$height,
      title = _ref.title,
      _ref$width = _ref.width,
      width = _ref$width === void 0 ? 20 : _ref$width;
  return React.createElement(AccessibleSVG, {
    className: "icon-globe ".concat(className),
    height: height,
    title: title,
    viewBox: "0 0 20 20",
    width: width
  }, React.createElement("g", null, React.createElement("path", {
    d: "M10 0A9.98 9.98 0 0 0 0 10a9.98 9.98 0 0 0 10 10 9.98 9.98 0 0 0 10-10A9.98 9.98 0 0 0 10 0z",
    fill: white
  }), React.createElement("path", {
    className: "fill-color",
    d: "M10 0A9.98 9.98 0 0 0 0 10a9.98 9.98 0 0 0 10 10 9.98 9.98 0 0 0 10-10A9.98 9.98 0 0 0 10 0zM8.923 18C5.077 17.385 2 14.154 2 10c0-.615.154-1.23.154-1.846l4.77 4.77V14c0 1.077.922 2 2 2v2zm6.923-2.615C15.538 14.615 14.77 14 14 14h-1.077v-3.077c0-.461-.308-.923-.923-.923H6V8h2c.615 0 1.077-.462 1.077-1.077V5.077h2c1.077 0 2-.923 2-2v-.462C16 3.846 18 6.615 18 10c0 2.154-.77 4-2.154 5.385z",
    fill: color
  })));
};

export default IconGlobe;
//# sourceMappingURL=IconGlobe.js.map