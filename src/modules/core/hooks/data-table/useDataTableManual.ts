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
} from "@tanstack/react-table";

import { useMemo, useState } from "react";

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
  onlySelectTheseRecords: (recordIds: string[]) => void;
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

  const getIdsToRowsSelected = (): RowData[] => {
    const data: unknown[] = table
      .getSelectedRowModel()
      .rows.map((item) => item?.original);

    return data.map((item: any) => ({ id: item?.id! })) as RowData[];
  };

  const resetSelectionRows = () => {
    setRowSelection({});
  };

  const onlySelectTheseRecords = (recordIds: string[]) => {
    table.getSelectedRowModel().rows.forEach((row) => {
      if (recordIds.includes((row.original as RowData).id)) {
        row.toggleSelected(true);
      } else {
        row.toggleSelected(false);
      }
    });
  };

  const hasSelectedRecords = table.getSelectedRowModel().rows.length > 0;

  return {
    table,
    rowSelection,
    lengthColumns: columns.length,
    getIdsToRowsSelected,
    resetSelectionRows,
    hasSelectedRecords,
    onlySelectTheseRecords,
  };
};
