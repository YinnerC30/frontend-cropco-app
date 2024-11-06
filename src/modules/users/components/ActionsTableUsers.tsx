import { useDeleteUser } from '../hooks';

import { useAuthorization } from '@/modules/authentication/hooks';
import {
  ActionsTable,
  ItemCopyIdRecord,
  ItemDeleteRecord,
  ItemModifyRecord,
  ItemViewRecord,
} from '@/modules/core/components';
import { Row } from '@tanstack/react-table';
import { useState } from 'react';

interface Props {
  row: Row<any>;
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
