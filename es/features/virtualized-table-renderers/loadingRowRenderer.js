function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

import * as React from 'react';
import { defaultRowRenderer } from '@box/react-virtualized/dist/es/Table/index';
import Ghost from '../../components/ghost';

var loadingRowRenderer = function loadingRowRenderer(params) {
  var columns = params.columns;
  var loadingCell = React.createElement(Ghost, {
    key: "loading",
    borderRadius: 15,
    height: 15,
    width: "50%"
  });
  var mappedColumns = columns.map(function (column) {
    return React.cloneElement(column, null, [loadingCell]);
  });
  return defaultRowRenderer(_objectSpread({}, params, {
    columns: mappedColumns
  }));
};

export default loadingRowRenderer;