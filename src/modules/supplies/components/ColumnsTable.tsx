import { Supply } from '@/modules/supplies/interfaces/Supply';
import { ColumnDef } from '@tanstack/react-table';

import { useDeleteSupply } from '../hooks/useDeleteSupply';
import { ActionsTable, ButtonHeaderTable } from '@/modules/core/components';
import { formFields } from '../utils';

export let columns: ColumnDef<Supply>[] = [
  {
    accessorKey: formFields.name.name,
    header: ({ column }: any) => {
      return (
        <ButtonHeaderTable column={column} label={formFields.name.label} />
      );
    },
  },
  {
    accessorKey: formFields.brand.name,
    header: ({ column }: any) => {
      return (
        <ButtonHeaderTable column={column} label={formFields.brand.label} />
      );
    },
  },
  {
    accessorKey: formFields.unit_of_measure.name,
    header: ({ column }: any) => {
      return (
        <ButtonHeaderTable
          column={column}
          label={formFields.unit_of_measure.label}
        />
      );
    },
  },
  {
    accessorKey: formFields.observation.name,
    header: ({ column }: any) => {
      return (
        <ButtonHeaderTable
          column={column}
          label={formFields.observation.label}
        />
      );
    },
  },
];

columns.push({
  id: 'actions',
  cell: ({ row }: any) => {
    const { id } = row.original;
    const mutate = useDeleteSupply();
    return <ActionsTable mutate={mutate} id={id} />;
  },
});

export default columns;
