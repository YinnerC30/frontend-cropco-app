// path: /components/DataTableComponents/DataTablePagination.tsx
import { Button } from '@/components/ui/button';
import {
  ChevronLeftIcon,
  ChevronRightIcon,
  DoubleArrowLeftIcon,
  DoubleArrowRightIcon,
} from '@radix-ui/react-icons';
import { useDataTableContext } from './DataTableContext';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components';

const DataTableSelectPageSize = ({ table }: any) => {
  return (
    <div className="flex items-center space-x-2">
      <p className="text-sm font-medium">Filas por página</p>
      <Select
        value={`${table.getState().pagination.pageSize}`}
        onValueChange={(value) => {
          table.setPageSize(Number(value));
        }}
      >
        <SelectTrigger className="h-8 w-[70px]">
          <SelectValue placeholder={table.getState().pagination.pageSize} />
        </SelectTrigger>
        <SelectContent side="top">
          {[10, 20, 30, 40, 50].map((pageSize) => (
            <SelectItem key={pageSize} value={`${pageSize}`}>
              {pageSize}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
};
const DataTableButtonsPagination = ({ table, pageCount }: any) => {
  return (
    <div className="flex items-center justify-center gap-4">
      <Button
        variant="outline"
        className="hidden w-8 h-8 p-0 lg:flex"
        onClick={() => table.setPageIndex(0)}
        disabled={!table.getCanPreviousPage()}
      >
        <DoubleArrowLeftIcon className="w-4 h-4" />
      </Button>
      <Button
        variant="outline"
        className="w-8 h-8 p-0"
        onClick={() => table.previousPage()}
        disabled={!table.getCanPreviousPage()}
      >
        <ChevronLeftIcon className="w-4 h-4" />
      </Button>
      <Button
        variant="outline"
        className="w-8 h-8 p-0"
        onClick={() => table.nextPage()}
        disabled={!table.getCanNextPage()}
      >
        <ChevronRightIcon className="w-4 h-4" />
      </Button>
      <Button
        variant="outline"
        className="hidden w-8 h-8 p-0 lg:flex"
        onClick={() => table.setPageIndex(pageCount - 1)}
        disabled={!table.getCanNextPage()}
      >
        <DoubleArrowRightIcon className="w-4 h-4" />
      </Button>
    </div>
  );
};
const DataTablePageText = ({ pageText }: any) => {
  return (
    <div className="flex w-[100px] items-center justify-center text-sm font-medium">
      {pageText}
    </div>
  );
};

const DataTableRowCount = ({ rowCount }: any) => {
  return (
    <div>
      <p className="text-sm font-medium">Total: {rowCount}</p>
    </div>
  );
};

export const DataTablePagination = () => {
  const { table, pageText, rowCount } = useDataTableContext();
  const pageCount = table.getPageCount();

  return (
    <div className="flex items-center justify-center gap-4 mt-4">
      <DataTableSelectPageSize table={table} />
      <DataTablePageText pageText={pageText} />
      <DataTableButtonsPagination table={table} pageCount={pageCount} />
      <DataTableRowCount rowCount={rowCount} />
    </div>
  );
};
