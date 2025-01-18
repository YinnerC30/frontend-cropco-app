import {
  ColumnDef,
  ColumnFiltersState,
  SortingState,
  Table,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from '@tanstack/react-table';

import { useState } from 'react';

interface RowData {
  id: string;
}

interface DataTableManualProps<T> {
  columns: ColumnDef<T>[];
  rows: unknown[];
}
export interface DataTableGenericReturn<T> {
  table: Table<T> | Table<unknown>;
  rowSelection: {};
  lengthColumns: number;
  getIdsToRowsSelected: () => RowData[];
  resetSelectionRows: () => void;
  hasSelectedRecords: boolean;
  getDataOfRowsSelected: () => unknown[];
}

export const useDataTableGeneric = <T>({
  columns,
  rows = [],
}: DataTableManualProps<T>): DataTableGenericReturn<T> => {
  const [sorting, setSorting] = useState<SortingState>([]);
  const [rowSelection, setRowSelection] = useState({});
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const table = useReactTable({
    data: rows,
    columns: columns as ColumnDef<unknown>[],
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    onSortingChange: setSorting,
    getSortedRowModel: getSortedRowModel(),
    onColumnFiltersChange: setColumnFilters,
    getFilteredRowModel: getFilteredRowModel(),
    onRowSelectionChange: setRowSelection,
    state: {
      sorting,
      columnFilters,
      rowSelection,
    },
  });

  const getIdsToRowsSelected = (): RowData[] => {
    const data: unknown[] = table
      .getSelectedRowModel()
      .rows.map((item) => item?.original);

    return data.map((item: any) => ({ id: item?.id! })) as RowData[];
  };

  const getDataOfRowsSelected = (): unknown[] => {
    return table.getSelectedRowModel().rows.map((item) => item?.original);
  };

  const resetSelectionRows = () => {
    setRowSelection({});
  };

  const hasSelectedRecords = table.getSelectedRowModel().rows.length > 0;

  return {
    table,
    rowSelection,
    lengthColumns: columns.length,
    getIdsToRowsSelected,
    resetSelectionRows,
    hasSelectedRecords,
    getDataOfRowsSelected,
  };
};
