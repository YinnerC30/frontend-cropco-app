import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components';
import { useDataTableContext } from './DataTableContext';
import { memo } from 'react';

export const DataTableSelectPageSize = memo(() => {
  const { table } = useDataTableContext();
  return (
    <div className="flex items-center space-x-2">
      <p className="text-sm font-medium text-muted-foreground">N° registros:</p>
      <Select
        value={`${table.getState().pagination.pageSize}`}
        onValueChange={(value) => {
          table.setPageSize(Number(value));
        }}
      >
        <SelectTrigger
          className="h-8 w-[70px]"
          data-testid="btn-page-size-selector"
        >
          <SelectValue
            className="font-medium text-muted-foreground"
            placeholder={table.getState().pagination.pageSize}
            data-testid="page-size-value"
          />
        </SelectTrigger>
        <SelectContent
          side="top"
          onPointerDownOutside={(e) => e.preventDefault()}
        >
          {[10, 20, 30, 40, 50].map((pageSize) => (
            <SelectItem
              key={pageSize}
              value={`${pageSize}`}
              data-testid={`select-item-page-size-${pageSize}`}
            >
              {pageSize}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
});
