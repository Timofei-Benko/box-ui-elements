/**
 * 
 * @file Function to render the author table cell
 * @author --
 */
import React from 'react';
// eslint-disable-next-line
export default (function () {
  return function (_ref) {
    var dataKey = _ref.dataKey,
        rowData = _ref.rowData;
    var modified_by = rowData.modified_by;
    return React.createElement("span", null, modified_by.name);
  };
});
//# sourceMappingURL=authorCellRenderer.js.map