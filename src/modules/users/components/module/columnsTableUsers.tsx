import { ButtonHeaderTable } from '@/modules/core/components';

import { formFieldsUser } from '../../utils';

export const columnsTableUsers = [
  {
    accessorKey: formFieldsUser.first_name.name,
    header: ({ column }: any) => {
      return (
        <ButtonHeaderTable
          column={column}
          label={formFieldsUser.first_name.label}
        />
      );
    },
  },
  {
    accessorKey: formFieldsUser.last_name.name,
    header: ({ column }: any) => {
      return (
        <ButtonHeaderTable
          column={column}
          label={formFieldsUser.last_name.label}
        />
      );
    },
  },
  {
    accessorKey: formFieldsUser.email.name,
    header: ({ column }: any) => {
      return (
        <ButtonHeaderTable column={column} label={formFieldsUser.email.label} />
      );
    },
  },
  {
    accessorKey: formFieldsUser.cell_phone_number.name,
    header: ({ column }: any) => {
      return (
        <ButtonHeaderTable
          column={column}
          label={formFieldsUser.cell_phone_number.label}
        />
      );
    },
  },
];
