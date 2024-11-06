import { Separator } from '@/components';
import { BreadCrumb } from '@/modules/core/components';
import { RootState, useAppSelector } from '@/redux/store';
import { z } from 'zod';
import { usePostUser } from '../hooks';
import { formSchemaUserWithPassword } from '../utils';
import { FormUser } from './FormUser';
import { MODULE_USER_PATHS } from '../utils/pathsRoutes';

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
        finalItem={'Registro'}
      />
      <Separator className="my-2" />
      <FormUser onSubmit={onSubmit} isPending={isPending} />
    </>
  );
};

export default CreateUser;
