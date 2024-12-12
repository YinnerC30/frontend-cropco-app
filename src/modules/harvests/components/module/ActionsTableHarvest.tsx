import {
  ActionCopyIdRecord,
  ActionDeleteRecord,
  ActionModifyRecord,
  ActionViewRecord,
  DropDownMenuActions,
  ItemNavigate,
} from '@/modules/core/components';
import { LayersIcon } from 'lucide-react';
import { useDeleteHarvest } from '../../hooks';
import { useHarvestModuleContext } from '../../hooks/context/useHarvestModuleContext';
import { MODULE_HARVESTS_PATHS } from '../../routes/pathRoutes';

export const ActionsTableHarvest = ({ row }: any) => {
  const { resetSelectionRows, hasPermission } = useHarvestModuleContext();
  const { id } = row.original;
  const { mutate } = useDeleteHarvest();

  const handleDelete = () => {
    mutate(id, {
      onSuccess: () => {
        resetSelectionRows();
      },
    });
  };
  return (
    <DropDownMenuActions>
      <ActionCopyIdRecord id={id} />
      <ActionDeleteRecord
        action={handleDelete}
        disabled={!hasPermission('harvests', 'remove_one_harvest')}
      />
      <ActionModifyRecord
        id={id}
        path={MODULE_HARVESTS_PATHS.Update + id}
        disabled={!hasPermission('harvests', 'update_one_harvest')}
      />
      <ActionViewRecord
        id={id}
        path={MODULE_HARVESTS_PATHS.ViewOne + id}
        disabled={!hasPermission('harvests', 'find_one_harvest')}
      />
      <ItemNavigate
        path={`../processed/view/${id}`}
        Icon={LayersIcon}
        name={'Inventario'}
        disabled={!hasPermission('harvests', 'find_one_harvest')}
      />
    </DropDownMenuActions>
  );
};
