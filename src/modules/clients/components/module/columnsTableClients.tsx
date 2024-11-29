import { ButtonHeaderTable } from '@/modules/core/components';

import { formFieldsClient } from '../../utils';

export const columnsTableClients = [
  {
    accessorKey: formFieldsClient.first_name.name,
    header: ({ column }: any) => {
      return (
        <ButtonHeaderTable
          column={column}
          label={formFieldsClient.first_name.label}
        />
      );
    },
  },
  {
    accessorKey: formFieldsClient.last_name.name,
    header: ({ column }: any) => {
      return (
        <ButtonHeaderTable
          column={column}
          label={formFieldsClient.last_name.label}
        />
      );
    },
  },
  {
    accessorKey: formFieldsClient.email.name,
    header: ({ column }: any) => {
      return (
        <ButtonHeaderTable
          column={column}
          label={formFieldsClient.email.label}
        />
      );
    },
  },
  {
    accessorKey: formFieldsClient.cell_phone_number.name,
    header: ({ column }: any) => {
      return (
        <ButtonHeaderTable
          column={column}
          label={formFieldsClient.cell_phone_number.label}
        />
      );
    },
  },
  {
    accessorKey: formFieldsClient.address.name,
    header: ({ column }: any) => {
      return (
        <ButtonHeaderTable
          column={column}
          label={formFieldsClient.address.label}
        />
      );
    },
  },
];
