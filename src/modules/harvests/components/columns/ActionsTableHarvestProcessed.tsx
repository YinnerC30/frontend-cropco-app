import {
  ActionCopyIdRecord,
  ActionDeleteRecord,
  DropDownMenuActions,
} from '@/modules/core/components';
import { UseMutateFunction, useQueryClient } from '@tanstack/react-query';

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

  const handleDelete = () => {
    mutate(id, {
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ['harvest', id] });
      },
    });
  };
  return (
    <DropDownMenuActions>
      <ActionCopyIdRecord id={id} />
      <ActionDeleteRecord action={handleDelete} />
    </DropDownMenuActions>
  );
};
