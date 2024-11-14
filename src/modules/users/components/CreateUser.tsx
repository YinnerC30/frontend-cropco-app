import { Separator } from '@/components';
import { RootState, useAppSelector } from '@/redux/store';
import { z } from 'zod';
import { usePostUser } from '../hooks';
import { formSchemaUserWithPassword } from '../utils';
import { FormUser } from './FormUser';
import { BreadCrumb } from '@/modules/core/components';
import { MODULE_USER_PATHS } from '../routes/pathsRoutes';

export const CreateUser = () => {
  const { mutate, isPending } = usePostUser();

  const { actions } = useAppSelector((state: RootState) => state.user);

  const onSubmit = async (
    values: z.infer<typeof formSchemaUserWithPassword>
  ) => {
    const { passwords, ...rest } = values;
    mutate({
      ...rest,
      password: passwords.password1,
      actions: actions.map((act: any) => ({ id: act })),
    });
  };

  return (
    <>
      <BreadCrumb
        items={[{ link: MODULE_USER_PATHS.ViewAll, name: 'Usuarios' }]}
        finalItem={`Registro`}
      />
      <FormUser onSubmit={onSubmit} isPending={isPending} />
    </>
  );
};

export default CreateUser;
