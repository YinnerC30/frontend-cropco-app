import { ActionsTable } from '@/components/common/ActionsTable';
import { ButtonHeaderTable } from '@/components/table/ButtonHeaderTable';
import { Supplier } from '@/interfaces/Supplier';
import { ColumnDef } from '@tanstack/react-table';
import { formFields } from './ElementsSupplierForm';
import { useDeleteSupplier } from './hooks/useDeleteSupplier';

export let columns: ColumnDef<Supplier>[] = [
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
  {
    accessorKey: formFields.company_name.name,
    header: ({ column }: any) => {
      return (
        <ButtonHeaderTable
          column={column}
          label={formFields.company_name.label}
        />
      );
    },
  },
];

columns.push({
  id: 'actions',
  cell: ({ row }: any) => {
    const { id } = row.original;

    const { mutate } = useDeleteSupplier();

    return <ActionsTable mutate={mutate} id={id} />;
  },
});

export default columns;
