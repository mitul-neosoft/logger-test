import { TableRow } from '@mui/material';
import { XTableCell } from '../XTableCell';
import { XTableRowProps } from './xtablerow.interface';

export const XTableRow = ({ row }: XTableRowProps) => {
    const { ...rowData } = row;


    if (!row) {
        return null;
    }

    return (
        <>
            <TableRow hover>
                {Object.keys(rowData).map((key, index) => (
                    <XTableCell
                        key={index}
                        value={row[key]}
                        tableCellProps={{
                            align: 'center',
                        }}
                    />
                ))}
            </TableRow>
            
        </>
    );
};
