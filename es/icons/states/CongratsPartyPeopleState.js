function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

import * as React from 'react';
import uniqueId from 'lodash/uniqueId';
import AccessibleSVG from '../accessible-svg';
var ICON_CLASS = 'icon-congrats-party-people';

var CongratsPartyPeopleState =
/*#__PURE__*/
function (_React$PureComponent) {
  _inherits(CongratsPartyPeopleState, _React$PureComponent);

  function CongratsPartyPeopleState() {
    var _getPrototypeOf2;

    var _this;

    _classCallCheck(this, CongratsPartyPeopleState);

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _possibleConstructorReturn(this, (_getPrototypeOf2 = _getPrototypeOf(CongratsPartyPeopleState)).call.apply(_getPrototypeOf2, [this].concat(args)));

    _defineProperty(_assertThisInitialized(_this), "idPrefix", "".concat(uniqueId(ICON_CLASS), "-"));

    return _this;
  }

  _createClass(CongratsPartyPeopleState, [{
    key: "render",
    value: function render() {
      var _this$props = this.props,
          className = _this$props.className,
          height = _this$props.height,
          title = _this$props.title,
          width = _this$props.width;
      return React.createElement(AccessibleSVG, {
        className: "".concat(ICON_CLASS, " ").concat(className),
        height: height,
        title: title,
        viewBox: "0 0 194 202",
        width: width
      }, React.createElement("defs", null, React.createElement("ellipse", {
        cx: "90.395",
        cy: "90.474",
        id: "".concat(this.idPrefix, "a"),
        rx: "90.395",
        ry: "90.474"
      }), React.createElement("path", {
        d: "M10.655 9.563c1.037 0 2.435-1.701 2.476-1.166A25248.81 25248.81 0 0 0 14.9 31.748c.066.872 8.741 5.641 10.675 7.213 1.934 1.572 8.095 2.883 9.414 8.8 1.38 6.192-.415 13.247-5.347 10.476-1.903-1.069-20.758-20.986-21.487-22.303-.486-.879-.305-10.183.544-27.913.04-.535.92 1.542 1.957 1.542z",
        id: "".concat(this.idPrefix, "c")
      }), React.createElement("path", {
        d: "M10.655 9.563c1.037 0 2.435-1.701 2.476-1.166A25248.81 25248.81 0 0 0 14.9 31.748c.066.872 8.741 5.641 10.675 7.213 1.934 1.572 8.095 2.883 9.414 8.8 1.38 6.192-.415 13.247-5.347 10.476-1.903-1.069-20.758-20.986-21.487-22.303-.486-.879-.305-10.183.544-27.913.04-.535.92 1.542 1.957 1.542z",
        id: "".concat(this.idPrefix, "d")
      })), React.createElement("g", {
        fill: "none",
        fillRule: "evenodd",
        transform: "translate(-6 -2)"
      }, React.createElement("ellipse", {
        cx: "103.955",
        cy: "111.961",
        fill: "#50BEC3",
        opacity: ".42",
        rx: "90.395",
        ry: "90.474"
      }), React.createElement("path", {
        d: "M20.534 50.98l4.198-1.282a.565.565 0 0 1 .724.623c-.136.919.249 2.162 1.154 3.73 1.128 1.954 3.297 3.357 6.506 4.209a.565.565 0 0 1 .137 1.035l-6.076 3.508a.565.565 0 0 1-.317.075c-2.75-.17-4.727-1.297-5.93-3.38-1.188-2.06-1.45-4.755-.785-8.087a.565.565 0 0 1 .39-.43z",
        fill: "#50BEC3"
      }), React.createElement("path", {
        d: "M78.491 14.713l4.277.988a.565.565 0 0 1 .316.901c-.577.728-.866 1.997-.866 3.808 0 2.256 1.177 4.555 3.53 6.898a.565.565 0 0 1-.399.965h-7.016a.565.565 0 0 1-.312-.094c-2.297-1.523-3.445-3.487-3.445-5.893 0-2.377 1.121-4.842 3.364-7.396a.565.565 0 0 1 .551-.177z",
        fill: "#F85064"
      }), React.createElement("path", {
        d: "M92.285 4.048l4.198-1.283a.565.565 0 0 1 .724.623c-.135.919.25 2.162 1.155 3.73 1.128 1.954 3.296 3.357 6.505 4.209a.565.565 0 0 1 .138 1.035l-6.077 3.508a.565.565 0 0 1-.317.075c-2.75-.17-4.726-1.298-5.93-3.381-1.188-2.059-1.45-4.754-.785-8.087a.565.565 0 0 1 .39-.43z",
        fill: "#8B37E4"
      }), React.createElement("path", {
        d: "M196.085 85.395l-4.277.988a.565.565 0 0 0-.315.902c.577.728.865 1.997.865 3.808 0 2.255-1.176 4.554-3.53 6.897a.565.565 0 0 0 .399.965h7.016c.111 0 .22-.032.313-.094C198.852 97.34 200 95.374 200 92.97c0-2.377-1.121-4.843-3.363-7.396a.565.565 0 0 0-.552-.178z",
        fill: "#50BEC3"
      }), React.createElement("path", {
        d: "M170.442 114.101l2.391-3.68a.565.565 0 0 1 .955.011c.487.791 1.58 1.497 3.282 2.116 2.12.771 4.683.452 7.689-.958a.565.565 0 0 1 .77.705l-2.4 6.593a.565.565 0 0 1-.194.261c-2.216 1.637-4.455 2.044-6.716 1.222-2.233-.814-4.167-2.71-5.8-5.69h.001a.565.565 0 0 1 .022-.58z",
        fill: "#8B37E4"
      }), React.createElement("path", {
        d: "M32.158 155.878l-2.994-3.21a.565.565 0 0 0-.939.178c-.341.864-1.296 1.748-2.864 2.653-1.954 1.128-4.533 1.259-7.739.392a.565.565 0 0 0-.636.828l3.508 6.076a.565.565 0 0 0 .237.224c2.467 1.227 4.742 1.24 6.826.036 2.058-1.188 3.633-3.392 4.723-6.61a.565.565 0 0 0-.122-.567z",
        fill: "#F85064"
      }), React.createElement("path", {
        d: "M7.39 138.914l2.994-3.21a.565.565 0 0 1 .939.178c.341.864 1.296 1.748 2.864 2.654 1.954 1.127 4.533 1.258 7.739.391a.565.565 0 0 1 .636.828l-3.508 6.077a.565.565 0 0 1-.237.223c-2.467 1.227-4.742 1.24-6.826.037-2.058-1.189-3.633-3.392-4.723-6.611a.565.565 0 0 1 .122-.567z",
        fill: "#F0A226"
      }), React.createElement("path", {
        d: "M178.565 59.822l-3.912-1.992a.565.565 0 0 0-.82.488c-.027.928-.621 2.086-1.785 3.473-1.45 1.728-3.83 2.733-7.138 3.015a.565.565 0 0 0-.315.996l5.375 4.51c.085.071.19.116.3.128 2.737.31 4.88-.457 6.426-2.3 1.528-1.82 2.254-4.43 2.177-7.827a.565.565 0 0 0-.308-.49zM167.265 181.962l-3.911-1.993a.565.565 0 0 0-.821.488c-.026.929-.62 2.086-1.785 3.473-1.45 1.728-3.829 2.733-7.137 3.015a.565.565 0 0 0-.315.996l5.374 4.51c.086.071.19.116.3.129 2.738.31 4.88-.457 6.426-2.3 1.528-1.821 2.254-4.43 2.178-7.828a.565.565 0 0 0-.309-.49z",
        fill: "#F85064"
      }), React.createElement("path", {
        d: "M142.267 18.245c2.253 1.215 4.59 4.702 3.208 7.184-1.383 2.482-5.092 4.087-6.44 3.302-1.968-1.145-1.963-3.059-.946-3.913 1.018-.853 2.47-.888 3.35.552.88 1.44.444 10.665-1.156 12.22-1.6 1.555-3.508 1.046-4.083-.861-.574-1.908.524-3.67 2.196-3.458 1.672.213 3.406 2.14 3.723 5.168.212 2.018-2.165 4.466-7.132 7.342",
        stroke: "#F0A226",
        strokeLinecap: "round",
        strokeLinejoin: "round",
        strokeWidth: "2.825"
      }), React.createElement("path", {
        d: "M11.393 74.79c-2.253 1.216-4.59 4.703-3.208 7.185 1.383 2.482 5.092 4.087 6.44 3.302 1.968-1.145 1.964-3.059.946-3.913-1.018-.854-2.47-.888-3.35.552-.88 1.44-.444 10.665 1.156 12.22 1.6 1.555 3.508 1.046 4.083-.861.575-1.908-.524-3.67-2.196-3.458-1.672.213-3.406 2.14-3.723 5.168-.212 2.018 2.165 4.466 7.132 7.342",
        stroke: "#26C281",
        strokeLinecap: "round",
        strokeLinejoin: "round",
        strokeWidth: "2.825"
      }), React.createElement("path", {
        d: "M51.872 174.877c2.253 1.215 4.59 4.703 3.207 7.185-1.382 2.482-5.092 4.086-6.44 3.301-1.967-1.145-1.963-3.058-.945-3.912 1.017-.854 2.47-.889 3.35.551.88 1.44.444 10.665-1.156 12.22-1.6 1.555-3.508 1.046-4.083-.861-.575-1.907.524-3.67 2.195-3.458 1.672.213 3.406 2.14 3.724 5.168.212 2.019-2.166 4.466-7.132 7.342",
        stroke: "#4A90E2",
        strokeLinecap: "round",
        strokeLinejoin: "round",
        strokeWidth: "2.825"
      }), React.createElement("ellipse", {
        cx: "49.153",
        cy: "50.891",
        fill: "none",
        rx: "2.26",
        ry: "2.262",
        stroke: "#8B37E4",
        strokeWidth: "2.26"
      }), React.createElement("ellipse", {
        cx: "44.633",
        cy: "57.111",
        fill: "none",
        rx: "2.26",
        ry: "2.262",
        stroke: "#F0A226",
        strokeWidth: "2.26"
      }), React.createElement("ellipse", {
        cx: "154.237",
        cy: "131.752",
        fill: "none",
        rx: "2.26",
        ry: "2.262",
        stroke: "#F8E71C",
        strokeWidth: "2.26"
      }), React.createElement("ellipse", {
        cx: "157.627",
        cy: "136.276",
        fill: "none",
        rx: "2.26",
        ry: "2.262",
        stroke: "#4A90E2",
        strokeWidth: "2.26"
      }), React.createElement("g", {
        transform: "translate(13.56 21.487)"
      }, React.createElement("mask", {
        fill: "#fff",
        id: "".concat(this.idPrefix, "b")
      }, React.createElement("use", {
        xlinkHref: "#".concat(this.idPrefix, "a")
      })), React.createElement("g", {
        mask: "url(#".concat(this.idPrefix, "b)")
      }, React.createElement("path", {
        d: "M73.564 63.236c.236 8.948-.1 14.386-1.005 16.313-1.621 3.448 5.19 9.097 3.892 9.097H57.062c-1.298 0 4.387-5.302 4.821-8.068.222-1.415-.365-6.241-1.763-14.477-.16.037-.334.058-.515.058-.78 0-1.413-.38-1.413-.848 0-.469.632-.849 1.413-.849.08 0 .16.004.236.012a704.15 704.15 0 0 0-1.214-6.797c-.097-1.874 1.176-3.393 2.842-3.393h9.045c1.665 0 2.942 1.52 2.85 3.393.06 1.35.11 2.64.15 3.87.467-.027.852.127.968.43.16.418-.247.967-.918 1.259z",
        fill: "#F5E4D5"
      }), React.createElement("path", {
        d: "M84.847 46.74c-1.021.18-1.54 1.718-1.487 2.252l2.644 26.873c.057.58-2.85 4.019-8.72 10.316.052.534-5.851 4.218-6.123 10.275-.285 6.337.549 11.64 4.924 8.056 1.689-1.384 16.8-24.272 17.289-25.697.326-.949-1.73-11.116-6.169-30.501-.133-.52-1.336-1.754-2.358-1.574z",
        fill: "#F5E4D5"
      }), React.createElement("g", {
        transform: "scale(-1 1) rotate(10 -287.68 -522.851)"
      }, React.createElement("use", {
        fill: "#D5E2E8",
        xlinkHref: "#".concat(this.idPrefix, "c")
      }), React.createElement("use", {
        fill: "#AABEC8",
        xlinkHref: "#".concat(this.idPrefix, "c")
      })), React.createElement("path", {
        d: "M65.184 145.61c-.033.303-.055.604-.065.902-.254 7.67-.13 10.092-.13 16.623 0 7.334-3.236 18.497-9.71 33.49l-6.126-.976c.113-5.794.394-9.838.843-12.133 1.682-8.58 4.082-14.405 3.982-19.328-.088-4.338-2.031-8.843-3.058-16.576-.404-3.042-.712-8.705-.924-16.99h32.436c.381 6.176.782 11.481 1.202 15.917.706 7.462 0 10.065 0 16.596 0 7.334-3.237 18.497-9.711 33.49l-6.126-.976c.113-5.794.394-9.838.844-12.133 1.68-8.58 4.08-14.405 3.981-19.328-.088-4.338-2.031-8.843-3.058-16.576-.092-.687-.328-1.508-.708-2.463-.443-.734-1.044-1.11-1.803-1.13-.911-.025-1.534.505-1.869 1.59z",
        fill: "#092F6A"
      }), React.createElement("path", {
        d: "M59.128 84.878c2.767 1.584 5.587 2.376 8.462 2.376 2.874 0 5.023-.792 6.448-2.376 4.005 4.325 6.638 9.136 7.897 14.431.967 4.069-.106 9.682 0 21.335.036 4.01.46 10.298 1.274 18.862L49.79 141.82c-1.604-20.948-1.37-35.527.705-43.74 2.074-8.211 4.952-12.612 8.632-13.201z",
        fill: "#B7C8D0"
      }), React.createElement("path", {
        d: "M52.01 42.33c.974.355 1.217 1.96 1.073 2.477l-7.27 26.005c-.157.562 2.108 4.453 6.796 11.674-.144.517 5.03 5.17 4.246 11.182-.82 6.29-2.562 11.368-6.248 7.078-1.423-1.655-12.33-26.82-12.564-28.308-.157-.991 3.634-10.647 11.37-28.967.222-.488 1.622-1.495 2.597-1.14z",
        fill: "#F5E4D5"
      }), React.createElement("path", {
        d: "M49.413 48.513c.975.355 2.87-.765 2.726-.248a25248.81 25248.81 0 0 0-6.326 22.548c-.235.842 6.286 8.29 7.565 10.429 1.28 2.138 6.62 5.477 5.836 11.49-.82 6.29-4.92 12.304-8.607 8.014-1.423-1.655-12.329-26.82-12.563-28.307-.157-.992 3.196-9.673 10.058-26.044.221-.488.336 1.764 1.311 2.118z",
        fill: "#BFCFD6"
      }), React.createElement("g", null, React.createElement("path", {
        d: "M58.613 57.856l2.844-.265c-.855.457-1.297 1.54-1.326 3.248-.029 1.708-.145 2.978-.349 3.808l-1.169-6.79zM72.454 54.764l-1.471 1.58c.541-.146 1.032.273 1.471 1.255.44.981.786 2.432 1.039 4.35-.013-2.608-.088-4.388-.226-5.34-.137-.95-.408-1.566-.813-1.845z",
        fill: "#D38B1A"
      }), React.createElement("path", {
        d: "M66.337 58.808c3.574 0 6.47-2.279 6.47-5.09 0-2.81-2.896-5.088-6.47-5.088-3.573 0-9.643 6.392-11.095 8.198-1.453 1.806 7.522 1.98 11.095 1.98z",
        fill: "#D38B1A"
      }), React.createElement("path", {
        d: "M66.905 55.35c3.277-.578 5.603-2.916 5.197-5.223-.407-2.307-3.393-3.708-6.67-3.13-3.277.578-7.917 6.805-8.988 8.522-1.07 1.717 7.184.409 10.46-.17z",
        fill: "#F0A226"
      }), React.createElement("path", {
        d: "M66.357 52.244c3.277-.578 5.96-1.414 5.704-2.863-.255-1.449-2.713-3.079-6.682-2.293-3.969.786-7.997 7.351-9.164 8.517-1.168 1.166 6.866-2.783 10.142-3.361z",
        fill: "#F5B95A"
      })), React.createElement("g", {
        transform: "matrix(-1 0 0 1 149.153 35.624)"
      }, React.createElement("path", {
        d: "M45.603 16.398H27.448c-.933 3.72-1.355 6.483-1.265 8.286.134 2.705 1.582 3.728 1.265 5.543-.29 1.648-1.334 1.968-1.635 4.378-.114.91-.193 5.34 0 7.595.166 1.942-.41 5.027-1.729 9.257h25.188c-2-5.714-2.872-9.323-2.615-10.827.385-2.256 1.853-3.637 1.875-6.702.022-3.065-2.102-2.73-2.261-5.88-.058-1.148.742-1.3 1.294-3.725.368-1.616-.286-4.258-1.962-7.925z",
        fill: "#5E6F77"
      }), React.createElement("path", {
        d: "M44.185 21.957c.236 8.949-.099 14.387-1.005 16.314-1.62 3.448 5.19 9.096 3.892 9.096H27.684c-1.298 0 4.387-5.301 4.82-8.067.223-1.416-.365-6.242-1.763-14.478-.16.038-.333.058-.515.058-.78 0-1.412-.38-1.412-.848 0-.468.632-.848 1.412-.848.08 0 .16.004.236.012a704.15 704.15 0 0 0-1.214-6.798c-.097-1.873 1.177-3.392 2.842-3.392h9.045c1.665 0 2.942 1.519 2.85 3.392.06 1.35.11 2.64.15 3.87.468-.027.853.127.969.43.16.418-.247.967-.919 1.26z",
        fill: "#E0A672"
      }), React.createElement("path", {
        d: "M55.469 5.461c-1.022.18-1.54 1.719-1.487 2.252l2.644 26.873c.057.58-2.85 4.02-8.72 10.316.052.534-5.852 4.218-6.124 10.275-.284 6.337.549 11.64 4.925 8.056 1.688-1.383 16.799-24.272 17.288-25.696.326-.95-1.73-11.117-6.168-30.502-.133-.52-1.337-1.754-2.358-1.574z",
        fill: "#E4AD7B"
      }), React.createElement("g", {
        transform: "scale(-1 1) rotate(10 -37.083 -375.591)"
      }, React.createElement("use", {
        fill: "#F85064",
        xlinkHref: "#".concat(this.idPrefix, "d")
      }), React.createElement("use", {
        fill: "#ED3F54",
        xlinkHref: "#".concat(this.idPrefix, "d")
      })), React.createElement("path", {
        d: "M35.805 104.33c-.033.305-.055.606-.064.903-.254 7.67-.13 10.092-.13 16.624 0 7.333-3.237 18.496-9.71 33.49l-6.127-.977c.113-5.794.394-9.838.844-12.132 1.681-8.58 4.081-14.406 3.981-19.329-.087-4.338-2.03-8.842-3.058-16.575-.404-3.042-.712-8.706-.923-16.991H51.977c1.099 6.176 1.858 11.482 2.278 15.917.706 7.463 0 10.065 0 16.597 0 7.333-3.237 18.496-9.71 33.49l-6.127-.977c.113-5.794.394-9.838.844-12.132 1.681-8.58 4.081-14.406 3.981-19.329-.087-4.338-2.03-8.842-3.058-16.575-.091-.688-.327-1.509-.708-2.464-.443-.733-1.044-1.11-1.803-1.13-.91-.024-1.534.506-1.869 1.59zM38.136 50.326c3.588 0 6.71-3.85 6.71-5.412 0-1.561-2.284 1.577-5.873 1.577-3.588 0-8.762-3.138-8.762-1.577 0 1.562 4.336 5.412 7.925 5.412z",
        fill: "#FFF"
      }), React.createElement("path", {
        d: "M29.75 43.6c3.533 3.25 6.736 4.875 9.61 4.875 2.875 0 4.641-1.625 5.3-4.876 4.005 4.326 6.637 9.136 7.896 14.432.967 4.068-2.577 9.828-2.471 21.48.026 2.852.243 4.011 2.471 10.746.44 1.33.865 3.987 1.274 7.97l-33.418 2.313c-.406-4.987-.406-8.415 0-10.283.934-4.297 1.492-6.259 1.658-10.746.166-4.487-2.247-17.584-.953-22.71C23.192 48.59 26.07 44.188 29.75 43.6z",
        fill: "#F85064"
      }), React.createElement("path", {
        d: "M22.631 1.052c.975.355 1.218 1.96 1.073 2.476l-7.27 26.006c-.157.561 2.109 4.453 6.797 11.673-.145.517 5.03 5.17 4.245 11.183-.82 6.29-2.561 11.368-6.248 7.078-1.423-1.656-12.33-26.82-12.564-28.308-.156-.992 3.634-10.647 11.371-28.967.222-.489 1.621-1.496 2.596-1.141z",
        fill: "#E4AD7B"
      }), React.createElement("path", {
        d: "M20.035 7.235c.974.355 2.87-.765 2.726-.248a25248.83 25248.83 0 0 0-6.326 22.547c-.236.843 6.285 8.29 7.565 10.43 1.28 2.138 9.076 4.31 8.292 10.322-.82 6.29-7.301 14.156-10.988 9.866C19.881 58.497 8.9 32.648 8.665 31.16c-.156-.991 3.196-9.672 10.058-26.043.222-.488.337 1.763 1.312 2.118z",
        fill: "#FA6476"
      }), React.createElement("ellipse", {
        cx: "31.395",
        cy: "15.015",
        fill: "#5E6F77",
        rx: "7.524",
        ry: "5.162",
        transform: "rotate(-40 31.395 15.015)"
      }), React.createElement("ellipse", {
        cx: "41.039",
        cy: "12.753",
        fill: "#5E6F77",
        rx: "7.524",
        ry: "5.162",
        transform: "scale(-1 1) rotate(-40 0 125.507)"
      }), React.createElement("ellipse", {
        cx: "37.8",
        cy: "9.17",
        fill: "#5E6F77",
        rx: "4.592",
        ry: "5.162",
        transform: "scale(-1 1) rotate(-40 0 113.025)"
      }), React.createElement("ellipse", {
        cx: "31.227",
        cy: "10.863",
        fill: "#5E6F77",
        rx: "5.465",
        ry: "5.162",
        transform: "scale(-1 1) rotate(-40 0 96.657)"
      }), React.createElement("ellipse", {
        cx: "31.227",
        cy: "10.863",
        fill: "#5E6F77",
        rx: "5.465",
        ry: "5.162",
        transform: "scale(-1 1) rotate(-40 0 96.657)"
      }))))));
    }
  }]);

  return CongratsPartyPeopleState;
}(React.PureComponent);

_defineProperty(CongratsPartyPeopleState, "defaultProps", {
  className: '',
  height: 202,
  width: 194
});

export default CongratsPartyPeopleState;
//# sourceMappingURL=CongratsPartyPeopleState.js.map