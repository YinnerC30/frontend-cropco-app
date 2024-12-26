import {
  ColumnDef,
  PaginationState,
  SortingState,
  Table,
  VisibilityState,
  getCoreRowModel,
  getFilteredRowModel,
  getSortedRowModel,
  useReactTable,
} from '@tanstack/react-table';

import { useMemo, useState } from 'react';

export interface RowData {
  id: string;
}

interface DataTableManualProps<T> {
  columns: ColumnDef<T>[];
  pagination: PaginationState;
  setPagination: React.Dispatch<React.SetStateAction<PaginationState>>;
  rows: unknown[];
  infoPagination: {
    pageCount: number;
    rowCount: number;
  };
}
export interface DataTableManualReturn<T> {
  table: Table<T> | Table<unknown>;
  rowSelection: {};
  lengthColumns: number;
  getIdsToRowsSelected: () => RowData[];
  resetSelectionRows: () => void;
  hasSelectedRecords: boolean;
}

export const useDataTableManual = <T>({
  columns,
  infoPagination = {
    pageCount: 0,
    rowCount: 0,
  },
  rows,
  pagination,
  setPagination,
}: DataTableManualProps<T>): DataTableManualReturn<T> => {
  const defaultData = useMemo(() => [], []);

  const [sorting, setSorting] = useState<SortingState>([]);
  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({});
  const [rowSelection, setRowSelection] = useState({});
  const table = useReactTable({
    data: rows ?? defaultData,
    columns: columns as ColumnDef<unknown>[],
    pageCount: infoPagination?.pageCount ?? -1,
    rowCount: infoPagination?.rowCount,
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

  const arrayIndexRowsSelected: number[] = useMemo(
    () => Object.keys(rowSelection).map(Number),
    [rowSelection]
  );

  const getIdsToRowsSelected = (): RowData[] => {
    return arrayIndexRowsSelected
      .map((index: number) => {
        const record = table.getRowModel().rows[index]?.original as RowData;
        return record ? { id: record.id } : null;
      })
      .filter((item): item is RowData => item !== null);
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
