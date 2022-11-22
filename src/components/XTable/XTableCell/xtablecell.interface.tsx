import { TableCellProps } from '@mui/material/TableCell';
import { Dispatch, SetStateAction } from 'react';

export type ActionField = {
    label: string;
};

export interface XTableCellProps {
    value: string | number | boolean | React.ReactNode | string[] | null;
    tableCellProps?: TableCellProps;
    sortValues?: {
        sortBy: string;
        sortOrder: 'asc' | 'desc';
    };
    currentCellKey?: string;
    setSortValues?: Dispatch<
        SetStateAction<{
            sortBy: string;
            sortOrder: 'asc' | 'desc';
        }>
    >;
}
