import { Checkbox } from '@/components';
import { ColumnDef, Row, Table } from '@tanstack/react-table';

export const CheckboxTableCustomClient: ColumnDef<any> = {
  id: 'select',
  header: ({ table }: { table: Table<unknown | any> }) => {
    const newRowModel: Row<any>[] = table.getRowModel().rows.filter((row) => {
      if (row.original.hasOwnProperty('deletedDate')) {
        return row.original.deletedDate === null;
      }
    });

    const isAllSelected =
      table.getSelectedRowModel().rows.length === newRowModel.length &&
      newRowModel.length !== 0;

    return (
      <Checkbox
        checked={isAllSelected}
        disabled={newRowModel.length === 0}
        onCheckedChange={(state: boolean) => {
          for (const row of newRowModel) {
            row.toggleSelected(state);
          }
        }}
        aria-label="Select all"
        className={table.getRowCount() === 0 ? 'hidden' : '-ml-[6px] mr-2'}
      />
    );
  },
  cell: ({ row }: { row: Row<any> }) => {
    const { deletedDate } = row.original;
    const isDisabled = deletedDate !== null;

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
