import {
  ActionCopyIdRecord,
  ActionDeleteRecord,
  ActionModifyRecord,
  ActionViewRecord,
  DropDownMenuActions,
} from '@/modules/core/components';

import { useDeleteConsumption } from '../../hooks/mutations/useDeleteConsumption';
import { MODULE_CONSUMPTION_PATHS } from '../../routes/pathRoutes';
import { useConsumptionModuleContext } from '../../hooks/context/useConsumptionModuleContext';

export const ActionsTableConsumption = ({ row }: any) => {
  const { resetSelectionRows, permissionsConsumption } =
    useConsumptionModuleContext();
  const { id } = row.original;
  const { mutate } = useDeleteConsumption();

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
        disabled={!permissionsConsumption['remove_one_supplies_consumption']}
      />
      <ActionModifyRecord
        id={id}
        path={MODULE_CONSUMPTION_PATHS.Update + id}
        disabled={!permissionsConsumption['update_one_supplies_consumption']}
      />
      <ActionViewRecord
        id={id}
        path={MODULE_CONSUMPTION_PATHS.ViewOne + id}
        disabled={!permissionsConsumption['find_one_supplies_consumption']}
      />
    </DropDownMenuActions>
  );
};
