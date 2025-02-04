import * as React from 'react';
import AccessibleSVG from '../accessible-svg';
import { bdlGray } from '../../styles/variables';

var IconAddTags = function IconAddTags(_ref) {
  var _ref$className = _ref.className,
      className = _ref$className === void 0 ? '' : _ref$className,
      _ref$height = _ref.height,
      height = _ref$height === void 0 ? 32 : _ref$height,
      _ref$color = _ref.color,
      color = _ref$color === void 0 ? bdlGray : _ref$color,
      title = _ref.title,
      _ref$strokeWidth = _ref.strokeWidth,
      strokeWidth = _ref$strokeWidth === void 0 ? 2 : _ref$strokeWidth,
      _ref$width = _ref.width,
      width = _ref$width === void 0 ? 32 : _ref$width;
  return React.createElement(AccessibleSVG, {
    className: "bdl-IconAddTags ".concat(className),
    height: height,
    title: title,
    viewBox: "0 0 32 32",
    width: width
  }, React.createElement("path", {
    className: "stroke-color",
    d: "M17.2061467,1.00185126 L27.1498219,1.46386359 C28.9452716,1.54913484 30.4471858,3.05104904 30.532457,4.84649871 L30.9981001,14.7938047 C31.0193171,15.2397423 30.8622236,15.6655102 30.557238,15.9704958 L16.4160731,30.1116607 C15.1678914,31.3598425 13.0689103,31.2828028 11.7315894,29.945482 L2.04962843,20.263521 C0.712307562,18.9262001 0.644949887,16.836901 1.89313163,15.5887192 L16.0342965,1.44755431 C16.3392821,1.14256872 16.760209,0.980634284 17.2061467,1.00185126 Z",
    fill: "none",
    stroke: color,
    strokeWidth: strokeWidth
  }), React.createElement("circle", {
    className: "fill-color",
    fill: color,
    cx: "23.5",
    cy: "8.5",
    r: "2.5"
  }));
};

export default IconAddTags;
//# sourceMappingURL=IconAddTags.js.map