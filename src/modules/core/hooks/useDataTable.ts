import { User } from '@/modules/users/interfaces/User';
import {
  SortingState,
  VisibilityState,
  getCoreRowModel,
  getFilteredRowModel,
  getSortedRowModel,
  useReactTable,
} from '@tanstack/react-table';

import { useMemo, useState } from 'react';

export const useDataTable = ({
  columns,
  data,
  rows,
  pagination,
  setPagination,
}: any) => {
  const defaultData = useMemo(() => [], []);

  const [sorting, setSorting] = useState<SortingState>([]);
  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({});
  const [rowSelection, setRowSelection] = useState({});
  const table = useReactTable({
    data: rows ?? defaultData,
    columns,
    pageCount: data?.pageCount ?? -1,
    rowCount: data?.rowCount,
    getCoreRowModel: getCoreRowModel(),
    onPaginationChange: setPagination,
    onSortingChange: setSorting,
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onColumnVisibilityChange: setColumnVisibility,
    onRowSelectionChange: setRowSelection,
    state: {
      sorting,
      columnVisibility,
      rowSelection,
      pagination,
    },
    manualPagination: true,
  });

  const arrayIndexRowsSelected: number[] =
    Object.keys(rowSelection).map(Number);

  const getIdsToRowsSelected = (): any => {
    return arrayIndexRowsSelected.map((index: number) => {
      const { rows } = table.getRowModel();
      const user: any = rows[index].original;
      return { id: user.id };
    });
  };

  const resetSelectionRows = () => {
    setRowSelection({});
  }

  return {
    table,
    rowSelection,
    lengthColumns: columns.length,
    getIdsToRowsSelected,
    resetSelectionRows
  };
};
