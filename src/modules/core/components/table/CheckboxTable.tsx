import { Checkbox } from '@/components';

export const CheckboxTable = {
  id: 'select',
  // header: ({ table }: { table: Table<unknown> }) => {
  //   // console.log(table.get)
  //   return (
  //     <Checkbox
  //       checked={
  //         table.getIsAllPageRowsSelected() ||
  //         (table.getIsSomePageRowsSelected() && 'indeterminate')
  //       }
  //       onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
  //       aria-label="Select all"
  //       className="-ml-[6px] mr-2"
  //     />
  //   );
  // },
  cell: ({ row }: any) => {
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
