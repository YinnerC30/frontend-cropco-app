import { Checkbox } from '@/components';
import { ColumnDef, Row, Table } from '@tanstack/react-table';

export const CheckboxTable: ColumnDef<any> = {
  id: 'select',
  header: ({ table }: { table: Table<unknown> }) => {
    return (
      <Checkbox
        checked={
          table.getIsAllPageRowsSelected() ||
          (table.getIsSomePageRowsSelected() && 'indeterminate')
        }
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Select all"
        className="-ml-[6px] mr-2"
      />
    );
  },
  cell: ({ row }: { row: Row<any> }) => {
    return (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => {
          row.toggleSelected(!!value);
        }}
        aria-label="Select row"
      />
    );
  },

  enableSorting: false,
  enableHiding: false,
};
