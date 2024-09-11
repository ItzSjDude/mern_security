import React, { useState, useCallback } from 'react';
import {
  Box,
  Card,
  Table,
  Button,
  TableBody,
  Typography,
  TableContainer,
  TablePagination,
  TableHead,
  TableCell,
  TableRow,
  TableSortLabel,
  Divider,
  IconButton,
  InputBase,
  Paper,
} from '@mui/material';
import { DashboardContent } from 'src/layouts/dashboard';
import { Iconify } from 'src/components/iconify';
import { Scrollbar } from 'src/components/scrollbar';
import { TableNoData } from '../table-no-data';
import { TableEmptyRows } from '../table-empty-rows';

// Mock data for AdMob configurations
const _adConfigs = [
  { id: '1', name: 'Banner Ad 1', type: 'Banner', unitId: 'ca-app-pub-xxx/yyy1', status: 'Active' },
  { id: '2', name: 'Interstitial Ad 1', type: 'Interstitial', unitId: 'ca-app-pub-xxx/yyy2', status: 'Inactive' },
  { id: '3', name: 'Rewarded Ad 1', type: 'Rewarded', unitId: 'ca-app-pub-xxx/yyy3', status: 'Active' },
];

type AdConfigProps = {
  id: string;
  name: string;
  type: string;
  unitId: string;
  status: string;
};

type Order = 'asc' | 'desc';

const AdConfigTableHead = ({ order, orderBy, onSort }: { order: Order; orderBy: keyof AdConfigProps; onSort: (id: keyof AdConfigProps) => void }) => (
  <TableHead>
    <TableRow>
      <TableCell sortDirection={orderBy === 'name' ? order : false}>
        <TableSortLabel
          active={orderBy === 'name'}
          direction={orderBy === 'name' ? order : 'asc'}
          onClick={() => onSort('name')}
        >
          Name
        </TableSortLabel>
      </TableCell>
      <TableCell sortDirection={orderBy === 'type' ? order : false}>
        <TableSortLabel
          active={orderBy === 'type'}
          direction={orderBy === 'type' ? order : 'asc'}
          onClick={() => onSort('type')}
        >
          Type
        </TableSortLabel>
      </TableCell>
      <TableCell sortDirection={orderBy === 'unitId' ? order : false}>
        <TableSortLabel
          active={orderBy === 'unitId'}
          direction={orderBy === 'unitId' ? order : 'asc'}
          onClick={() => onSort('unitId')}
        >
          Unit ID
        </TableSortLabel>
      </TableCell>
      <TableCell sortDirection={orderBy === 'status' ? order : false}>
        <TableSortLabel
          active={orderBy === 'status'}
          direction={orderBy === 'status' ? order : 'asc'}
          onClick={() => onSort('status')}
        >
          Status
        </TableSortLabel>
      </TableCell>
      <TableCell>Actions</TableCell>
    </TableRow>
  </TableHead>
);

const AdConfigTableRow = ({ row, onEdit, onDelete }: { row: AdConfigProps; onEdit: (row: AdConfigProps) => void; onDelete: (id: string) => void }) => (
  <TableRow>
    <TableCell>{row.name}</TableCell>
    <TableCell>{row.type}</TableCell>
    <TableCell>{row.unitId}</TableCell>
    <TableCell>{row.status}</TableCell>
    <TableCell>
      <IconButton color="primary" onClick={() => onEdit(row)}>
        <Iconify icon="mdi:pencil" />
      </IconButton>
      <IconButton color="error" onClick={() => onDelete(row.id)}>
        <Iconify icon="mdi:delete" />
      </IconButton>
    </TableCell>
  </TableRow>
);

const AdConfigTableToolbar = ({ filterName, onFilterName }: { filterName: string; onFilterName: (event: React.ChangeEvent<HTMLInputElement>) => void }) => (
  <Box sx={{ p: 2, display: 'flex', alignItems: 'center', gap: 2 }}>
    <Paper component="form" sx={{ display: 'flex', alignItems: 'center', width: '100%', p: '2px 4px', borderRadius: 1 }}>
      <InputBase
        sx={{ ml: 1, flex: 1 }}
        placeholder="Search ad configurations..."
        value={filterName}
        onChange={onFilterName}
      />
      <IconButton type="button" sx={{ p: '10px' }}>
        <Iconify icon="mdi:magnify" />
      </IconButton>
    </Paper>
  </Box>
);

