import { Checkbox } from '@/components';
import { ColumnDef, Row, Table } from '@tanstack/react-table';

export const CheckboxTableCustom: ColumnDef<any> = {
  id: 'select',
  header: ({ table }: { table: Table<unknown | any> }) => {
    const newRowModel: Row<any>[] = table.getRowModel().rows.filter((row) => {
      if (row.original.hasOwnProperty('deletedDate')) {
        return row.original.deletedDate === null;
      }
      if (row.original.hasOwnProperty('payment_is_pending')) {
        return row.original.payment_is_pending === true;
      }
    });

    const isAllSelected =
      table.getSelectedRowModel().rows.length === newRowModel.length;

    return (
      <Checkbox
        checked={isAllSelected}
        onCheckedChange={() => {
          for (const row of newRowModel) {
            row.toggleSelected(!isAllSelected);
          }
        }}
        aria-label="Select all"
        className={table.getRowCount() === 0 ? 'hidden' : '-ml-[6px] mr-2'}
      />
    );
  },
  cell: ({ row }: { row: Row<any> }) => {
    const { deletedDate, payment_is_pending } = row.original;
    const isDisabled = deletedDate !== null || payment_is_pending === false;

    return (
      <Checkbox
        disabled={isDisabled}
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="Select row"
      />
    );
  },

  enableSorting: false,
  enableHiding: false,
};
