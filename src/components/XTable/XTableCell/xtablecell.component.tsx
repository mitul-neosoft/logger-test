import { TableCell, TableSortLabel } from '@mui/material';
import { XTableCellProps } from './xtablecell.interface';

export const XTableCell = ({ value, tableCellProps, sortValues, currentCellKey, setSortValues }: XTableCellProps) => {
    const transformValue = () => {
        if (typeof value === 'string' || typeof value === 'number') {
            return value;
        }
        if (value == null) {
            return '';
        }
    };
    return (
        <>
            {sortValues && setSortValues ?
                <TableCell {...tableCellProps} >
                    <TableSortLabel
                        active={sortValues.sortBy === currentCellKey}
                        direction={sortValues.sortBy === currentCellKey ? sortValues.sortOrder : "asc"}
                        onClick={() => { 
                            setSortValues({
                                sortBy: currentCellKey || "",
                                sortOrder: sortValues.sortBy === currentCellKey && sortValues.sortOrder === "asc" ? "desc" : "asc"
                            })
                         }}
                    >
                        {transformValue()}
                    </TableSortLabel>
                </TableCell> :
                <TableCell {...tableCellProps} >
                    {transformValue()}
                </TableCell>
            }
        </>
    );
};
