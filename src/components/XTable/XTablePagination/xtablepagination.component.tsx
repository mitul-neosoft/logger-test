import { TablePagination } from '@mui/material';
import { XTablePaginationProps } from './xtablepagination.interface';

export const XTablePagination = ({
    pages,
    setPages,
    count,
}: XTablePaginationProps) => {
    return (
        <TablePagination
            component="div"
            page={pages.page || 0}
            count={count}
            rowsPerPage={pages.rowsPerPage || 10}
            rowsPerPageOptions={[10]}
            onPageChange={(e: any, page: number) => {
                setPages((prev) => {
                    return {
                        ...prev,
                        page,
                    };
                });
            }}
            onRowsPerPageChange={(e) => {
                setPages((prev) => {
                    return {
                        ...prev,
                        page: 0,
                        rowsPerPage: Number(e.target.value),
                    };
                });
            }}
        />
    );
};
