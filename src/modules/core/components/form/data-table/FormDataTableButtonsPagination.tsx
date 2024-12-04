import { Button } from '@/components';
import {
  ChevronLeftIcon,
  ChevronRightIcon,
  DoubleArrowLeftIcon,
  DoubleArrowRightIcon,
} from '@radix-ui/react-icons';
import { useFormDataTableContext } from './FormDataTableContext';

export const FormDataTableButtonsPagination = () => {
  const { table } = useFormDataTableContext();
  return (
    <div className="flex items-center justify-center gap-2 my-4">
      <Button
        variant="outline"
        className="hidden w-8 h-8 p-0 lg:flex"
        onClick={() => table.setPageIndex(0)}
        disabled={!table.getCanPreviousPage()}
      >
        <span className="sr-only">Go to first page</span>
        <DoubleArrowLeftIcon className="w-4 h-4" />
      </Button>
      <Button
        variant="outline"
        className="w-8 h-8 p-0"
        onClick={() => table.previousPage()}
        disabled={!table.getCanPreviousPage()}
      >
        <span className="sr-only">Go to previous page</span>
        <ChevronLeftIcon className="w-4 h-4" />
      </Button>
      <Button
        variant="outline"
        className="w-8 h-8 p-0"
        onClick={() => table.nextPage()}
        disabled={!table.getCanNextPage()}
      >
        <span className="sr-only">Go to next page</span>
        <ChevronRightIcon className="w-4 h-4" />
      </Button>
      <Button
        variant="outline"
        className="hidden w-8 h-8 p-0 lg:flex"
        onClick={() => table.setPageIndex(table.getPageCount() - 1)}
        disabled={!table.getCanNextPage()}
      >
        <span className="sr-only">Go to last page</span>
        <DoubleArrowRightIcon className="w-4 h-4" />
      </Button>
    </div>
  );
};
