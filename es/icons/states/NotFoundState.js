import * as React from 'react';
import AccessibleSVG from '../accessible-svg';
import { bdlBoxBlue } from '../../styles/variables';

var NotFoundState = function NotFoundState(_ref) {
  var _ref$className = _ref.className,
      className = _ref$className === void 0 ? '' : _ref$className,
      _ref$color = _ref.color,
      color = _ref$color === void 0 ? bdlBoxBlue : _ref$color,
      _ref$height = _ref.height,
      height = _ref$height === void 0 ? 150 : _ref$height,
      title = _ref.title,
      _ref$width = _ref.width,
      width = _ref$width === void 0 ? 150 : _ref$width;
  return React.createElement(AccessibleSVG, {
    className: "not-found-state ".concat(className),
    height: height,
    title: title,
    viewBox: "0 0 150 150",
    width: width
  }, React.createElement("g", {
    fill: "none",
    fillRule: "evenodd"
  }, React.createElement("path", {
    d: "M77.32 113.34c-.38-.74-.01-1.34.8-1.34h30.7c.82 0 1.8.59 2.18 1.34l12.49 24.3c.38.73.01 1.33-.8 1.33h-30.7c-.82 0-1.79-.59-2.18-1.33l-12.49-24.3zm-73-56c-.38-.74-.01-1.34.8-1.34h30.7c.82 0 1.8.59 2.18 1.34l12.49 24.3c.38.73.01 1.33-.8 1.33h-30.7c-.82 0-1.79-.59-2.18-1.33L4.32 57.34zm79-7c-.38-.74-.01-1.34.8-1.34h30.7c.82 0 1.8.59 2.18 1.34l12.49 24.3c.38.73.01 1.33-.8 1.33h-30.7c-.82 0-1.79-.59-2.18-1.33l-12.49-24.3z",
    fill: color,
    fillOpacity: "0.1"
  }), React.createElement("path", {
    d: "M77.32 103.34c-.38-.74-.01-1.34.8-1.34h30.7c.82 0 1.8.59 2.18 1.34l12.49 24.3c.38.73.01 1.33-.8 1.33h-30.7c-.82 0-1.79-.59-2.18-1.33l-12.49-24.3zm-21.6-45.32c-.38-.74-.02-1.34.8-1.34h30.7c.82 0 1.78.59 2.17 1.34l12.49 24.3c.38.73.02 1.33-.8 1.33h-30.7c-.82 0-1.79-.59-2.17-1.34l-12.5-24.3zm27.73-29.68c-.38-.74-.02-1.34.8-1.34h30.7c.82 0 1.79.59 2.17 1.34l12.5 24.3c.37.73 0 1.33-.81 1.33h-30.7c-.82 0-1.79-.59-2.17-1.33l-12.5-24.3zm-79.13 13c-.38-.74-.01-1.34.8-1.34h30.7c.82 0 1.8.59 2.18 1.34l12.49 24.3c.38.73.01 1.33-.8 1.33h-30.7c-.82 0-1.79-.59-2.18-1.33L4.32 41.34z",
    fill: "#FFF",
    stroke: color,
    strokeLinecap: "round",
    strokeLinejoin: "round",
    strokeWidth: "2"
  }), React.createElement("path", {
    d: "M117.27 71.38c.1-.82.7-1.03 1.31-.47l26.75 24.22c.61.56.44 1.01-.39 1.01h-29.43c-.83 0-1.41-.67-1.3-1.48l3.06-23.28zm-82.28 31.35c-3.21-6.94.38-12.92 8.02-13.35l2.6-.15 1.07.1c7.62.76 16.39 7 19.6 13.94l.46 1c3.21 6.93-.38 12.67-8.02 12.81l-1.95.04-1.68-.1c-7.63-.4-16.43-6.36-19.64-13.3l-.46-1zM54.92 12l19.65 11.04-.84 16.45H56.2L41.76 23.4 54.92 12z",
    fill: "#FFF",
    stroke: color,
    strokeDasharray: "3,5",
    strokeLinecap: "round",
    strokeLinejoin: "round",
    strokeWidth: "2"
  }), React.createElement("path", {
    d: "M100.2 111.45c.67-1.16 1.96-1.63 2.83-1.12.88.5 1.12 1.85.44 3.01l-.87 1.52-.17.29a.8.8 0 1 0 1.39.8l.16-.29.88-1.52c1.09-1.88.67-4.22-1.03-5.2-1.7-.98-3.93-.17-5.02 1.71l-.88 1.53a.8.8 0 0 0 1.39.8l.88-1.53zm.1 7.22l1.09-1.76a.8.8 0 0 1 1.38.8l-1.09 1.76c-1.08 1.88-3.32 2.69-5.01 1.7-1.7-.98-2.12-3.31-1.03-5.2l1.22-2.1a.8.8 0 0 1 1.38.8l-1.22 2.1c-.67 1.17-.43 2.51.45 3.02.87.5 2.15.04 2.83-1.12zm-1.58-2.49l1.82-2.99a.8.8 0 0 1 1.37.84l-1.83 2.99a.8.8 0 0 1-1.36-.84zM18.23 49.53c0-.4.32-.73.72-.73h14.02c.4 0 .73.32.73.73 0 .4-.33.73-.73.73H18.95a.73.73 0 0 1-.72-.73zm2.47 3.64c0-.4.33-.73.73-.73h14.02c.4 0 .72.33.72.73 0 .4-.32.73-.72.73H21.43a.73.73 0 0 1-.73-.73zm2.48 3.65c0-.4.33-.73.73-.73h7.82c.4 0 .73.32.73.73 0 .4-.33.73-.73.73h-7.82a.73.73 0 0 1-.73-.73zm10.52 0c0-.4.33-.73.73-.73h1.63a.73.73 0 1 1 0 1.46h-1.63a.73.73 0 0 1-.73-.73z",
    fill: color,
    fillRule: "nonzero"
  }), React.createElement("path", {
    d: "M85.28 75.24c1.98-2.36.58-6.78-3.12-9.89-3.7-3.1-8.3-3.7-10.28-1.35-1.97 2.35-.58 6.78 3.12 9.88 3.7 3.1 8.3 3.71 10.28 1.36z",
    fill: "#FFF",
    stroke: color,
    strokeWidth: "2"
  }), React.createElement("path", {
    d: "M80.65 68.97l-1.62 2.28-2.6-3.25 4.22.97zm22.07-31.78l7.42 8.02h-9.28l1.86-8.02zM112 40.1l4.64 5.1h-6.19l1.55-5.1zm-1.71-3.4c-.3.17-.74-.04-1-.48-.25-.43-.21-.92.09-1.1.3-.17.74.05.99.48.09.16.14.31.16.46.03.28-.05.53-.24.64z",
    fill: color,
    stroke: color,
    strokeLinecap: "round",
    strokeLinejoin: "round",
    strokeWidth: "2"
  }), React.createElement("path", {
    d: "M118.86 75.53c.1-.82.69-1.03 1.31-.47L139.3 92.4c.62.56.46 1.01-.37 1.01H118c-.83 0-1.4-.67-1.3-1.49l2.16-16.38zm-81.92 27.24c-2.78-6.02.33-11.2 6.96-11.58l2.26-.13.92.1c6.6.65 14.22 6.07 17 12.08l.4.86c2.79 6.02-.33 11-6.97 11.12l-1.68.03-1.45-.08c-6.63-.35-14.26-5.53-17.04-11.54l-.4-.86zM54.9 14.1l17.8 10.5-.7 12.82H56.96L44.55 23.6l10.34-9.5z",
    fill: color,
    fillOpacity: "0.1"
  })));
};

export default NotFoundState;