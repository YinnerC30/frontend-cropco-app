import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuCheckboxItem,
} from '@radix-ui/react-dropdown-menu';

import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Table } from '@tanstack/react-table';

interface DataTablePaginationProps<TData> {
  table: Table<TData>;
  nameColumn: string;
  nameColumnHeader?: string;
}

export function FilterByColumn<TData>({
  table,
  nameColumn,
  nameColumnHeader,
}: DataTablePaginationProps<TData>) {
  return (
    <div className="flex items-center py-4">
      <Input
        placeholder={`Filtrando por ${nameColumnHeader || nameColumn}`}
        value={(table.getColumn(nameColumn)?.getFilterValue() as string) ?? ''}
        onChange={event =>
          table.getColumn(nameColumn)?.setFilterValue(event.target.value)
        }
        className="max-w-sm"
      />
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="outline" className="ml-auto">
            Columns
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          {table
            .getAllColumns()
            .filter(column => column.getCanHide())
            .map(column => {
              return (
                <DropdownMenuCheckboxItem
                  key={column.id}
                  className="capitalize"
                  checked={column.getIsVisible()}
                  onCheckedChange={value => column.toggleVisibility(!!value)}
                >
                  {column.id}
                </DropdownMenuCheckboxItem>
              );
            })}
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}
