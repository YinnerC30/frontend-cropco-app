import { memo } from 'react';
import { useDataTableContext } from './DataTableContext';

export const DataTablePageCount = memo(() => {
  const { pageText } = useDataTableContext();
  return (
    <p className="text-sm font-medium text-center text-muted-foreground">
      {pageText}
    </p>
  );
});
