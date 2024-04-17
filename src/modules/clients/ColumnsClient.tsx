import { ActionsTable } from '@/components/common/ActionsTable';
import { Client } from '@/modules/clients/Client';
import { ColumnDef } from '@tanstack/react-table';
import { useDeleteClient } from './hooks/useDeleteClient';
import { formFields } from './ElementsClientForm';
import { ButtonHeaderTable } from '@/components/table/ButtonHeaderTable';

export let columns: ColumnDef<Client>[] = [
  {
    accessorKey: formFields.first_name.name,
    header: ({ column }: any) => {
      return (
        <ButtonHeaderTable
          column={column}
          label={formFields.first_name.label}
        />
      );
    },
  },
  {
    accessorKey: formFields.last_name.name,
    header: ({ column }: any) => {
      return (
        <ButtonHeaderTable column={column} label={formFields.last_name.label} />
      );
    },
  },
  {
    accessorKey: formFields.email.name,
    header: ({ column }: any) => {
      return (
        <ButtonHeaderTable column={column} label={formFields.email.label} />
      );
    },
  },
  {
    accessorKey: formFields.cell_phone_number.name,
    header: ({ column }: any) => {
      return (
        <ButtonHeaderTable
          column={column}
          label={formFields.cell_phone_number.label}
        />
      );
    },
  },
  {
    accessorKey: formFields.address.name,
    header: ({ column }: any) => {
      return (
        <ButtonHeaderTable column={column} label={formFields.address.label} />
      );
    },
  },
];

columns.push({
  id: 'actions',
  cell: ({ row }: any) => {
    const client = row.original;
    const { id } = client;
    const { mutate } = useDeleteClient();

    return <ActionsTable mutate={mutate} id={id} />;
  },
});

export default columns;
