function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

import * as React from 'react';
import isEmpty from 'lodash/isEmpty';
import PropTypes from 'prop-types';
import { FormattedMessage, injectIntl } from 'react-intl';
import Link from '../../components/link/LinkBase';
import messages from './messages';
import PresenceAvatar from './PresenceAvatar';
import { determineInteractionMessage } from './utils/presenceUtils';
import './PresenceCollaborator.scss';
export var renderTimestampMessage = function renderTimestampMessage(interactedAt, interactionType, intl) {
  var lastActionMessage = determineInteractionMessage(interactionType, interactedAt);
  var timeAgo = intl.formatRelativeTime ? intl.formatRelativeTime(interactedAt - Date.now()) : intl.formatRelative(interactedAt);

  if (lastActionMessage) {
    return React.createElement(FormattedMessage, _extends({}, lastActionMessage, {
      values: {
        timeAgo: timeAgo
      }
    }));
  }

  return null;
};

var PresenceCollaborator = function PresenceCollaborator(_ref) {
  var collaborator = _ref.collaborator,
      intl = _ref.intl,
      props = _objectWithoutProperties(_ref, ["collaborator", "intl"]);

  var avatarUrl = collaborator.avatarUrl,
      id = collaborator.id,
      interactedAt = collaborator.interactedAt,
      interactionType = collaborator.interactionType,
      isActive = collaborator.isActive,
      name = collaborator.name,
      profileUrl = collaborator.profileUrl;
  return React.createElement("div", _extends({
    className: "bdl-PresenceCollaborator"
  }, props), React.createElement(PresenceAvatar, {
    avatarUrl: avatarUrl,
    id: id,
    isActive: isActive,
    isDropDownAvatar: true,
    name: name
  }), React.createElement("div", {
    className: "bdl-PresenceCollaborator-info-container"
  }, React.createElement("div", {
    className: "bdl-PresenceCollaborator-info-name"
  }, isEmpty(profileUrl) ? React.createElement("span", null, name) : React.createElement(Link, {
    href: profileUrl,
    target: "_blank"
  }, name)), React.createElement("div", {
    className: "bdl-PresenceCollaborator-info-time"
  }, isActive ? React.createElement(FormattedMessage, messages.activeNowText) : renderTimestampMessage(interactedAt, interactionType, intl))));
};

PresenceCollaborator.propTypes = {
  collaborator: PropTypes.shape({
    /** Url to avatar image. If passed in, component will render the avatar image instead of the initials */
    avatarUrl: PropTypes.string,

    /** Users id */
    id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    isActive: PropTypes.bool,

    /** Unix timestamp of when the user last interacted with the document */
    interactedAt: PropTypes.number,

    /** The type of interaction by the user */
    interactionType: PropTypes.string,

    /** User's full name */
    name: PropTypes.string.isRequired,

    /** Custom Profile URL */
    profileUrl: PropTypes.string
  }).isRequired,

  /* Intl object */
  intl: PropTypes.any
};
export { PresenceCollaborator as PresenceCollaboratorComponent };
export default injectIntl(PresenceCollaborator);
//# sourceMappingURL=PresenceCollaborator.js.map