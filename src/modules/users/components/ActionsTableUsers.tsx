import { ActionsTable } from '@/modules/core/components/table/ActionsTable';

import { useDeleteUser } from '../hooks/useDeleteUser';

import { useAuthorization } from '@/modules/authentication/hooks/useAuthorization';
import { ItemCopyIdRecord } from '@/modules/core/components/table/actions/ItemCopyIdRecord';
import { ItemDeleteRecord } from '@/modules/core/components/table/actions/ItemDeleteRecord';
import { ItemModifyRecord } from '@/modules/core/components/table/actions/ItemModifyRecord';
import { ItemViewRecord } from '@/modules/core/components/table/actions/ItemViewRecord';
import { useState } from 'react';

interface Props {
  row: any;
}

export const ActionsTableUsers = ({ row }: Props) => {
  const { hasPermission } = useAuthorization();
  const { id } = row.original;
  const { mutate } = useDeleteUser();
  const [openDropDownMenu, setOpenDropDownMenu] = useState(false);

  const handleDelete = () => {
    mutate(id);
  };

  return (
    <>
      <ActionsTable open={openDropDownMenu} onChange={setOpenDropDownMenu}>
        <ItemCopyIdRecord id={id} onChange={setOpenDropDownMenu} />

        <ItemDeleteRecord
          action={handleDelete}
          onChange={setOpenDropDownMenu}
          disabled={!hasPermission('users', 'remove_one_user')}
        />

        <ItemModifyRecord
          id={id}
          disabled={!hasPermission('users', 'update_one_user')}
        />

        <ItemViewRecord
          id={id}
          disabled={!hasPermission('users', 'find_one_user')}
        />
      </ActionsTable>
    </>
  );
};
