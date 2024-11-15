import { Loading } from '@/modules/core/components';
import { useParams } from 'react-router-dom';
import { z } from 'zod';
import { useGetUser, usePatchUser } from '../hooks/';

import { BreadCrumb } from '@/modules/core/components/';
import { RootState, useAppSelector } from '@/redux/store';
import { MODULE_USER_PATHS } from '../routes/pathsRoutes';
import { ActionStore, formSchemaUser } from '../utils';
import { FormUser } from './FormUser';

export const ModifyUser = () => {
  const { id } = useParams();
  const { data, isLoading } = useGetUser(id!);
  const { mutate, isPending } = usePatchUser();

  const { actions } = useAppSelector(
    (state: RootState) => state.users_module.form_user
  );

  const handleSubmit = (values: z.infer<typeof formSchemaUser>) => {
    mutate({
      ...values,
      id,
      actions: actions.map((action: ActionStore) => ({
        id: action.id,
      })),
    });
  };

  if (isLoading) return <Loading />;

  return (
    <>
      <BreadCrumb
        items={[{ link: MODULE_USER_PATHS.ViewAll, name: 'Usuarios' }]}
        finalItem={`Modificar`}
      />

      <FormUser
        onSubmit={handleSubmit}
        isSubmitting={isPending}
        defaultValues={data}
        hiddenPassword
      />
    </>
  );
};

export default ModifyUser;
