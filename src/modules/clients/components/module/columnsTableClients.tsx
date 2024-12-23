import { ButtonHeaderTable } from '@/modules/core/components';

import { formFieldsClient } from '../../utils';
import { ColumnDef, HeaderContext } from '@tanstack/react-table';
import { Client } from '../../interfaces/Client';

export const columnsTableClients: ColumnDef<Client>[] = [
  {
    accessorKey: formFieldsClient.first_name.name,
    header: ({ column }: HeaderContext<Client, unknown>) => {
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
    header: ({ column }: HeaderContext<Client, unknown>) => {
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
    header: ({ column }: HeaderContext<Client, unknown>) => {
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
    header: ({ column }: HeaderContext<Client, unknown>) => {
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
    header: ({ column }: HeaderContext<Client, unknown>) => {
      return (
        <ButtonHeaderTable
          column={column}
          label={formFieldsClient.address.label}
        />
      );
    },
  },
];
