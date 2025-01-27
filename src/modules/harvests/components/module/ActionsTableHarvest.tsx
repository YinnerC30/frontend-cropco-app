import {
  ActionCopyIdRecord,
  ActionDeleteRecord,
  ActionModifyRecord,
  ActionViewRecord,
  DropDownMenuActions,
  ItemNavigate,
} from '@/modules/core/components';
import { Row } from '@tanstack/react-table';
import { LayersIcon } from 'lucide-react';
import { useHarvestModuleContext } from '../../hooks/context/useHarvestModuleContext';
import { Harvest } from '../../interfaces';
import { MODULE_HARVESTS_PATHS } from '../../routes/pathRoutes';
import { ActionGetDocument } from './ActionGetDocument';

interface Props {
  row: Row<Harvest>;
}

export const ActionsTableHarvest: React.FC<Props> = ({ row }) => {
  const { dataTable, actionsHarvestsModule, mutationDeleteHarvest } =
    useHarvestModuleContext();
  const id = row.original.id ?? '';
  const { mutate } = mutationDeleteHarvest;

  const handleDelete = () => {
    mutate(id, {
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
        disabled={!actionsHarvestsModule['remove_one_harvest']}
      />
      <ActionModifyRecord
        id={id}
        path={MODULE_HARVESTS_PATHS.Update + id}
        disabled={!actionsHarvestsModule['update_one_harvest']}
      />
      <ActionViewRecord
        id={id}
        path={MODULE_HARVESTS_PATHS.ViewOne + id}
        disabled={!actionsHarvestsModule['find_one_harvest']}
      />
      <ItemNavigate
        path={`../processed/view/${id}`}
        Icon={LayersIcon}
        name={'Inventario'}
        disabled={!actionsHarvestsModule['find_one_harvest']}
      />
      <ActionGetDocument
        id={id!}
        disabled={!actionsHarvestsModule['export_harvest_to_pdf']}
      />
    </DropDownMenuActions>
  );
};
