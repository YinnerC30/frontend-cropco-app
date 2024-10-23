import { ActionsTable } from '@/modules/core/components/table/ActionsTable';

import { useDeleteUser } from '../hooks/useDeleteUser';

import { ItemCopyIdRecord } from '@/modules/core/components/table/actions/ItemCopyIdRecord';
import { ItemDeleteRecord } from '@/modules/core/components/table/actions/ItemDeleteRecord';
import { ItemModifyRecord } from '@/modules/core/components/table/actions/ItemModifyRecord';
import { ItemViewRecord } from '@/modules/core/components/table/actions/ItemViewRecord';
import { useState } from 'react';
import { useUserAuthorizationActions } from '../hooks/useUserAuthorizationActions';

interface Props {
  row: any;
}

export const ActionsTableUsers = ({ row }: Props) => {
  const { authorizationActions } = useUserAuthorizationActions();
  const { id } = row.original;
  const { mutate } = useDeleteUser();
  const [openDropDownMenu, setOpenDropDownMenu] = useState(false);

  const { remove_one_user, update_one_user, find_one_user } =
    authorizationActions;

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
          disabled={!remove_one_user.visible}
        />

        <ItemModifyRecord id={id} disabled={!update_one_user.visible} />

        <ItemViewRecord id={id} disabled={!find_one_user.visible} />
      </ActionsTable>
    </>
  );
};
