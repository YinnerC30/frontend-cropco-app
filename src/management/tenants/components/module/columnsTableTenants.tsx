import { ButtonHeaderTable } from '@/modules/core/components';

import { ColumnDef, HeaderContext } from '@tanstack/react-table';
import { Tenant } from '../../interfaces/Tenant';
import { formFieldsTenant } from '../../utils/formFieldsTenant';

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
];
