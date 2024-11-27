import { Table } from '@tanstack/react-table';

export interface DataTablePaginationProps<TData> {
  table: Table<TData>;
  data: any;
}
