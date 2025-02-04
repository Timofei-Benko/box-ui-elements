/**
 * @flow
 * @file Item list component
 * @author Box
 */

import React from 'react';
import classNames from 'classnames';
import { injectIntl } from 'react-intl';
import type { InjectIntlProvidedProps } from 'react-intl';
import { Table, Column } from '@box/react-virtualized/dist/es/Table';
import AutoSizer from '@box/react-virtualized/dist/es/AutoSizer';
import KeyBinder from '../common/KeyBinder';
import nameCellRenderer from '../common/item/nameCellRenderer';
import iconCellRenderer from '../common/item/iconCellRenderer';
import { focus } from '../../utils/dom';
import messages from '../common/messages';
import headerCellRenderer from './headerCellRenderer';
import sizeCellRenderer from './sizeCellRenderer';
import dateCellRenderer from './dateCellRenderer';
import labelCellRenderer from './labelCellRenderer';
import authorCellRenderer from './authorCellRenderer';
import moreOptionsCellRenderer from './moreOptionsCellRenderer';
import {
    FIELD_ID,
    FIELD_NAME,
    FIELD_SIZE,
    VIEW_FOLDER,
    VIEW_RECENTS,
    FIELD_CONTENT_MODIFIED_AT,
    FIELD_CREATED_AT,
    FIELD_CREATED_BY,
} from '../../constants';
import type { View, Collection } from '../../common/types/core';
import '@box/react-virtualized/styles.css';
import './ItemList.scss';

type Props = {
    canDelete: boolean,
    canDownload: boolean,
    canPreview: boolean,
    canRename: boolean,
    canShare: boolean,
    currentCollection: Collection,
    focusedRow: number,
    isMedium: boolean,
    isSmall: boolean,
    isTouch: boolean,
    onItemClick: Function,
    onItemDelete: Function,
    onItemDownload: Function,
    onItemPreview: Function,
    onItemRename: Function,
    onItemSelect: Function,
    onItemShare: Function,
    onSortChange: Function,
    rootElement: HTMLElement,
    rootId: string,
    tableRef: Function,
    view: View,
} & InjectIntlProvidedProps;

