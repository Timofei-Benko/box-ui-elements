/**
 * 
 * @file Function to render the date table cells
 * @author Box
 */
import React from 'react';
import Date from './Date';
export default (function (type) {
  return function (_ref) {
    var dataKey = _ref.dataKey,
        rowData = _ref.rowData;
    return React.createElement(Date, {
      dataKey: dataKey,
      item: rowData,
      type: type
    });
  };
});
//# sourceMappingURL=dateCellRenderer.js.map