/**
 * @flow
 * @file Function to render the author table cell
 * @author --
 */

import React from 'react';

import type { BoxItem } from '../../common/types/core';

// eslint-disable-next-line
export default () => ({ dataKey, rowData }: { dataKey: string, rowData: BoxItem }) => {
    const { modified_by }: BoxItem = rowData;

    return <span>{modified_by.name}</span>;
};
