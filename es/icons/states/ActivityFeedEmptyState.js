import * as React from 'react';
import AccessibleSVG from '../accessible-svg';
import { bdlBoxBlue } from '../../styles/variables';

var ActivityFeedEmptyState = function ActivityFeedEmptyState(_ref) {
  var _ref$className = _ref.className,
      className = _ref$className === void 0 ? '' : _ref$className,
      _ref$color = _ref.color,
      color = _ref$color === void 0 ? bdlBoxBlue : _ref$color,
      _ref$height = _ref.height,
      height = _ref$height === void 0 ? 90 : _ref$height,
      title = _ref.title,
      _ref$width = _ref.width,
      width = _ref$width === void 0 ? 90 : _ref$width;
  return React.createElement(AccessibleSVG, {
    className: "box-ui-activity-feed-empty-state-illustration ".concat(className),
    height: height,
    title: title,
    viewBox: "0 0 90 90",
    width: width
  }, React.createElement("path", {
    className: "fill-color",
    d: "M12.06 40.71v-.4a.31.31 0 0 0-.31-.31.31.31 0 0 0-.31.31v.4a.51.51 0 0 0-.23.23h-.4a.31.31 0 0 0-.31.31.31.31 0 0 0 .31.31h.4a.51.51 0 0 0 .23.23v.4a.31.31 0 0 0 .62 0v-.41a.57.57 0 0 0 .23-.23h.4a.31.31 0 0 0 .31-.31.31.31 0 0 0-.31-.31h-.4a.51.51 0 0 0-.23-.22zm74 25v-.4a.31.31 0 0 0-.31-.31.31.31 0 0 0-.31.31v.4a.51.51 0 0 0-.23.23h-.4a.31.31 0 0 0-.31.31.31.31 0 0 0 .31.31h.4a.61.61 0 0 0 .22.23v.4a.32.32 0 0 0 .32.31.31.31 0 0 0 .31-.3v-.41a.57.57 0 0 0 .23-.23h.4a.31.31 0 0 0 0-.62h-.4a.51.51 0 0 0-.23-.23zm-4-7v-.4a.31.31 0 0 0-.31-.31.31.31 0 0 0-.31.31v.4a.51.51 0 0 0-.23.23h-.4a.31.31 0 0 0-.31.31.31.31 0 0 0 .31.31h.4a.51.51 0 0 0 .23.23v.4a.31.31 0 0 0 .62 0v-.41a.63.63 0 0 0 .23-.23h.4a.31.31 0 0 0 0-.62h-.4a.51.51 0 0 0-.23-.23zM5.5 48.13v-.64A.5.5 0 0 0 5 47a.49.49 0 0 0-.5.49v.64a1.09 1.09 0 0 0-.37.37h-.64A.5.5 0 0 0 3 49a.49.49 0 0 0 .49.5h.64a1.09 1.09 0 0 0 .37.37v.64a.5.5 0 0 0 1 0v-.63a1.09 1.09 0 0 0 .37-.37h.64A.5.5 0 0 0 7 49a.49.49 0 0 0-.49-.5h-.64a1.09 1.09 0 0 0-.37-.37zm67 32v-.64A.5.5 0 0 0 72 79a.49.49 0 0 0-.5.49v.64a1.09 1.09 0 0 0-.37.37h-.64a.5.5 0 0 0-.49.5.49.49 0 0 0 .49.5h.64a1.09 1.09 0 0 0 .37.37v.64a.5.5 0 0 0 1 0v-.63a1 1 0 0 0 .37-.36h.64A.5.5 0 0 0 74 81a.49.49 0 0 0-.49-.5h-.64a1.09 1.09 0 0 0-.37-.37zm-63-56v-.64A.5.5 0 0 0 9 23a.49.49 0 0 0-.5.49v.64a1.09 1.09 0 0 0-.37.37h-.64A.5.5 0 0 0 7 25a.49.49 0 0 0 .49.5h.64a1.09 1.09 0 0 0 .37.37v.64a.5.5 0 0 0 1 0v-.63a1 1 0 0 0 .37-.36h.64A.5.5 0 0 0 11 25a.49.49 0 0 0-.49-.5h-.64a1.09 1.09 0 0 0-.37-.37zm16-20v-.64A.5.5 0 0 0 25 3a.49.49 0 0 0-.5.49v.64a1.09 1.09 0 0 0-.37.37h-.64A.5.5 0 0 0 23 5a.49.49 0 0 0 .49.5h.64a1.09 1.09 0 0 0 .37.37v.64a.5.5 0 0 0 1 0v-.65a1 1 0 0 0 .37-.36h.64A.5.5 0 0 0 27 5a.49.49 0 0 0-.49-.5h-.64a1.09 1.09 0 0 0-.37-.37zM44.46 27.21a3.12 3.12 0 1 1 3.1-3.11 3.11 3.11 0 0 1-3.1 3.11zm0-4.23a1.12 1.12 0 1 0 1.1 1.12 1.12 1.12 0 0 0-1.1-1.1zM54.28 27.2a3.11 3.11 0 1 1 3.1-3.11 3.11 3.11 0 0 1-3.1 3.11zm0-4.22a1.11 1.11 0 1 0 1.1 1.11 1.11 1.11 0 0 0-1.1-1.09zM64.09 27.2a3.11 3.11 0 1 1 3.11-3.11 3.1 3.1 0 0 1-3.11 3.11zm0-4.22a1.11 1.11 0 1 0 1.11 1.11A1.11 1.11 0 0 0 64.09 23z",
    fill: color
  }), React.createElement("path", {
    className: "fill-color",
    d: "M60.75 39.24c8 0 14.57-6.92 14.57-15.46S68.8 8.33 60.75 8.33c-1.35 0 9.78 5.07 9.27 15.45-.69 14.11-14.18 15.46-9.27 15.46zM21.73 59v-.7s2.5 2.46 5.34 1.68c1.57-.42 4.23 2.16 6.83 1.91 2.13-.21 4.72-2.7 4.72-2.7v2.05a4 4 0 0 1-4 4h-8.89a4 4 0 0 1-4-4V59z",
    fill: color,
    opacity: ".1"
  }), React.createElement("path", {
    className: "fill-color",
    d: "M54.45 3.4c-13.89 0-24 8.69-24 20.66a21.19 21.19 0 0 0 .17 2.41h-4a8.15 8.15 0 0 0-8.13 8v14a1 1 0 0 0-.45.81v1.22h-1.53v-2.14a1 1 0 0 0-1-1 4.1 4.1 0 0 0-1 8.08v5.81a11.67 11.67 0 0 0 11.66 11.66h1.23v7.34h-4.34a1 1 0 0 0-1 1v4.44a1 1 0 0 0 1 1h14.22a1 1 0 0 0 1-1v-4.44a1 1 0 0 0-1-1H33v-7.34h1.23a11.67 11.67 0 0 0 11.61-11.66v-5.81a4.1 4.1 0 0 0-1-8.08 1 1 0 0 0-1 1v2.11h-1.56v-1.22a1 1 0 0 0-.44-.81v-6.72A24.69 24.69 0 0 0 55 43.44a4.56 4.56 0 0 1-.53 1.25 6.88 6.88 0 0 0-1 3.1 1.21 1.21 0 0 0 1 1.24h.17c2 0 7.65-4.38 9.14-6.55a18.42 18.42 0 0 0 14.64-18.42c0-11.97-10.08-20.66-23.97-20.66zM36.28 84.69H24.06v-2.44h12.22zm-6.88-4.44v-7.33H31v7.33zm-2.75-51.78h7a6.16 6.16 0 0 1 6 5h-6a1 1 0 1 0 0 2h6.11v3h-6.03a1 1 0 1 0 0 2h6.11v3h-6.11a1 1 0 1 0 0 2h6.11v2.78H20.51v-2.78h6.11a1 1 0 1 0 0-2h-6.11v-3h6.11a1 1 0 1 0 0-2h-6.11v-3h6.11a1 1 0 1 0 0-2h-6a6.16 6.16 0 0 1 6.03-5zm13.63 21.78v2.44H20.06v-2.44zm-19.77 4.44h19.33v5.64a6.15 6.15 0 0 1-6.15 6.14h-7a6.14 6.14 0 0 1-6.14-6.14zm-7.11-3.22a2.12 2.12 0 0 1 1.11-1.86v3.72a2.12 2.12 0 0 1-1.11-1.86zm33.55 0a2.12 2.12 0 0 1-1.11 1.86v-3.72A2.12 2.12 0 0 1 47 51.47zm-3.11 1v8.78a9.67 9.67 0 0 1-9.66 9.66h-8a9.67 9.67 0 0 1-9.66-9.66v-8.78h1.55v1.22a1 1 0 0 0 .45.81v5.83a8.15 8.15 0 0 0 8.14 8.14h7a8.16 8.16 0 0 0 8.15-8.14V54.5a1 1 0 0 0 .44-.81v-1.22zM63 40.6a1.05 1.05 0 0 0-.79.68c-.33.94-4.37 4.16-6.48 5.34.14-.34.31-.68.48-1 .57-1.09 1.34-2.59.11-3.95a1 1 0 0 0-.74-.32h-.15a22.65 22.65 0 0 1-13.59-1.85v-4.88-.12a8.15 8.15 0 0 0-8.14-8h-1a17.29 17.29 0 0 1-.19-2.41c0-11 9-18.66 22-18.66s22 7.67 22 18.66A16.24 16.24 0 0 1 63 40.6z",
    fill: color
  }));
};

export default ActivityFeedEmptyState;