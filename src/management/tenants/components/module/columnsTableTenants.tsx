import { ButtonHeaderTable } from '@/modules/core/components';

import { ColumnDef, HeaderContext } from '@tanstack/react-table';
import { Tenant } from '../../interfaces/Tenant';
import { formFieldsTenant } from '../../utils/formFieldsTenant';
import { Badge } from '@/components';

export const columnsTableTenants: ColumnDef<Tenant>[] = [
  {
    accessorKey: formFieldsTenant.subdomain.name,
    header: ({ column }: HeaderContext<Tenant, unknown>) => {
      return (
        <ButtonHeaderTable
          column={column}
          label={formFieldsTenant.subdomain.label}
        />
      );
    },
  },
  {
    accessorKey: formFieldsTenant.company_name.name,
    header: ({ column }: HeaderContext<Tenant, unknown>) => {
      return (
        <ButtonHeaderTable
          column={column}
          label={formFieldsTenant.company_name.label}
        />
      );
    },
  },

  {
    accessorKey: formFieldsTenant.email.name,
    header: ({ column }: HeaderContext<Tenant, unknown>) => {
      return (
        <ButtonHeaderTable
          column={column}
          label={formFieldsTenant.email.label}
        />
      );
    },
  },
  {
    accessorKey: formFieldsTenant.cell_phone_number.name,
    header: ({ column }: HeaderContext<Tenant, unknown>) => {
      return (
        <ButtonHeaderTable
          column={column}
          label={formFieldsTenant.cell_phone_number.label}
        />
      );
    },
  },
  {
    accessorKey: 'is_active',
    header: ({ column }: HeaderContext<Tenant, unknown>) => {
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
  // {
  //   accessorKey: 'databases',
  //   cell: ({ row }) => {
  //     const array: any[] = row.getValue('databases') ?? [];
  //     const result = array[0].is_migrated;
  //     return !result ? (
  //       <Badge variant={'red'}>SI</Badge>
  //     ) : (
  //       <Badge variant={'indigo'}>NO</Badge>
  //     );
  //   },
  //   header: ({ column }: HeaderContext<Tenant, unknown>) => {
  //     return (
  //       <ButtonHeaderTable column={column} label={'¿Pendiente de migración?'} />
  //     );
  //   },
  // },
];
