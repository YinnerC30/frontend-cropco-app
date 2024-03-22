import { ConfirmDeleteRecord } from '@/components/ConfirmDeleteRecord';
import { ModifyUser } from '../form/ModifyUser';

export const ActionsUser = ({ row }: any) => {
  const user = row.original;
  const { id } = user;

  return (
    <>
      <ModifyUser id={id} />
      <ConfirmDeleteRecord id={id} />
    </>
  );
};
