import { Button } from '@/components';
import { useDataTableContext } from './DataTableContext';
import {
  DoubleArrowLeftIcon,
  DoubleArrowRightIcon,
} from '@radix-ui/react-icons';
import { ChevronLeftIcon, ChevronRightIcon } from 'lucide-react';
import { memo } from 'react';

export const DataTableButtonsPagination = memo(() => {
  const { table } = useDataTableContext();
  return (
    <div className="flex justify-center gap-4 my-2">
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
        onClick={() => table.setPageIndex(table.getPageCount() - 1)}
        disabled={!table.getCanNextPage()}
      >
        <DoubleArrowRightIcon className="w-4 h-4" />
      </Button>
    </div>
  );
});
