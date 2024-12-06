import {
  ActionCopyIdRecord,
  ActionDeleteRecord,
  DropDownMenuActions,
} from '@/modules/core/components';
import { UseMutateFunction, useQueryClient } from '@tanstack/react-query';
import { ActionModifyRecordFormDataTable } from '../../../core/components/data-table/menu/actions/ActionModifyRecordFormDataTable';
import { useHarvestProcessedContext } from '../module/processed/HarvestProcessedContext';
import { useDialogStatus } from '@/components/common/DialogStatusContext';

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
  const { setHarvestProcessed, setOpenDialog } = useHarvestProcessedContext();

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
    // handleOpenDialog();
  };

  return (
    <DropDownMenuActions>
      <ActionCopyIdRecord id={id} />
      <ActionDeleteRecord action={handleDelete} />
      <ActionModifyRecordFormDataTable action={handleModify} />
    </DropDownMenuActions>
  );
};
