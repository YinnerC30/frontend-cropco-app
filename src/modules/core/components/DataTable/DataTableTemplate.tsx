import { DataTable } from './DataTable';
import { DataTableProvider } from './DataTableContext';
import { DataTablePagination } from './DataTablePagination';
import { DataTableRowSelection } from './DataTableRowSelection';

interface Props {
  table: any;
  disabledDoubleClick: boolean;
  errorMessage: string;
  lengthColumns: number;
  rowCount: number;
  isLoading?: boolean;
}

export const DataTableTemplate = ({
  table,
  disabledDoubleClick,
  errorMessage,
  lengthColumns,
  rowCount,
  isLoading = false,
}: Props) => {
  return (
    <DataTableProvider
      table={table}
      disabledDoubleClick={disabledDoubleClick}
      errorMessage={errorMessage}
      lengthColumns={lengthColumns}
      rowCount={rowCount}
      isLoading={isLoading}
    >
      <div className="flex flex-col w-full my-1">
        <DataTable />
        <DataTableRowSelection/>
        <DataTablePagination />
      </div>
    </DataTableProvider>
  );
};
