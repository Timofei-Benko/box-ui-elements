import getProp from 'lodash/get';
import { REPRESENTATIONS_RESPONSE_SUCCESS, REPRESENTATIONS_RESPONSE_VIEWABLE } from '../../constants';
export default (function (item) {
  var status = getProp(item, 'representations.entries[0].status.state');
  return status === REPRESENTATIONS_RESPONSE_SUCCESS || status === REPRESENTATIONS_RESPONSE_VIEWABLE;
});
//# sourceMappingURL=utils.js.map