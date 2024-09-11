import { TableHead, TableRow, TableCell, TableSortLabel, Checkbox } from '@mui/material';
import { AdMobSettingsProps } from '../../types';

interface AdMobTableHeadProps {
  order: 'asc' | 'desc';
  orderBy: string;
  rowCount: number;
  numSelected: number;
  onSort: (id: string) => void;
  onSelectAllRows: (checked: boolean) => void;
  headLabel: Array<{ id: keyof AdMobSettingsProps; label: string }>;
}

export function AdMobTableHead({
  order,
  orderBy,
  rowCount,
  numSelected,
  onSort,
  onSelectAllRows,
  headLabel,
}: AdMobTableHeadProps) {
  return (
    <TableHead>
      <TableRow>
        <TableCell padding="checkbox">
          <Checkbox
            checked={numSelected === rowCount}
            onChange={(event) => onSelectAllRows(event.target.checked)}
          />
        </TableCell>
        {headLabel.map((headCell) => (
          <TableCell
            key={headCell.id}
            sortDirection={orderBy === headCell.id ? order : false}
          >
            <TableSortLabel
              active={orderBy === headCell.id}
              direction={orderBy === headCell.id ? order : 'asc'}
              onClick={() => onSort(headCell.id)}
            >
              {headCell.label}
            </TableSortLabel>
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
}