// Utility functions
const descendingComparator = <T extends Record<string, any>>(a: T, b: T, orderBy: keyof T): number => {
  if (b[orderBy] < a[orderBy]) return -1;
  if (b[orderBy] > a[orderBy]) return 1;
  return 0;
};

const getComparator = <T extends Record<string, any>>(order: Order, orderBy: keyof T): ((a: T, b: T) => number) => {
  return order === 'desc'
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
};

const applyFilter = ({
  inputData,
  comparator,
  filterName,
}: {
  inputData: AdConfigProps[];
  comparator: (a: AdConfigProps, b: AdConfigProps) => number;
  filterName: string;
}): AdConfigProps[] => {
  const stabilizedThis = inputData.map((el, index) => [el, index] as [AdConfigProps, number]);

  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) return order;
    return a[1] - b[1];
  });

  if (filterName) {
    return stabilizedThis
      .filter(([adConfig]) => adConfig.name.toLowerCase().indexOf(filterName.toLowerCase()) !== -1)
      .map(([adConfig]) => adConfig);
  }

  return stabilizedThis.map(([adConfig]) => adConfig);
};

const emptyRows = (page: number, rowsPerPage: number, arrayLength: number): number => {
  return page > 0 ? Math.max(0, (1 + page) * rowsPerPage - arrayLength) : 0;
};

export function AdMobConfigView() {
  const [page, setPage] = useState(0);
  const [orderBy, setOrderBy] = useState<keyof AdConfigProps>('name');
  const [order, setOrder] = useState<Order>('asc');
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [filterName, setFilterName] = useState('');

  const handleSort = useCallback(
    (id: keyof AdConfigProps) => {
      const isAsc = orderBy === id && order === 'asc';
      setOrder(isAsc ? 'desc' : 'asc');
      setOrderBy(id);
    },
    [order, orderBy]
  );

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleFilterName = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFilterName(event.target.value);
    setPage(0);
  };

  const dataFiltered = applyFilter({
    inputData: _adConfigs,
    comparator: getComparator(order, orderBy),
    filterName,
  });

  const handleEdit = (row: AdConfigProps) => {
    // Implement edit functionality
    console.log('Edit', row);
  };

  const handleDelete = (id: string) => {
    // Implement delete functionality
    console.log('Delete', id);
  };

  const notFound = !dataFiltered.length && !!filterName;

  return (
    <DashboardContent>
      <Box display="flex" flexDirection="column" gap={2} mb={5}>
        <Box display="flex" alignItems="center" justifyContent="space-between">
          <Typography variant="h4">AdMob Configurations</Typography>
          <Button
            variant="contained"
            color="primary"
            startIcon={<Iconify icon="mingcute:add-line" />}
          >
            New Ad Config
          </Button>
        </Box>
        <Divider />
        <Card>
          <AdConfigTableToolbar
            filterName={filterName}
            onFilterName={handleFilterName}
          />
          <Scrollbar>
            <TableContainer sx={{ overflow: 'unset' }}>
              <Table sx={{ minWidth: 800 }}>
                <AdConfigTableHead
                  order={order}
                  orderBy={orderBy}
                  onSort={handleSort}
                />
                <TableBody>
                  {dataFiltered
                    .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                    .map((row) => (
                      <AdConfigTableRow
                        key={row.id}
                        row={row}
                        onEdit={handleEdit}
                        onDelete={handleDelete}
                      />
                    ))}

                  <TableEmptyRows
                    height={68}
                    emptyRows={emptyRows(page, rowsPerPage, _adConfigs.length)}
                  />

                  {notFound && <TableNoData searchQuery={filterName} />}
                </TableBody>
              </Table>
            </TableContainer>
          </Scrollbar>

          <TablePagination
            component="div"
            page={page}
            count={_adConfigs.length}
            rowsPerPage={rowsPerPage}
            onPageChange={handleChangePage}
            rowsPerPageOptions={[5, 10, 25]}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
        </Card>
      </Box>
    </DashboardContent>
  );
}

