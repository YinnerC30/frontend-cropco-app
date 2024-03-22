import { ConfirmDeleteRecord } from '@/components/common/ConfirmDeleteRecord';
import { ModifyUser } from '../form/ModifyUser';
import { Button } from '@/components/ui/button';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { deleteUser } from '@/services/cropcoAPI';
import { toast } from 'sonner';

export const ActionsUser = ({ row }: any) => {
  const user = row.original;
  const { id } = user;

  const queryClient = useQueryClient();

  const deleteUserMutation = useMutation({
    mutationFn: deleteUser,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['users'] });
      toast('Registro eliminado');
    },
  });

  return (
    <>
      <ModifyUser id={id} />
      <ConfirmDeleteRecord>
        <Button onClick={() => deleteUserMutation.mutate(id)}>Continuar</Button>
      </ConfirmDeleteRecord>
    </>
  );
};
