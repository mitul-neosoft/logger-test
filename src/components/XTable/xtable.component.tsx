import {
    Paper,
    Table,
    TableBody,
    TableContainer,
    TableHead,
    TableRow,
} from '@mui/material';
import { XTableData, XTableHeader, XTableProps } from './xtable.interface';
import { XTableRow } from './XTableRow';
import { XTableCell } from './XTableCell';
import { XTablePagination } from './XTablePagination';

const prepareTableData = (data: XTableData[], headers: XTableHeader[]) => {
    const resp = data.map((item) => {
        const newField: XTableData = {};

        headers.map(({ key }) => {
            newField[key] = item[key];
        });
        return newField;
    });
    return resp;
};

export const XTable = ({ data, headers, top, pagination, sort }: XTableProps) => {
    const page = pagination?.pages.page || 0;
    const rowsPerPage = pagination?.pages.rowsPerPage || 10;
    return (
        <>
            <Paper
                sx={{
                    paddingBottom: '2rem',
                    paddingTop: '2rem',
                    paddingLeft: '1rem',
                    paddingRight: '1rem',
                }}
            >
                {top}
                <TableContainer>
                    <Table>
                        <TableHead>
                            <TableRow>
                                {headers.map((header, index) => (
                                    <XTableCell
                                        key={index}
                                        value={header.name}
                                        tableCellProps={{
                                            align: 'center',
                                        }}
                                        sortValues={sort?.sortValues}
                                        setSortValues={sort?.setSortValues}
                                        currentCellKey={header.key} 
                                    ></XTableCell>
                                ))}
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {prepareTableData(data, headers).slice(page * rowsPerPage, (page + 1) * rowsPerPage).map(
                                (row, index) => (
                                    <XTableRow row={row} key={index} />
                                )
                            )}
                        </TableBody>
                    </Table>
                </TableContainer>
                {pagination && (
                    <XTablePagination {...pagination}></XTablePagination>
                )}
            </Paper>
        </>
    );
};
