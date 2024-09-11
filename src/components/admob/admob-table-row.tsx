import { TableRow, TableCell, Checkbox } from '@mui/material';
import { AdMobSettingsProps } from '../../types';

interface AdMobTableRowProps {
  row: AdMobSettingsProps;
  selected: boolean;
  onSelectRow: () => void;
}

export function AdMobTableRow({ row, selected, onSelectRow }: AdMobTableRowProps) {
  return (
    <TableRow>
      <TableCell padding="checkbox">
        <Checkbox checked={selected} onChange={onSelectRow} />
      </TableCell>
      <TableCell>{row.name}</TableCell>
      <TableCell>{row.adUnitId}</TableCell>
      <TableCell>{row.adFormat}</TableCell>
      <TableCell>{row.status}</TableCell>
      <TableCell>
        {/* Add action buttons or other elements here if needed */}
      </TableCell>
    </TableRow>
  );
}
