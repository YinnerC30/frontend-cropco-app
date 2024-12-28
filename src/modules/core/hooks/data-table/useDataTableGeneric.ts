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

  const arrayIndexRowsSelected: number[] =
    Object.keys(rowSelection).map(Number);

  const getIdsToRowsSelected = (): RowData[] => {
    return arrayIndexRowsSelected
      .map((index: number) => {
        const record = table.getRowModel().rows[index]?.original as RowData;
        return record ? { id: record.id } : null;
      })
      .filter((item: any): item is RowData => item !== null);
  };

  const resetSelectionRows = () => {
    setRowSelection({});
  };

  const hasSelectedRecords = getIdsToRowsSelected().length > 0;

  return {
    table,
    rowSelection,
    lengthColumns: columns.length,
    getIdsToRowsSelected,
    resetSelectionRows,
    hasSelectedRecords,
  };
};
