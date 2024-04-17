import { ActionsTable } from '@/components/common/ActionsTable';
import { ButtonHeaderTable } from '@/components/table/ButtonHeaderTable';
import { Crop } from '@/modules/crops/Crop';
import { ColumnDef } from '@tanstack/react-table';
import { formFields } from './ElementsCropForm';
import { useDeleteCrop } from './hooks/useDeleteCrop';

export let columns: ColumnDef<Crop>[] = [
  {
    accessorKey: formFields.name.name,
    header: ({ column }: any) => {
      return (
        <ButtonHeaderTable column={column} label={formFields.name.label} />
      );
    },
  },
  {
    accessorKey: formFields.description.name,
    header: ({ column }: any) => {
      return (
        <ButtonHeaderTable
          column={column}
          label={formFields.description.label}
        />
      );
    },
  },
  {
    accessorKey: formFields.units.name,
    header: ({ column }: any) => {
      return (
        <ButtonHeaderTable column={column} label={formFields.units.label} />
      );
    },
  },
  {
    accessorKey: formFields.location.name,
    header: ({ column }: any) => {
      return (
        <ButtonHeaderTable column={column} label={formFields.location.label} />
      );
    },
  },
  {
    accessorKey: formFields.date_of_creation.name,
    header: ({ column }: any) => {
      return (
        <ButtonHeaderTable
          column={column}
          label={formFields.date_of_creation.label}
        />
      );
    },
  },
  {
    accessorKey: formFields.date_of_termination.name,
    header: ({ column }: any) => {
      return (
        <ButtonHeaderTable
          column={column}
          label={formFields.date_of_termination.label}
        />
      );
    },
  },
];

columns.push({
  id: 'actions',
  cell: ({ row }: any) => {
    const { id } = row.original;
    const { mutate } = useDeleteCrop();
    return <ActionsTable mutate={mutate} id={id} />;
  },
});

export default columns;
