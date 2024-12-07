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

export const ActionsTableHarvest = ({ row }: any) => {
  const { resetSelectionRows } = useHarvestModuleContext();
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
      <ActionDeleteRecord action={handleDelete} />
      <ActionModifyRecord id={id} />
      <ActionViewRecord id={id} />
      <ItemNavigate
        path={`../processed/view/${id}`}
        Icon={LayersIcon}
        name={'Inventario'}
      />
    </DropDownMenuActions>
  );
};
