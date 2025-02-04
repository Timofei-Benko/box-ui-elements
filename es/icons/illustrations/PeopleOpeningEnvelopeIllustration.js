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
var ICON_CLASS = 'people-opening-envelope-illustration';

var PeopleOpeningEnvelopeIllustration =
/*#__PURE__*/
function (_React$PureComponent) {
  _inherits(PeopleOpeningEnvelopeIllustration, _React$PureComponent);

  function PeopleOpeningEnvelopeIllustration() {
    var _getPrototypeOf2;

    var _this;

    _classCallCheck(this, PeopleOpeningEnvelopeIllustration);

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _possibleConstructorReturn(this, (_getPrototypeOf2 = _getPrototypeOf(PeopleOpeningEnvelopeIllustration)).call.apply(_getPrototypeOf2, [this].concat(args)));

    _defineProperty(_assertThisInitialized(_this), "idPrefix", "".concat(uniqueId(ICON_CLASS), "-"));

    return _this;
  }

  _createClass(PeopleOpeningEnvelopeIllustration, [{
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
        viewBox: "0 0 200 200",
        width: width
      }, React.createElement("defs", null, React.createElement("path", {
        d: "M19.072 58.407L87.36 1.58a6.8 6.8 0 0 1 8.699 0l68.289 56.826c.517.43.817 1.069.817 1.742v75.778a2.267 2.267 0 0 1-2.267 2.267H20.522a2.267 2.267 0 0 1-2.267-2.267V60.149c0-.673.3-1.312.817-1.742z",
        id: "a"
      }), React.createElement("path", {
        d: "M95.88 88.679l63.635 49.412H23.905L87.54 88.679a6.8 6.8 0 0 1 8.34 0z",
        id: "c"
      }), React.createElement("filter", {
        filterUnits: "objectBoundingBox",
        height: "186.5%",
        id: "b",
        width: "132.4%",
        x: "-16.2%",
        y: "-53.1%"
      }, React.createElement("feOffset", {
        dy: "-5",
        in: "SourceAlpha",
        result: "shadowOffsetOuter1"
      }), React.createElement("feGaussianBlur", {
        in: "shadowOffsetOuter1",
        result: "shadowBlurOuter1",
        stdDeviation: "6.5"
      }), React.createElement("feColorMatrix", {
        in: "shadowBlurOuter1",
        values: "0 0 0 0 0.0823529412 0 0 0 0 0.121568627 0 0 0 0 0.149019608 0 0 0 0.06 0"
      })), React.createElement("path", {
        d: "M8.197 7.365c.798 0 1.874-1.31 1.905-.898.691 9.175 1.145 15.17 1.36 17.984.051.671 6.725 4.344 8.213 5.555 1.488 1.21 6.227 2.22 7.242 6.777 1.062 4.768-.32 10.202-4.113 8.068-1.464-.823-15.97-16.162-16.531-17.177-.374-.676-.235-7.842.418-21.497.032-.412.708 1.188 1.506 1.188z",
        id: "d"
      }), React.createElement("path", {
        d: "M8.197 7.365c.798 0 1.874-1.31 1.905-.898.691 9.175 1.145 15.17 1.36 17.984.051.671 6.725 4.344 8.213 5.555 1.488 1.21 6.227 2.22 7.242 6.777 1.062 4.768-.32 10.202-4.113 8.068-1.464-.823-15.97-16.162-16.531-17.177-.374-.676-.235-7.842.418-21.497.032-.412.708 1.188 1.506 1.188z",
        id: "e"
      })), React.createElement("g", {
        fill: "none",
        fillRule: "evenodd",
        transform: "translate(10 10)"
      }, React.createElement("ellipse", {
        cx: "90.95",
        cy: "90",
        fill: "#DDE6ED",
        opacity: ".6",
        rx: "90.05",
        ry: "90"
      }), React.createElement("g", {
        fillRule: "evenodd",
        transform: "translate(0 7.2)"
      }, React.createElement("use", {
        fill: "#FC627A",
        xlinkHref: "#a"
      }), React.createElement("use", {
        fill: "#000",
        fillOpacity: ".12",
        xlinkHref: "#a"
      })), React.createElement("path", {
        d: "M23.906 95.908h135.61v31.703H23.906z",
        fill: "#90A0B0",
        fillRule: "nonzero",
        opacity: ".5",
        style: {
          mixBlendMode: 'multiply'
        }
      }), React.createElement("path", {
        d: "M131.263 43.37v84.241H35.206V43.37a6.315 6.315 0 0 1 1.886-4.49 6.437 6.437 0 0 1 4.542-1.85h83.224c3.535 0 6.402 2.838 6.405 6.34",
        fill: "#8EA6B2",
        fillRule: "nonzero",
        opacity: ".4",
        style: {
          mixBlendMode: 'multiply'
        }
      }), React.createElement("path", {
        d: "M148.197 49.177v78.434h-96.04V49.177c0-3.58 2.864-6.482 6.399-6.485h83.254c1.699 0 3.328.683 4.529 1.9a6.528 6.528 0 0 1 1.875 4.585",
        fill: "#8EA6B2",
        fillRule: "nonzero",
        opacity: ".2",
        style: {
          mixBlendMode: 'multiply'
        }
      }), React.createElement("path", {
        d: "M139.739 127.611H43.682v-89.87c.003-3.52 2.87-6.372 6.405-6.372h83.246c3.538 0 6.406 2.855 6.406 6.377v89.865z",
        fill: "#FFF",
        fillRule: "nonzero"
      }), React.createElement("path", {
        d: "M43.682 41.56h96.057v86.051H43.682z",
        fill: "#002947",
        fillRule: "nonzero"
      }), React.createElement("path", {
        d: "M134.088 127.611v-60.62c0-.446-.179-.874-.497-1.19l-17.208-16.957a1.728 1.728 0 0 0-1.206-.49h-64.13c-.947 0-1.715.757-1.715 1.691v77.566",
        fill: "#F9F9F9",
        fillRule: "nonzero"
      }), React.createElement("path", {
        d: "M55.548 69.866h73.455v5.148H55.548v-5.148zm0 9.98h73.455v5.148H55.548v-5.148zm0 9.987h73.455v5.147H55.548v-5.147zm0 9.986h73.455v5.147H55.548V99.82z",
        fill: "#E9EEF3",
        fillRule: "nonzero"
      }), React.createElement("path", {
        d: "M55.548 57.977H91.71v5.096H55.548z",
        fill: "#0061D5",
        fillRule: "nonzero"
      }), React.createElement("path", {
        d: "M118.324 63.639c.175-.566-.786-.957-1.232-1.048a4.45 4.45 0 0 0-1.757.085c-1.667.34-3.458.963-5.176.804a.565.565 0 0 1-.48-.283c-.379-.753-1.628-.113-2.091.38.313-.336.541-.742.667-1.184.3-1.053-2.227.498-2.464.617 1.028-.498 2.899-1.25 2.752-2.632-.271-2.548-6.419 1.794-7.154 2.395a5.7 5.7 0 0 0 2.622-.827c.938-.566 1.695-1.285 2.61-1.88 1.334-.888 2.736-1.54 3.803-2.762.277-.317.532-.787.266-1.133-.266-.345-.627-.232-.972-.18a19.395 19.395 0 0 0-8.345 3.543c-1.515 1.099-3.39 2.463-3.916 4.309",
        stroke: "#0061D5",
        strokeLinecap: "round",
        strokeLinejoin: "round",
        strokeWidth: ".567"
      }), React.createElement("path", {
        d: "M18.255 69.474l72.992 32.721c.295.133.632.133.927 0l72.992-32.72v73.652a2.267 2.267 0 0 1-2.267 2.267H20.522a2.267 2.267 0 0 1-2.267-2.267V69.474z",
        fill: "#F9627B",
        fillRule: "nonzero"
      }), React.createElement("g", {
        fillRule: "nonzero",
        transform: "translate(0 7.2)"
      }, React.createElement("use", {
        fill: "#000",
        filter: "url(#b)",
        xlinkHref: "#c"
      }), React.createElement("use", {
        fill: "#FC627A",
        fillRule: "evenodd",
        xlinkHref: "#c"
      }), React.createElement("use", {
        fill: "#FFF",
        fillOpacity: ".12",
        fillRule: "evenodd",
        xlinkHref: "#c"
      })), React.createElement("g", null, React.createElement("path", {
        d: "M31.985 54.766c.182 6.918-.076 11.122-.774 12.612-1.249 2.665 3.998 7.032 2.999 7.032H19.272c-1 0 3.38-4.099 3.715-6.237.17-1.094-.282-4.825-1.359-11.193-.123.03-.257.045-.397.045-.6 0-1.088-.293-1.088-.655 0-.363.487-.656 1.088-.656.062 0 .123.003.182.009a546.094 546.094 0 0 0-.935-5.255c-.075-1.449.906-2.623 2.19-2.623h6.968c1.283 0 2.266 1.174 2.195 2.623.046 1.044.085 2.041.116 2.992.36-.02.656.1.746.334.124.323-.19.747-.708.972z",
        fill: "#F5E4D5"
      }), React.createElement("path", {
        d: "M40.496 42.036c-.786.139-1.184 1.323-1.144 1.735l2.038 20.695c.044.447-2.191 3.095-6.707 7.944.04.41-4.501 3.247-4.71 7.912-.217 4.88.424 8.964 3.79 6.204 1.3-1.065 12.921-18.69 13.297-19.786.251-.732-1.332-8.562-4.75-23.491-.102-.4-1.028-1.351-1.814-1.213z",
        fill: "#F5E4D5"
      }), React.createElement("g", {
        transform: "scale(-1 1) rotate(10 -243.654 -257.586)"
      }, React.createElement("use", {
        fill: "#D5E2E8",
        xlinkHref: "#d"
      }), React.createElement("use", {
        fill: "#AABEC8",
        xlinkHref: "#d"
      })), React.createElement("path", {
        d: "M25.455 118.205a9.123 9.123 0 0 0-.05.697c-.196 5.92-.1 7.79-.1 12.833 0 5.661-2.507 14.278-7.521 25.852l-4.745-.753c.088-4.473.306-7.595.654-9.366 1.302-6.623 3.16-11.12 3.084-14.92-.069-3.35-1.573-6.827-2.37-12.796-.312-2.348-.55-6.72-.714-13.117H38.814c.295 4.768.605 8.864.93 12.288.547 5.76 0 7.77 0 12.812 0 5.661-2.507 14.278-7.52 25.852l-4.745-.753c.087-4.473.305-7.595.653-9.366 1.303-6.623 3.161-11.12 3.084-14.92-.068-3.35-1.573-6.827-2.369-12.796-.07-.53-.253-1.165-.548-1.902-.343-.566-.808-.857-1.396-.873-.706-.018-1.188.391-1.448 1.228z",
        fill: "#092F6A"
      }), React.createElement("path", {
        d: "M20.595 71.361c2.128 1.224 4.297 1.836 6.508 1.836 2.212 0 3.865-.612 4.96-1.836 3.082 3.342 5.107 7.058 6.075 11.148.744 3.143.899 8.103.98 17.104.028 3.098.218 7.777.57 14.038l-26.276 1.694c-1.234-16.18-1.053-27.443.542-33.786 1.596-6.343 3.81-9.742 6.64-10.198z",
        fill: "#B7C8D0"
      }), React.createElement("path", {
        d: "M17.853 118.887c.75-.273.937-1.509.825-1.907l-5.6-20.027c-.121-.432 1.62-3.428 5.226-8.987-.111-.398 3.869-3.98 3.264-8.61-.633-4.844-1.974-8.755-4.81-5.452-1.094 1.274-9.48 20.65-9.66 21.795-.12.763 2.8 8.2 8.758 22.309.17.376 1.247 1.152 1.997.879z",
        fill: "#F5E4D5"
      }), React.createElement("path", {
        d: "M15.855 114.125c.75-.273 2.209.59 2.097.192-2.488-8.859-4.113-14.647-4.873-17.364-.181-.65 4.48-6.527 5.464-8.174.985-1.646 3.565-4.571 4.2-8.458.66-4.035-.788-8.9-2.481-8.9-4.321-.003-7.736 1.99-10.028 6.466C7.23 83.749 7.237 94.83 7.1 95.698c-.12.764 2.461 7.45 7.745 20.057.17.377.259-1.357 1.009-1.63z",
        fill: "#BFCFD6"
      }), React.createElement("g", null, React.createElement("path", {
        d: "M20.318 50.596l2.188-.204c-.658.352-.998 1.186-1.02 2.501-.023 1.316-.112 2.294-.269 2.933l-.9-5.23zM30.966 48.215l-1.132 1.216c.416-.112.794.21 1.132.967.338.756.604 1.873.799 3.35-.01-2.008-.068-3.38-.174-4.112-.105-.732-.314-1.206-.625-1.421z",
        fill: "#D38B1A"
      }), React.createElement("path", {
        d: "M26.26 51.329c2.75 0 4.978-1.755 4.978-3.92 0-2.164-2.229-3.919-4.978-3.919-2.75 0-7.419 4.924-8.536 6.314-1.118 1.39 5.787 1.525 8.536 1.525z",
        fill: "#D38B1A"
      }), React.createElement("path", {
        d: "M26.697 48.666c2.521-.444 4.311-2.245 3.998-4.021-.314-1.777-2.611-2.856-5.132-2.412-2.521.445-6.09 5.24-6.914 6.562-.823 1.322 5.527.316 8.048-.129z",
        fill: "#F0A226"
      }), React.createElement("path", {
        d: "M26.276 46.274c2.52-.444 4.584-1.088 4.388-2.204-.197-1.116-2.088-2.371-5.142-1.767-3.053.605-6.15 5.66-7.05 6.558-.897.898 5.283-2.142 7.804-2.587z",
        fill: "#F5B95A"
      })), React.createElement("g", {
        fill: "#151E25"
      }, React.createElement("path", {
        d: "M16.517 159.58c1.184.138 2.397.24 3.638.304 2.27.12 4.059.13 5.367.032a.436.436 0 0 0 .4-.388l.115-1.054.001-.009c.027-.09.04-.19.04-.3 0-1.327-.882-1.884-3.042-1.884-1.034 0-2.043.472-3.217.902-.743.273-1.877.227-2.822.195-.965-.194-2.105-.447-3.422-.757a.436.436 0 0 0-.536.424v3.087h3.478v-.552zM30.86 159.58c1.184.138 2.397.24 3.639.304 2.27.12 4.058.13 5.366.032a.436.436 0 0 0 .4-.388l.116-1.054v-.009c.027-.09.041-.19.041-.3 0-1.327-.882-1.884-3.043-1.884-1.034 0-2.043.472-3.217.902-.742.273-1.876.227-2.822.195-.964-.194-2.105-.447-3.421-.757a.436.436 0 0 0-.536.424v3.087h3.477v-.552z"
      }))), React.createElement("g", null, React.createElement("path", {
        d: "M130.608 49.645h13.967c.718 2.866 1.042 4.993.974 6.381-.103 2.083-1.218 2.871-.974 4.269.223 1.27 1.026 1.516 1.258 3.372.088.7.149 4.112 0 5.85-.128 1.495.316 3.87 1.33 7.128h-19.377c1.539-4.4 2.21-7.18 2.012-8.338-.297-1.738-1.426-2.801-1.443-5.162-.017-2.36 1.617-2.103 1.74-4.528.044-.884-.572-1-.997-2.868-.283-1.245.22-3.28 1.51-6.104z",
        fill: "#5E6F77"
      }), React.createElement("path", {
        d: "M131.699 53.927c-.182 6.89.076 11.079.773 12.563 1.247 2.655-3.993 7.005-2.994 7.005h14.916c.998 0-3.375-4.082-3.71-6.213-.17-1.09.282-4.806 1.358-11.15.122.03.256.045.396.045.6 0 1.087-.292 1.087-.653 0-.36-.487-.653-1.087-.653-.062 0-.123.003-.182.01.276-1.596.587-3.341.934-5.236.075-1.443-.905-2.613-2.186-2.613h-6.959c-1.28 0-2.263 1.17-2.192 2.613-.046 1.04-.085 2.033-.116 2.98-.36-.02-.655.099-.745.332-.124.322.19.745.707.97z",
        fill: "#E6A871"
      }), React.createElement("path", {
        d: "M123.022 117.293c.786-.139 1.184-1.323 1.144-1.735l-2.038-20.695c-.044-.447 2.192-3.095 6.707-7.944-.04-.41 4.502-3.247 4.71-7.912.218-4.88-.424-8.964-3.79-6.204-1.299 1.065-12.92 18.69-13.297 19.787-.25.73 1.332 8.56 4.75 23.49.102.4 1.028 1.351 1.814 1.213z",
        fill: "#E6A871"
      }), React.createElement("g", {
        transform: "scale(1 -1) rotate(10 748.675 597.261)"
      }, React.createElement("use", {
        fill: "#F85064",
        xlinkHref: "#e"
      }), React.createElement("use", {
        fill: "#7022C3",
        xlinkHref: "#e"
      })), React.createElement("path", {
        d: "M132.13 156.678c-.671.68-1.564 1.033-2.678 1.058-1.114.025-1.929-.025-2.444-.15v1.801l8.883-.189c-.082-1.18-.227-2.02-.435-2.52-.266-.636-.124-2.22-.19-2.33-.256-.428-4.27-.994-3.35.584.217.374.289.956.215 1.746z",
        fill: "#E6A871"
      }), React.createElement("path", {
        d: "M133.978 159.903c-1.599.227-3.252.385-4.959.475a65.545 65.545 0 0 1-6.136.047.436.436 0 0 1-.3-.735l.678-.715c.656-.884 2.208-1.422 3.344-1.466 1.02-.04.976.508 2.15.938.933.341 3.027-.149 4.216-.258a43.425 43.425 0 0 0 2.565-.957.436.436 0 0 1 .6.404V159.42l-.435 1.206h-1.406l-.317-.723z",
        fill: "#092F6A"
      }), React.createElement("path", {
        d: "M146.474 156.678c-.672.68-1.565 1.033-2.679 1.058-1.114.025-1.929-.025-2.444-.15v1.801l8.883-.189c-.082-1.18-.227-2.02-.435-2.52-.266-.636-.124-2.22-.19-2.33-.256-.428-4.269-.994-3.35.584.217.374.289.956.215 1.746z",
        fill: "#E6A871"
      }), React.createElement("path", {
        d: "M148.321 159.903c-1.599.227-3.252.385-4.958.475a65.545 65.545 0 0 1-6.137.047.436.436 0 0 1-.299-.735l.677-.715c.656-.884 2.209-1.422 3.345-1.466 1.02-.04.976.508 2.15.938.932.341 3.026-.149 4.215-.258a43.425 43.425 0 0 0 2.566-.957.436.436 0 0 1 .599.404V159.42l-.435 1.206h-1.405l-.318-.723z",
        fill: "#092F6A"
      }), React.createElement("path", {
        d: "M138.146 117.365c.025.235.042.466.05.696.195 5.906.1 7.772.1 12.802 0 5.648 2.49 14.245 7.47 25.792l4.713-.752c-.087-4.462-.303-7.577-.65-9.344-1.293-6.607-3.139-11.094-3.062-14.885.067-3.341 1.562-6.81 2.352-12.766.311-2.342.548-6.704.71-13.085h-24.125c-.845 4.756-1.43 8.843-1.752 12.258-.544 5.748 0 7.752 0 12.782 0 5.648 2.49 14.245 7.47 25.792l4.714-.752c-.087-4.462-.304-7.577-.65-9.344-1.293-6.607-3.14-11.094-3.063-14.885.068-3.341 1.563-6.81 2.353-12.766.07-.53.252-1.162.545-1.897.34-.565.803-.855 1.387-.87.7-.02 1.18.39 1.438 1.224zM136.353 75.774c-2.76 0-5.162-2.965-5.162-4.168 0-1.202 1.757 1.215 4.517 1.215 2.76 0 6.742-2.417 6.742-1.215 0 1.203-3.337 4.168-6.097 4.168z",
        fill: "#FFF"
      }), React.createElement("path", {
        d: "M142.804 70.594c-2.718 2.503-5.182 3.755-7.394 3.755-2.211 0-3.57-1.252-4.076-3.755-3.082 3.331-5.107 7.036-6.075 11.114-.744 3.133 1.982 7.569 1.901 16.543-.02 2.196-.187 3.09-1.901 8.275-.339 1.025-.665 3.071-.98 6.14l25.709 1.78c.312-3.84.312-6.48 0-7.92-.719-3.308-1.147-4.82-1.275-8.275-.128-3.456 1.729-13.542.732-17.49-1.595-6.324-3.81-9.713-6.64-10.167z",
        fill: "#8B37E4"
      }), React.createElement("g", null, React.createElement("path", {
        d: "M148.273 37.83c-.75.272-.936 1.508-.825 1.906l5.6 20.027c.122.432-1.62 3.428-5.226 8.987.112.398-3.868 3.98-3.264 8.61.633 4.844 1.975 8.755 4.81 5.452 1.094-1.274 9.48-20.65 9.66-21.795.12-.763-2.8-8.2-8.757-22.309-.17-.376-1.248-1.152-1.998-.879z",
        fill: "#E6A871"
      }), React.createElement("path", {
        d: "M150.272 42.591c-.75.273-2.21-.59-2.098-.192 2.489 8.859 4.113 14.647 4.873 17.365.182.648-4.833 6.382-5.818 8.029-.984 1.646-6.982 3.317-6.377 7.947.633 4.843 5.621 10.902 8.457 7.6 1.094-1.275 9.537-21.177 9.717-22.322.12-.764-2.462-7.45-7.746-20.057-.17-.376-.259 1.358-1.008 1.63z",
        fill: "#9F51F1"
      })), React.createElement("path", {
        d: "M139.037 41.502c-1.427-1.414-3.582-1.643-4.981-.469a3.25 3.25 0 0 0-1.08 1.8c-.483.26-.96.58-1.412.96-2.449 2.054-3.29 5.084-1.88 6.765 1.412 1.682 4.541 1.38 6.99-.675.169-.141.33-.287.483-.437a7.911 7.911 0 0 0 1.826 2.179c2.45 2.055 5.578 2.357 6.99.675 1.121-1.336.82-3.524-.58-5.398a4.148 4.148 0 0 0 .361-2.196 3.856 3.856 0 0 0-.865-2.927c-1.411-1.681-3.997-1.835-5.776-.342a4.533 4.533 0 0 0-.076.065z",
        fill: "#5E6F77"
      }))));
    }
  }]);

  return PeopleOpeningEnvelopeIllustration;
}(React.PureComponent);

_defineProperty(PeopleOpeningEnvelopeIllustration, "defaultProps", {
  className: '',
  height: 200,
  width: 200
});

export default PeopleOpeningEnvelopeIllustration;
//# sourceMappingURL=PeopleOpeningEnvelopeIllustration.js.map