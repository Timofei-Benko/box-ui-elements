/**
 * @flow
 * @file Function to render the date table cells
 * @author Box
 */

import React from 'react';
import Date from './Date';
import type { BoxItem } from '../../common/types/core';

export default (type: 'created' | 'updated') => ({ dataKey, rowData }: { dataKey: string, rowData: BoxItem }) => (
    <Date dataKey={dataKey} item={rowData} type={type} />
);
