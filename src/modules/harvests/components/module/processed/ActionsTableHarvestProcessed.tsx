import {
  ActionCopyIdRecord,
  ActionDeleteRecord,
  DropDownMenuActions,
} from '@/modules/core/components';
import { ActionModifyRecordFormDataTable } from '@/modules/core/components/data-table/menu/actions/ActionModifyRecordFormDataTable';
import { useDeleteHarvestProcessed } from '@/modules/harvests/hooks';
import { HarvestProcessed } from '@/modules/harvests/interfaces';
import { useQueryClient } from '@tanstack/react-query';
import { Row } from '@tanstack/react-table';
import { useHarvestProcessedContext } from './HarvestProcessedContext';

interface Props {
  row: Row<HarvestProcessed>;
}

export const ActionsTableHarvestProcessed: React.FC<Props> = ({ row }) => {
  const queryClient = useQueryClient();
  const { setHarvestProcessed, setOpenDialog, actionsHarvestsModule } =
    useHarvestProcessedContext();

  const id = row.original?.id ?? '';

  const mutationDeleteHarvestProcessed = useDeleteHarvestProcessed();

  
  const handleDelete = () => {
    mutationDeleteHarvestProcessed.mutate(id, {
      onSuccess: async () => {
        await queryClient.invalidateQueries({ queryKey: ['harvest', id] });
      },
    });
  };

  const handleModify = () => {
    setHarvestProcessed(row.original);
    
    setOpenDialog(true);
  };

  return (
    <DropDownMenuActions>
      <ActionCopyIdRecord id={id} />
      <ActionDeleteRecord
        action={handleDelete}
        disabled={!actionsHarvestsModule['remove_one_harvest_processed']}
      />
      <ActionModifyRecordFormDataTable
        action={handleModify}
        disabled={!actionsHarvestsModule['update_one_harvest_processed']}
      />
    </DropDownMenuActions>
  );
};
