import * as React from 'react';
import IconFileVideo from '../../icon/content/FileVideo32';
import PreviewLoadingRing from './PreviewLoadingRing';
import { getColor, getIcon } from './previewIcons';
import './PreviewLoading.scss';
export default function PreviewLoading(_ref) {
  var extension = _ref.extension;
  var color = getColor(extension);
  var Icon = getIcon(extension);
  var theme = Icon === IconFileVideo ? 'dark' : 'light'; // Video files are displayed on a dark background

  return React.createElement(PreviewLoadingRing, {
    className: "bdl-PreviewLoading",
    color: color,
    theme: theme
  }, React.createElement(Icon, {
    className: "bdl-PreviewLoading-icon"
  }));
}
//# sourceMappingURL=PreviewLoading.js.map