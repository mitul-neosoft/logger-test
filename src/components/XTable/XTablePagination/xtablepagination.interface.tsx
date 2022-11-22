import { Dispatch, SetStateAction } from 'react';

export interface XTablePaginationProps {
    count: number;
    setPages: Dispatch<
        SetStateAction<{
            page: number;
            rowsPerPage: number;
        }>
    >;
    pages: {
        page: number;
        rowsPerPage: number;
    };
}
