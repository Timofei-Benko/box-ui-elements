function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

/* eslint-disable react/prefer-stateless-function */

/* eslint-disable max-classes-per-file */
import * as React from 'react';
export default {
  getAsyncSidebarContent: jest.fn(function (panelName) {
    return {
      details:
      /*#__PURE__*/
      function (_React$Component) {
        _inherits(DetailsSidebar, _React$Component);

        function DetailsSidebar() {
          _classCallCheck(this, DetailsSidebar);

          return _possibleConstructorReturn(this, _getPrototypeOf(DetailsSidebar).apply(this, arguments));
        }

        _createClass(DetailsSidebar, [{
          key: "render",
          value: function render() {
            return React.createElement("div", {
              "data-testid": "details-sidebar"
            });
          }
        }]);

        return DetailsSidebar;
      }(React.Component),
      metadata:
      /*#__PURE__*/
      function (_React$Component2) {
        _inherits(MetadataSidebar, _React$Component2);

        function MetadataSidebar() {
          _classCallCheck(this, MetadataSidebar);

          return _possibleConstructorReturn(this, _getPrototypeOf(MetadataSidebar).apply(this, arguments));
        }

        _createClass(MetadataSidebar, [{
          key: "render",
          value: function render() {
            return React.createElement("div", {
              "data-testid": "metadata-sidebar"
            });
          }
        }]);

        return MetadataSidebar;
      }(React.Component),
      skills:
      /*#__PURE__*/
      function (_React$Component3) {
        _inherits(SkillsSidebar, _React$Component3);

        function SkillsSidebar() {
          _classCallCheck(this, SkillsSidebar);

          return _possibleConstructorReturn(this, _getPrototypeOf(SkillsSidebar).apply(this, arguments));
        }

        _createClass(SkillsSidebar, [{
          key: "render",
          value: function render() {
            return React.createElement("div", {
              "data-testid": "skills-sidebar"
            });
          }
        }]);

        return SkillsSidebar;
      }(React.Component),
      activity:
      /*#__PURE__*/
      function (_React$Component4) {
        _inherits(ActivitySidebar, _React$Component4);

        function ActivitySidebar() {
          _classCallCheck(this, ActivitySidebar);

          return _possibleConstructorReturn(this, _getPrototypeOf(ActivitySidebar).apply(this, arguments));
        }

        _createClass(ActivitySidebar, [{
          key: "render",
          value: function render() {
            return React.createElement("div", {
              "data-testid": "activity-sidebar"
            });
          }
        }]);

        return ActivitySidebar;
      }(React.Component),
      versions:
      /*#__PURE__*/
      function (_React$Component5) {
        _inherits(VersionsSidebar, _React$Component5);

        function VersionsSidebar() {
          _classCallCheck(this, VersionsSidebar);

          return _possibleConstructorReturn(this, _getPrototypeOf(VersionsSidebar).apply(this, arguments));
        }

        _createClass(VersionsSidebar, [{
          key: "render",
          value: function render() {
            return React.createElement("div", {
              "data-testid": "versions-sidebar"
            });
          }
        }]);

        return VersionsSidebar;
      }(React.Component)
    }[panelName];
  })
};