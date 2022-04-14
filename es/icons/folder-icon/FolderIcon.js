import * as React from 'react'; // import IconFolderCollab from '../../icon/content/FolderShared32';
// import IconFolderExternal from '../../icon/content/FolderExternal32';

import AccessibleSVG from '../../components/accessible-svg/AccessibleSVG';
import * as vars from '../../styles/variables';

var FolderIcon = function FolderIcon(props) {
  // if (isExternal) {
  //     return <IconFolderExternal height={dimension} title={title} width={dimension} />;
  // }
  //
  // if (isCollab) {
  //     return <IconFolderCollab height={dimension} title={title} width={dimension} />;
  // }
  return React.createElement(AccessibleSVG, {
    width: 16,
    height: 16,
    viewBox: "0 0 32 32"
  }, React.createElement("g", {
    fill: "none",
    fillRule: "evenodd"
  }, React.createElement("path", {
    fill: "gold",
    d: "M6 6h6c2 0 1.5 2 4 2h10a3 3 0 013 3v13a3 3 0 01-3 3H6a3 3 0 01-3-3V9a3 3 0 013-3z"
  }), React.createElement("path", {
    fill: vars.white,
    fillOpacity: 0.5,
    d: "M6 11h20a3 3 0 013 3v10a3 3 0 01-3 3H6a3 3 0 01-3-3V14a3 3 0 013-3z"
  })));
};

export default FolderIcon;
//# sourceMappingURL=FolderIcon.js.map