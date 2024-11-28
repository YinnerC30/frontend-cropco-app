import { Loading } from '@/modules/core/components';
import { useParams } from 'react-router-dom';
import { z } from 'zod';
import { useGetUser, usePatchUser } from '../hooks/';

import { BreadCrumb } from '@/modules/core/components/';
import { Action, Module } from '@/modules/core/interfaces';
import { MODULE_USER_PATHS } from '../routes/pathsRoutes';
import { formSchemaUser } from '../utils';
import { FormUser } from './FormUser';

export const ModifyUser = () => {
  const { id } = useParams();
  const { data, isLoading } = useGetUser(id!);
  const { mutate, isPending } = usePatchUser();

  const actions = data?.modules?.flatMap((module: Module) =>
    module.actions.map((action: Action) => ({ id: action.id }))
  );

  const defaultDataForm = {
    ...data,
    actions,
  };

  const handleSubmit = (values: z.infer<typeof formSchemaUser>) => {
    mutate({
      ...values,
      id,
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
        defaultValues={defaultDataForm}
        hiddenPassword
        showAlert
      />
    </>
  );
};

export default ModifyUser;
