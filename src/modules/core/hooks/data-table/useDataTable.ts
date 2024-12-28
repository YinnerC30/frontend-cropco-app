import {
  ColumnDef,
  ColumnFiltersState,
  PaginationState,
  SortingState,
  Table,
  VisibilityState,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from '@tanstack/react-table';

import { useMemo, useState } from 'react';

interface RowData {
  id: string;
}

interface UseDataTableProps<T> {
  columns: ColumnDef<T>[]; // Definición de columnas
  data?: T[]; // Datos de la tabla (para genérico)
  pagination?: PaginationState; // Estado de paginación (para manual)
  setPagination?: React.Dispatch<React.SetStateAction<PaginationState>>; // Setter de paginación (para manual)
  infoPagination?: {
    pageCount: number;
    rowCount: number;
  }; // Información de paginación (para manual)
  enableManualPagination?: boolean;
}

export interface UseDataTableReturn<T> {
  table: Table<T> | Table<unknown>;
  rowSelection: {};
  lengthColumns: number;
  getIdsToRowsSelected: () => RowData[];
  resetSelectionRows: () => void;
  hasSelectedRecords: boolean;
}

export const useDataTable = <T>({
  columns,
  data = [],
  pagination,
  setPagination,
  infoPagination = { pageCount: 0, rowCount: 0 },
  enableManualPagination = false,
}: UseDataTableProps<T>): UseDataTableReturn<T> => {
  const [sorting, setSorting] = useState<SortingState>([]);
  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({});
  const [rowSelection, setRowSelection] = useState({});
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);

  const defaultData = useMemo(() => [], []);

  const table = useReactTable({
    data: data || defaultData,
    columns: columns as ColumnDef<unknown>[],
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getPaginationRowModel: pagination ? undefined : getPaginationRowModel(),
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    onRowSelectionChange: setRowSelection,
    onPaginationChange: setPagination,
    onColumnVisibilityChange: setColumnVisibility,
    state: {
      sorting,
      columnFilters,
      rowSelection,
      columnVisibility,
      pagination,
    },
    ...(enableManualPagination
      ? {
          manualPagination: true,
          pageCount: infoPagination?.pageCount ?? -1,
        }
      : {}),
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
