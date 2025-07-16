import { memo } from 'react';
import { useDataTableContext } from './DataTableContext';

export const DataTableRowSelection = memo(() => {
  const { table } = useDataTableContext();
  const count = table.getSelectedRowModel().rows.length;
  return (
    <div>
      <p className="text-sm font-medium text-muted-foreground">
        N° seleccionados:
        <span className="font-medium" data-testid='data-table-row-selection-number' aria-valuetext={count}>
          {' '}
          {count}
        </span>
      </p>
    </div>
  );
});
