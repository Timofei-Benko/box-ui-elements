// @flow
import React from 'react';
// import { FormattedMessage } from 'react-intl';
import Datefield from '../common/date';
// import messages from '../common/messages';
// import { FIELD_INTERACTED_AT } from '../../constants';
import type {BoxItem} from '../../common/types/core';

type Props = {
    dataKey: string,
    item: BoxItem,
    type: 'created' | 'updated',
};

// eslint-disable-next-line
const Date = ({ dataKey, item, type }: Props) => {
    const { modified_at = '', created_at = '' }: BoxItem = item;
    // const modifiedBy: string = modified_by ? modified_by.name || '' : '';
    // const isRecents: boolean = dataKey === FIELD_INTERACTED_AT;
    const date: string = type === 'created' ? created_at : modified_at;
    return <Datefield capitalize date={date} omitCommas />;

    // if (isRecents || !modifiedBy) {
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
