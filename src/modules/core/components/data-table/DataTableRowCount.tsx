import { memo } from 'react';
import { useDataTableContext } from './DataTableContext';

export const DataTableRowCount = memo(() => {
  const { rowCount } = useDataTableContext();
  return (
    <p className="text-sm font-medium text-muted-foreground">
      {'Total: '}
      <span data-testid='data-table-row-total'>{rowCount}</span>
    </p>
  );
});
