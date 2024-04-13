import { ActionsTable } from '@/components/common/ActionsTable';
import { ButtonHeaderTable } from '@/components/table/ButtonHeaderTable';
import { ColumnDef } from '@tanstack/react-table';
import { User } from '../../interfaces/User';
import { formFields } from './ElementsUserForm';
import { useDeleteUser } from './hooks/useDeleteUser';

export let columns: ColumnDef<User>[] = [
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
];

columns.push({
  id: 'actions',
  cell: ({ row }: any) => {
    const { id } = row.original;
    const { mutate } = useDeleteUser();
    return <ActionsTable mutate={mutate} id={id} />;
  },
});

export default columns;
