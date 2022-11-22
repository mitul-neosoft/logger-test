import React, { MouseEventHandler, Dispatch, SetStateAction } from 'react';
import { XTablePaginationProps } from './XTablePagination';

export interface ActionField {
    onClick: MouseEventHandler;
    label: string;
}

export interface XTableData {
    [key: string]:
        | string
        | number
        | boolean
        | React.ReactNode
        | string[]
        | null;
}

export interface XTableHeader {
    key: string;
    name: string;
    onClick?: MouseEventHandler<HTMLButtonElement>;
}

export interface XTableSortValues {
    sortBy: string;
    sortOrder: 'asc' | 'desc';
}

export interface XTableSort {
    setSortValues: Dispatch<
        SetStateAction<XTableSortValues>
    >;
    sortValues: XTableSortValues;
}

export interface XTableProps {
    data: XTableData[];
    isLoading?: boolean;
    headers: XTableHeader[];
    top?: string | React.ReactNode;
    pagination?: XTablePaginationProps;
    sort?: XTableSort;
}
