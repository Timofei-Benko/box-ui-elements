/**
 * 
 * @file Item action component
 */
import React from 'react';
import { FormattedMessage, injectIntl } from 'react-intl';
import IconCheck from '../../icons/general/IconCheck';
import IconClose from '../../icons/general/IconClose';
import IconInProgress from './IconInProgress';
import IconRetry from '../../icons/general/IconRetry';
import LoadingIndicator from '../../components/loading-indicator';
import PlainButton from '../../components/plain-button/PlainButton';
import PrimaryButton from '../../components/primary-button/PrimaryButton';
import Tooltip from '../../components/tooltip';
import messages from '../common/messages';
import { ERROR_CODE_UPLOAD_FILE_SIZE_LIMIT_EXCEEDED, STATUS_PENDING, STATUS_IN_PROGRESS, STATUS_STAGED, STATUS_COMPLETE, STATUS_ERROR } from '../../constants';
import './ItemAction.scss';
var ICON_CHECK_COLOR = '#26C281';

var ItemAction = function ItemAction(_ref) {
  var _ref$error = _ref.error,
      error = _ref$error === void 0 ? {} : _ref$error,
      intl = _ref.intl,
      _ref$isFolder = _ref.isFolder,
      isFolder = _ref$isFolder === void 0 ? false : _ref$isFolder,
      isResumableUploadsEnabled = _ref.isResumableUploadsEnabled,
      onClick = _ref.onClick,
      onUpgradeCTAClick = _ref.onUpgradeCTAClick,
      status = _ref.status;
  var icon = React.createElement(IconClose, null);
  var tooltip;
  var code = error.code;

  if (isFolder && status !== STATUS_PENDING) {
    return null;
  }

  switch (status) {
    case STATUS_COMPLETE:
      icon = React.createElement(IconCheck, {
        color: ICON_CHECK_COLOR
      });

      if (!isResumableUploadsEnabled) {
        tooltip = messages.remove;
      }

      break;

    case STATUS_ERROR:
      icon = React.createElement(IconRetry, {
        height: 24,
        width: 24
      });
      tooltip = isResumableUploadsEnabled ? messages.resume : messages.retry;
      break;

    case STATUS_IN_PROGRESS:
    case STATUS_STAGED:
      if (isResumableUploadsEnabled) {
        icon = React.createElement(LoadingIndicator, null);
      } else {
        icon = React.createElement(IconInProgress, null);
        tooltip = messages.uploadsCancelButtonTooltip;
      }

      break;

    case STATUS_PENDING:
    default:
      if (isResumableUploadsEnabled) {
        icon = React.createElement(LoadingIndicator, null);
      } else {
        tooltip = messages.uploadsCancelButtonTooltip;
      }

      break;
  }

  if (status === STATUS_ERROR && code === ERROR_CODE_UPLOAD_FILE_SIZE_LIMIT_EXCEEDED && !!onUpgradeCTAClick) {
    return React.createElement(PrimaryButton, {
      onClick: onUpgradeCTAClick,
      "data-resin-target": "large_version_error_inline_upgrade_cta",
      type: "button"
    }, React.createElement(FormattedMessage, messages.uploadsFileSizeLimitExceededUpgradeMessageForUpgradeCta));
  }

  return React.createElement("div", {
    className: "bcu-item-action"
  }, tooltip ? React.createElement(Tooltip, {
    position: "top-left",
    text: intl.formatMessage(tooltip)
  }, React.createElement(PlainButton, {
    onClick: onClick,
    type: "button",
    isDisabled: status === STATUS_STAGED
  }, icon)) : icon);
};

export { ItemAction as ItemActionForTesting };
export default injectIntl(ItemAction);
//# sourceMappingURL=ItemAction.js.map