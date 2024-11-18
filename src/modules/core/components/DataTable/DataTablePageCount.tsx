import { useDataTableContext } from './DataTableContext';

export const DataTablePageCount = () => {
  const { pageText } = useDataTableContext();
  return (
    <p className="text-sm font-medium text-center text-muted-foreground">
      {pageText}
    </p>
  );
};
