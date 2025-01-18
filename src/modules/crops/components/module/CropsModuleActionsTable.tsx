
import {
  ActionCopyIdRecord,
  ActionDeleteRecord,
  ActionModifyRecord,
  ActionViewRecord,
} from '@/modules/core/components/data-table/menu/actions';
import { DropDownMenuActions } from '@/modules/core/components/data-table/menu/DropDownMenuActions';
import { Row } from '@tanstack/react-table';
import React from 'react';
import { useCropsModuleContext } from '../../hooks';
import { Crop } from '../../interfaces/Crop';

interface Props {
  row: Row<Crop>;
}

export const CropsModuleActionsTable: React.FC<Props> = ({ row }) => {
  const { dataTable, actionsCropsModule,mutationDeleteCrop } = useCropsModuleContext();

  const id = row?.original?.id ?? '';
  

  const handleDelete = () => {
    mutationDeleteCrop.mutate(id, {
      onSuccess: () => {
        dataTable.resetSelectionRows();
      },
    });
  };

  return (
    <DropDownMenuActions>
      <ActionCopyIdRecord id={id} />

      <ActionDeleteRecord
        action={handleDelete}
        disabled={!actionsCropsModule['remove_one_crop']}
      />

      <ActionModifyRecord
        id={id}
        disabled={!actionsCropsModule['update_one_crop']}
      />

      <ActionViewRecord
        id={id}
        disabled={!actionsCropsModule['find_one_crop']}
      />
    </DropDownMenuActions>
  );
};