const ItemList = ({
    view,
    isSmall,
    isMedium,
    isTouch,
    rootId,
    rootElement,
    canShare,
    canDownload,
    canDelete,
    canPreview,
    canRename,
    onItemClick,
    onItemSelect,
    onItemDelete,
    onItemDownload,
    onItemRename,
    onItemShare,
    onItemPreview,
    onSortChange,
    currentCollection,
    tableRef,
    focusedRow,
    intl,
}: Props) => {
    const nameCell = nameCellRenderer(
        rootId,
        view,
        onItemClick,
        onItemSelect,
        canPreview,
        isSmall, // shows details if false
        isTouch,
    );
    const iconCell = iconCellRenderer(16);
    // const dateCell = dateCellRenderer();
    const createdByCell = authorCellRenderer();
    const createdOnCell = dateCellRenderer('created');
    const lastUpdatedCell = dateCellRenderer('updated');
    const sizeAccessCell = sizeCellRenderer();
    const labelCell = labelCellRenderer();
    const moreOptionsCell = moreOptionsCellRenderer(
        canPreview,
        canShare,
        canDownload,
        canDelete,
        canRename,
        onItemSelect,
        onItemDelete,
        onItemDownload,
        onItemRename,
        onItemShare,
        onItemPreview,
        isSmall,
    );
    const isRecents: boolean = view === VIEW_RECENTS;
    const hasSort: boolean = view === VIEW_FOLDER;
    const { id, items = [], sortBy, sortDirection }: Collection = currentCollection;
    const rowCount: number = items.length;
    const rowClassName = ({ index }) => {
        if (index === -1) {
            return 'bce-item-header-row';
        }

        const { selected } = items[index];
        return classNames(`bce-item-row bce-item-row-${index}`, {
            'bce-item-row-selected': selected,
        });
    };

    const sort = ({ sortBy: by, sortDirection: direction }) => {
        onSortChange(by, direction);
    };

    return (
        <KeyBinder
            id={id}
            items={items}
            columnCount={1}
            rowCount={rowCount}
            className="bce-item-grid"
            onRename={onItemRename}
            onShare={onItemShare}
            onDownload={onItemDownload}
            onOpen={onItemClick}
            onSelect={onItemSelect}
            onDelete={onItemDelete}
            scrollToRow={focusedRow}
            onScrollToChange={({ scrollToRow }) => focus(rootElement, `.bce-item-row-${scrollToRow}`)}
        >
            {({ onSectionRendered, scrollToRow, focusOnRender }) => (
                <AutoSizer>
                    {({ width, height }) => (
                        <Table
                            width={width}
                            height={height}
                            headerHeight={42}
                            rowHeight={42}
                            rowCount={rowCount}
                            rowGetter={({ index }) => items[index]}
                            ref={tableRef}
                            rowClassName={rowClassName}
                            scrollToIndex={scrollToRow}
                            sort={sort}
                            sortBy={sortBy}
                            sortDirection={sortDirection}
                            onRowClick={({ rowData }) => onItemSelect(rowData)}
                            onRowsRendered={({ startIndex, stopIndex }) => {
                                onSectionRendered({
                                    rowStartIndex: startIndex,
                                    rowStopIndex: stopIndex,
                                });
                                if (focusOnRender) {
                                    focus(rootElement, `.bce-item-row-${scrollToRow}`);
                                }
                            }}
                        >
                            <Column disableSort dataKey={FIELD_ID} cellRenderer={iconCell} width={50} flexShrink={0} />
                            <Column
                                disableSort={!hasSort}
                                label={intl.formatMessage(messages.name)}
                                dataKey={FIELD_NAME}
                                cellRenderer={nameCell}
                                headerRenderer={headerCellRenderer}
                                width={300}
                                flexGrow={1}
                            />
                            {isSmall ? null : (
                                <Column
                                    className="bce-item-coloumn"
                                    disableSort={!hasSort}
                                    label="Created On"
                                    dataKey={FIELD_CREATED_AT}
                                    cellRenderer={createdOnCell}
                                    headerRenderer={headerCellRenderer}
                                    width={isRecents ? 120 : 300}
                                    flexGrow={1}
                                />
                            )}
                            {isSmall ? null : (
                                <Column
                                    className="bce-item-coloumn"
                                    disableSort={!hasSort}
                                    label={intl.formatMessage(messages.updated)}
                                    dataKey={FIELD_CONTENT_MODIFIED_AT}
                                    cellRenderer={lastUpdatedCell}
                                    headerRenderer={headerCellRenderer}
                                    width={isRecents ? 120 : 300}
                                    flexGrow={1}
                                />
                            )}
                            {isSmall || isMedium ? null : (
                                <Column
                                    className="bce-item-coloumn"
                                    disableSort={!hasSort}
                                    label={intl.formatMessage(messages.size)}
                                    dataKey={FIELD_SIZE}
                                    cellRenderer={sizeAccessCell}
                                    headerRenderer={headerCellRenderer}
                                    width={80}
                                    flexGrow={0}
                                />
                            )}
                            {isSmall || isMedium ? null : (
                                <Column
                                    className="bce-item-coloumn"
                                    label="Author"
                                    dataKey={FIELD_CREATED_BY}
                                    cellRenderer={createdByCell}
                                    headerRenderer={headerCellRenderer}
                                    width={80}
                                    flexGrow={0}
                                />
                            )}
                            {isSmall || isMedium ? null : (
                                <Column
                                    className="bce-item-coloumn"
                                    label="Label"
                                    dataKey={FIELD_SIZE}
                                    cellRenderer={labelCell}
                                    headerRenderer={headerCellRenderer}
                                    width={80}
                                    flexGrow={0}
                                />
                            )}
                            <Column
                                disableSort
                                dataKey={FIELD_ID}
                                cellRenderer={moreOptionsCell}
                                width={isSmall || !canShare ? 58 : 140}
                                flexGrow={0}
                            />
                        </Table>
                    )}
                </AutoSizer>
            )}
        </KeyBinder>
    );
};

export default injectIntl(ItemList);
