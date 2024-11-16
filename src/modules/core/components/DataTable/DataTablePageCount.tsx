import { useDataTableContext } from './DataTableContext';

export const DataTablePageCount = () => {
  const { pageText } = useDataTableContext();
  return (
    <div className="flex w-[100px] items-center justify-center text-sm font-medium">
      {pageText}
    </div>
  );
};
