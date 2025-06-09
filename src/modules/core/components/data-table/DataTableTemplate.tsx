import { DataTable } from './DataTable';
import { DataTableButtonsPagination } from './DataTableButtonsPagination';
import { DataTableProvider } from './DataTableContext';
import { DataTablePageCount } from './DataTablePageCount';
import { DataTableRowCount } from './DataTableRowCount';
import { DataTableRowSelection } from './DataTableRowSelection';
import { DataTableSelectPageSize } from './DataTableSelectPageSize';
import { ReactNode } from 'react';

interface Props {
  table: any;
  disabledDoubleClick: boolean;
  errorMessage: string;
  lengthColumns: number;
  rowCount: number;
  isLoading?: boolean;
  children?: ReactNode;
}

export const DataTableTemplate = ({
  table,
  disabledDoubleClick,
  errorMessage,
  lengthColumns,
  rowCount,
  isLoading = false,
  children,
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
        <div className="flex justify-between my-2">
          <div className="flex flex-col gap-2">
            <DataTableRowCount />
            <DataTableRowSelection />
          </div>
          <DataTableSelectPageSize />
        </div>

        {children}

        <DataTable />
        <DataTableButtonsPagination />
        <DataTablePageCount />
      </div>
    </DataTableProvider>
  );
};
