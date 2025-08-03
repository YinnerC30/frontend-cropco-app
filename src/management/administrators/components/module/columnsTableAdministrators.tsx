import { ButtonHeaderTable } from '@/modules/core/components';

import { ColumnDef, HeaderContext } from '@tanstack/react-table';

import { Badge } from '@/components';
import { Administrator } from '../../interfaces/Administrator';
import { formFieldsAdministrator } from '../../utils/formFieldsAdministrator';

export const columnsTableAdministrators: ColumnDef<Administrator>[] = [
  {
    accessorKey: formFieldsAdministrator.first_name.name,
    header: ({ column }: HeaderContext<Administrator, unknown>) => {
      return (
        <ButtonHeaderTable<Administrator>
          column={column}
          label={formFieldsAdministrator.first_name.label}
        />
      );
    },
  },
  {
    accessorKey: formFieldsAdministrator.last_name.name,
    header: ({ column }: HeaderContext<Administrator, unknown>) => {
      return (
        <ButtonHeaderTable<Administrator>
          column={column}
          label={formFieldsAdministrator.last_name.label}
        />
      );
    },
  },
  {
    accessorKey: formFieldsAdministrator.email.name,
    header: ({ column }: HeaderContext<Administrator, unknown>) => {
      return (
        <ButtonHeaderTable
          column={column}
          label={formFieldsAdministrator.email.label}
        />
      );
    },
  },
  {
    accessorKey: formFieldsAdministrator.cell_phone_number.name,
    header: ({ column }: HeaderContext<Administrator, unknown>) => {
      return (
        <ButtonHeaderTable
          column={column}
          label={formFieldsAdministrator.cell_phone_number.label}
        />
      );
    },
  },
  {
    accessorKey: 'is_active',
    header: ({ column }: HeaderContext<Administrator, unknown>) => {
      return <ButtonHeaderTable column={column} label={'Activo'} />;
    },
    cell: ({ row }) => {
      return (
        <span>
          {row.original.is_active ? (
            <Badge variant={'cyan'}>SI</Badge>
          ) : (
            <Badge variant={'red'}>NO</Badge>
          )}
        </span>
      );
    },
  },
];
