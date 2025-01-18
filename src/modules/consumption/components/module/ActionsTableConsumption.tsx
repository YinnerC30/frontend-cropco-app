import {
  ActionCopyIdRecord,
  ActionDeleteRecord,
  ActionModifyRecord,
  ActionViewRecord,
  DropDownMenuActions,
} from '@/modules/core/components';

import { Row } from '@tanstack/react-table';
import { useConsumptionModuleContext } from '../../hooks/context/useConsumptionModuleContext';
import { ConsumptionSupplies } from '../../interfaces';
import { MODULE_CONSUMPTION_PATHS } from '../../routes/pathRoutes';

export const ActionsTableConsumption: React.FC<{
  row: Row<ConsumptionSupplies>;
}> = ({ row }) => {
  const {
    dataTable: { resetSelectionRows },
    actionsConsumptionsModule,
    mutationDeleteConsumption,
  } = useConsumptionModuleContext();
  const id = row.original.id ?? '';
  const { mutate } = mutationDeleteConsumption;

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
        disabled={!actionsConsumptionsModule['remove_one_supplies_consumption']}
      />
      <ActionModifyRecord
        id={id}
        path={MODULE_CONSUMPTION_PATHS.Update + id}
        disabled={!actionsConsumptionsModule['update_one_supplies_consumption']}
      />
      <ActionViewRecord
        id={id}
        path={MODULE_CONSUMPTION_PATHS.ViewOne + id}
        disabled={!actionsConsumptionsModule['find_one_supplies_consumption']}
      />
    </DropDownMenuActions>
  );
};
