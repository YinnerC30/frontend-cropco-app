import { ButtonHeaderTable } from '@/modules/core/components';

import { ColumnDef, HeaderContext } from '@tanstack/react-table';
import { User } from '../../interfaces';
import { formFieldsUser } from '../../utils';

export const columnsTableUsers: ColumnDef<User>[] = [
  {
    accessorKey: formFieldsUser.first_name.name,
    header: ({ column }: HeaderContext<User, unknown>) => {
      return (
        <ButtonHeaderTable<User>
          column={column}
          label={formFieldsUser.first_name.label}
        />
      );
    },
  },
  {
    accessorKey: formFieldsUser.last_name.name,
    header: ({ column }: HeaderContext<User, unknown>) => {
      return (
        <ButtonHeaderTable<User>
          column={column}
          label={formFieldsUser.last_name.label}
        />
      );
    },
  },
  {
    accessorKey: formFieldsUser.email.name,
    header: ({ column }: HeaderContext<User, unknown>) => {
      return (
        <ButtonHeaderTable column={column} label={formFieldsUser.email.label} />
      );
    },
  },
  {
    accessorKey: formFieldsUser.cell_phone_number.name,
    header: ({ column }: HeaderContext<User, unknown>) => {
      return (
        <ButtonHeaderTable
          column={column}
          label={formFieldsUser.cell_phone_number.label}
        />
      );
    },
  },
];
