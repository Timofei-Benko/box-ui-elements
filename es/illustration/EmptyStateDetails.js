function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

/* eslint-disable react/jsx-sort-props */
import * as React from 'react';
import * as vars from '../styles/variables';
import AccessibleSVG from '../components/accessible-svg/AccessibleSVG';
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

var EmptyStateDetails = function EmptyStateDetails(props) {
  return React.createElement(AccessibleSVG, _extends({
    width: 140,
    height: 140,
    viewBox: "0 0 140 140"
  }, props), React.createElement("g", {
    fill: "none",
    fillRule: "evenodd"
  }, React.createElement("path", {
    fill: vars.bdlBoxBlue10,
    d: "M52 99a7 7 0 110 14 7 7 0 010-14zm47-66c5.523 0 10 4.477 10 10s-4.477 10-10 10-10-4.477-10-10 4.477-10 10-10z"
  }), React.createElement("path", {
    fill: vars.bdlBoxBlue10,
    d: "M47.11 36H35.383c-1.261 0-2.294.97-2.378 2.198L33 38.36v48.604c0 2.162 1.716 3.926 3.872 4.031l.546.005h.257l.19-.036c1.743-.375 3.062-1.86 3.152-3.663l.005-.197V73.972a.98.98 0 01.017-.18.87.87 0 01-.032-.155L41 73.52V56.717c0-4.209 3.7-7.59 8.268-7.713l.26-.004L97 48.999v-2.26c0-3.08-2.463-5.592-5.546-5.707l-.221-.004H54.118a4.402 4.402 0 01-3.51-1.738l-.14-.197-1.375-2.042a2.386 2.386 0 00-1.8-1.044L47.11 36z"
  }), React.createElement("path", {
    fill: vars.white,
    fillRule: "nonzero",
    d: "M99 91a6 6 0 005.996-5.775L105 85V75h.005V56.717c0-2.983-2.624-5.472-6.005-5.708V51h-2v-.01H49.527c-3.55 0-6.403 2.476-6.528 5.518l-.004.209V73.52a.987.987 0 01-.024.219.91.91 0 01.022.12l.007.113v13.132a5.817 5.817 0 01-1.497 3.897L99 91z"
  }), React.createElement("path", {
    fill: vars.bdlBoxBlue,
    d: "M80.5 73a3.5 3.5 0 013.495 3.308L84 76.5v4.169l.369.072c3.123.618 5.157 1.241 6.186 1.927C92.36 83.872 93 86.044 93 90c0 2.073-.704 4.56-2.098 7.48A4 4 0 0193 101c0 2.21-1.79 4-4 4H77a3.999 3.999 0 01-1.72-7.612C73.76 95.129 73 92.491 73 89.5c0-3.473 1.346-6.186 4-8.037V76.5a3.5 3.5 0 013.5-3.5zm0 2a1.5 1.5 0 00-1.493 1.356L79 76.5V88a1 1 0 01-1.993.117L77 88v-3.93c-1.34 1.38-2 3.173-2 5.43 0 2.934.823 5.422 2.472 7.501L88.912 97C90.31 94.161 91 91.82 91 90c0-3.344-.47-4.945-1.555-5.668-.786-.524-2.78-1.115-5.887-1.71l-.737-.138a1 1 0 01-.814-.867L82 81.5v-5a1.5 1.5 0 00-1.5-1.5zm0-5a6.5 6.5 0 016.244 8.312 1 1 0 11-1.921-.557 4.5 4.5 0 10-8.646-.001 1.001 1.001 0 01-1.921.556A6.5 6.5 0 0180.5 70z"
  }), React.createElement("path", {
    fill: vars.bdlBoxBlue,
    fillRule: "nonzero",
    d: "M47.113 34a4.4 4.4 0 013.509 1.739l.14.197 1.376 2.043c.407.607 1.073.99 1.799 1.045l.183.007h37.11c4.208 0 7.636 3.316 7.766 7.456l.004.244v2.284c4.358.24 7.863 3.449 7.996 7.464l.004.238V85c0 4.335-4.448 7.865-8.75 7.996L98 93a1 1 0 010-2c3.238 0 6.878-2.566 6.996-5.775L105 85V75h.005V56.717c0-2.983-2.624-5.472-6.005-5.708V51h-2v-.01H49.527c-3.55 0-6.403 2.476-6.528 5.518l-.004.209V73.52a.987.987 0 01-.024.219.91.91 0 01.022.12l.007.113v13.132a5.817 5.817 0 01-1.497 3.897L68 91a1 1 0 010 2H37c-3.238 0-5.878-2.521-5.996-5.675L31 87.104V38.347c0-2.33 1.85-4.232 4.174-4.342l.212-.005h11.727zm-.003 2H35.383c-1.261 0-2.294.97-2.378 2.198L33 38.36v48.604c0 2.162 1.716 3.926 3.872 4.031l.546.005h.257l.19-.036c1.743-.375 3.062-1.86 3.152-3.663l.005-.197V73.972a.98.98 0 01.017-.18.87.87 0 01-.032-.155L41 73.52V56.717c0-4.209 3.7-7.59 8.268-7.713l.26-.004L97 48.999v-2.26c0-3.08-2.463-5.592-5.546-5.707l-.221-.004H54.118a4.402 4.402 0 01-3.51-1.738l-.14-.197-1.375-2.042a2.386 2.386 0 00-1.8-1.044L47.11 36zm38.998 24c.493 0 .892.448.892 1s-.4 1-.892 1H61.892c-.493 0-.892-.448-.892-1s.4-1 .892-1h24.216zM44.156 39c.466 0 .844.448.844 1s-.378 1-.844 1h-6.312c-.466 0-.844-.448-.844-1s.378-1 .844-1h6.312z"
  }), React.createElement("path", {
    fill: vars.white,
    d: "M80.5 75a1.5 1.5 0 00-1.493 1.356L79 76.5V88a1 1 0 01-1.993.117L77 88v-3.93c-1.34 1.38-2 3.173-2 5.43 0 2.934.823 5.422 2.472 7.501L88.912 97C90.31 94.161 91 91.82 91 90c0-3.344-.47-4.945-1.555-5.668-.786-.524-2.78-1.115-5.887-1.71l-.737-.138a1 1 0 01-.814-.867L82 81.5v-5a1.5 1.5 0 00-1.5-1.5z"
  })));
};

export default EmptyStateDetails;
//# sourceMappingURL=EmptyStateDetails.js.map