import React from 'react'; // import { FormattedMessage } from 'react-intl';

import Datefield from '../common/date'; // import messages from '../common/messages';
// import { FIELD_INTERACTED_AT } from '../../constants';

// eslint-disable-next-line
var Date = function Date(_ref) {
  var dataKey = _ref.dataKey,
      item = _ref.item,
      type = _ref.type;
  var _item$modified_at = item.modified_at,
      modified_at = _item$modified_at === void 0 ? '' : _item$modified_at,
      _item$created_at = item.created_at,
      created_at = _item$created_at === void 0 ? '' : _item$created_at; // const modifiedBy: string = modified_by ? modified_by.name || '' : '';
  // const isRecents: boolean = dataKey === FIELD_INTERACTED_AT;

  var date = type === 'created' ? created_at : modified_at;
  return React.createElement(Datefield, {
    capitalize: true,
    date: date,
    omitCommas: true
  }); // if (isRecents || !modifiedBy) {
  //     return DateValue;
  // }
  // return (
  //     <FormattedMessage
  //         {...messages.nameDate}
  //         values={{
  //             date: DateValue,
  //             name: modifiedBy,
  //         }}
  //     />
  // );
};

export default Date;
//# sourceMappingURL=Date.js.map