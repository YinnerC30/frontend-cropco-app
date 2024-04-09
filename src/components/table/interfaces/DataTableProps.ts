import { ColumnDef } from '@tanstack/react-table';

export interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  rows: TData[];
  data: any;
  pagination: any;
  setPagination: any;
}
export interface DataTableDynamicProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
}
