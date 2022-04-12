import * as React from 'react';
import FeatureContext from './FeatureContext';
import * as types from './flowTypes';

function FeatureProvider(_ref) {
  var _ref$features = _ref.features,
      features = _ref$features === void 0 ? {} : _ref$features,
      children = _ref.children;
  return React.createElement(FeatureContext.Provider, {
    value: features
  }, children);
}

FeatureProvider.propTypes = {
  children: PropTypes.node,
  features: function features() {
    return (typeof (types.FeatureConfig == null ? {} : types.FeatureConfig) === "function" ? PropTypes.instanceOf(types.FeatureConfig == null ? {} : types.FeatureConfig) : PropTypes.any).apply(this, arguments);
  }
};
export default FeatureProvider;
import PropTypes from "prop-types";