import { ButtonHeaderTable } from '@/modules/core/components';

import { ColumnDef, HeaderContext } from '@tanstack/react-table';
import { Supplier } from '../../interfaces/Supplier';
import { formFieldsSupplier } from '../../utils/formFieldsSupplier';

export const columnsTableSuppliers: ColumnDef<Supplier>[] = [
  {
    accessorKey: formFieldsSupplier.first_name.name,
    header: ({ column }: HeaderContext<Supplier, unknown>) => {
      return (
        <ButtonHeaderTable
          column={column}
          label={formFieldsSupplier.first_name.label}
        />
      );
    },
  },
  {
    accessorKey: formFieldsSupplier.last_name.name,
    header: ({ column }: HeaderContext<Supplier, unknown>) => {
      return (
        <ButtonHeaderTable
          column={column}
          label={formFieldsSupplier.last_name.label}
        />
      );
    },
  },
  {
    accessorKey: formFieldsSupplier.email.name,
    header: ({ column }: HeaderContext<Supplier, unknown>) => {
      return (
        <ButtonHeaderTable
          column={column}
          label={formFieldsSupplier.email.label}
        />
      );
    },
  },
  {
    accessorKey: formFieldsSupplier.cell_phone_number.name,
    header: ({ column }: HeaderContext<Supplier, unknown>) => {
      return (
        <ButtonHeaderTable
          column={column}
          label={formFieldsSupplier.cell_phone_number.label}
        />
      );
    },
  },
  {
    accessorKey: formFieldsSupplier.address.name,
    header: ({ column }: HeaderContext<Supplier, unknown>) => {
      return (
        <ButtonHeaderTable
          column={column}
          label={formFieldsSupplier.address.label}
        />
      );
    },
  },
  {
    accessorKey: formFieldsSupplier.company_name.name,
    header: ({ column }: HeaderContext<Supplier, unknown>) => {
      return (
        <ButtonHeaderTable
          column={column}
          label={formFieldsSupplier.company_name.label}
        />
      );
    },
  },
];
