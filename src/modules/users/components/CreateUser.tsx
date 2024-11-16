import { BreadCrumb } from '@/modules/core/components';
import { RootState, useAppSelector } from '@/redux/store';
import { z } from 'zod';
import { usePostUser } from '../hooks';
import { MODULE_USER_PATHS } from '../routes/pathsRoutes';
import { UserAction, formSchemaUserWithPassword } from '../utils';
import { FormUser } from './FormUser';

export const CreateUser = () => {
  const { mutate, isPending } = usePostUser();

  const { actions } = useAppSelector((state: RootState) => state.users_module.form_user);

  const handleSubmit = async (
    values: z.infer<typeof formSchemaUserWithPassword>
  ) => {
    const { passwords, ...rest } = values;
    mutate({
      ...rest,
      password: passwords.password1,
      actions: actions.map((action: UserAction) => ({ id: action.id })),
    });
  };

  return (
    <>
      <BreadCrumb
        items={[{ link: MODULE_USER_PATHS.ViewAll, name: 'Usuarios' }]}
        finalItem={`Registro`}
      />
      <FormUser onSubmit={handleSubmit} isSubmitting={isPending} />
    </>
  );
};

export default CreateUser;
