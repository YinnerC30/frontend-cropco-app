import { ButtonHeaderTable } from '@/modules/core/components';

import { ColumnDef, HeaderContext, Row } from '@tanstack/react-table';
import { User } from '../../interfaces';
import { formFieldsUser } from '../../utils';
import { Badge } from '@/components';
import { CapitalizeFirstWord } from '@/auth';

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
  {
    accessorKey: formFieldsUser.roles.name,
    cell: ({ row }: { row: Row<User> }) => {
      const { roles, id } = row.original;
      return (
        <>
          {roles?.map((rol, index) => {
            return (
              <Badge
                key={`${rol}-${index}-${id}`}
                variant={rol == 'admin' ? 'emerald' : 'pink'}
              >
                {CapitalizeFirstWord(rol)}
              </Badge>
            );
          })}
        </>
      );
    },
    header: ({ column }: HeaderContext<User, unknown>) => {
      return (
        <ButtonHeaderTable column={column} label={formFieldsUser.roles.label} />
      );
    },
  },
  {
    accessorKey: 'is_active',
    header: ({ column }: HeaderContext<User, unknown>) => {
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
