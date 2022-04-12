/**
 * 
 * @file Static Versions Sidebar component
 * @author Box
 */
import * as React from 'react';
import { FormattedMessage } from 'react-intl';
import BoxDrive140 from '../../../illustration/BoxDrive140';
import { BackButton } from '../../common/nav-button';
import PrimaryButton from '../../../components/primary-button';
import { LoadingIndicatorWrapper } from '../../../components/loading-indicator';
import VersionsMenu from './VersionsMenu';
import messages from './messages';
import './StaticVersionsSidebar.scss';

var StaticVersionsSidebar = function StaticVersionsSidebar(_ref) {
  var isLoading = _ref.isLoading,
      onUpgradeClick = _ref.onUpgradeClick,
      parentName = _ref.parentName,
      showUpsellWithPicture = _ref.showUpsellWithPicture;
  var versionTimestamp = new Date();
  versionTimestamp.setDate(versionTimestamp.getDate() - 1);
  var versions = ['1', '2', '3'].map(function (versionNumber) {
    return {
      id: versionNumber,
      version_number: versionNumber,
      type: 'file_version',
      permissions: {
        can_preview: true
      },
      created_at: versionTimestamp.toUTCString(),
      modified_by: null,
      size: 1875887,
      trashed_at: null,
      uploader_display_name: 'John Doe'
    };
  });
  return React.createElement("div", {
    className: "bcs-StaticVersionSidebar",
    role: "tabpanel",
    "data-resin-component": "preview",
    "data-resin-feature": "versions"
  }, React.createElement("div", {
    className: "bcs-StaticVersionSidebar-header"
  }, React.createElement("h3", {
    className: "bcs-StaticVersionSidebar-title"
  }, React.createElement(React.Fragment, null, React.createElement(BackButton, {
    "data-resin-target": "back",
    to: "/".concat(parentName)
  }), React.createElement(FormattedMessage, messages.versionsTitle)))), React.createElement("div", {
    className: "bcs-StaticVersionSidebar-content-wrapper"
  }, React.createElement(LoadingIndicatorWrapper, {
    className: "bcs-StaticVersionSidebar-content",
    crawlerPosition: "top",
    isLoading: isLoading
  }, React.createElement(VersionsMenu, {
    versions: versions,
    fileId: "1",
    versionCount: 3,
    versionLimit: 3
  }))), React.createElement("div", {
    className: "bcs-StaticVersionSidebar-upsell-wrapper"
  }, React.createElement("div", {
    className: "bcs-StaticVersionSidebar-upsell"
  }, showUpsellWithPicture && React.createElement(BoxDrive140, {
    className: "bcs-StaticVersionSidebar-upsell-icon"
  }), React.createElement("p", {
    className: "bcs-StaticVersionSidebar-upsell-header"
  }, React.createElement(FormattedMessage, messages.versionUpgradeLink)), React.createElement("p", null, React.createElement(FormattedMessage, messages.versionUpsell)), React.createElement(PrimaryButton, {
    className: "bcs-StaticVersionSidebar-upsell-button",
    "data-resin-target": "versioning_error_upgrade_cta",
    onClick: onUpgradeClick,
    type: "button"
  }, React.createElement(FormattedMessage, messages.upgradeButton)))));
};

export default StaticVersionsSidebar;
//# sourceMappingURL=StaticVersionSidebar.js.map