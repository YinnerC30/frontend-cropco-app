import { useDialogStatus } from '@/components/common/DialogStatusContext';
import {
  ActionCopyIdRecord,
  ActionDeleteRecord,
  DropDownMenuActions,
} from '@/modules/core/components';
import { ActionModifyRecordFormDataTable } from '@/modules/core/components/data-table/menu/actions/ActionModifyRecordFormDataTable';
import { UseMutateFunction, useQueryClient } from '@tanstack/react-query';
import { useHarvestProcessedContext } from './HarvestProcessedContext';

type MutateParams = {
  id: string;
};
interface Props {
  mutate: UseMutateFunction<any, unknown, MutateParams, unknown> | any;
  id: string;
  values: any;
}

export const ActionsTableHarvestProcessed = ({ mutate, id, values }: Props) => {
  const queryClient = useQueryClient();
  const { setHarvestProcessed, setOpenDialog, permissionsHarvest } =
    useHarvestProcessedContext();

  const { setIsActiveDialog } = useDialogStatus();
  const handleDelete = () => {
    mutate(id, {
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ['harvest', id] });
      },
    });
  };

  const handleModify = () => {
    setHarvestProcessed(values);
    setIsActiveDialog(true);
    setOpenDialog(true);
  };

  return (
    <DropDownMenuActions>
      <ActionCopyIdRecord id={id} />
      <ActionDeleteRecord
        action={handleDelete}
        disabled={!permissionsHarvest['remove_one_harvest_processed']}
      />
      <ActionModifyRecordFormDataTable
        action={handleModify}
        disabled={!permissionsHarvest['update_one_harvest_processed']}
      />
    </DropDownMenuActions>
  );
};
