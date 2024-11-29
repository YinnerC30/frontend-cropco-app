import { BreadCrumb } from '@/modules/core/components';
import { z } from 'zod';
import { usePostUser } from '../hooks';
import { MODULE_USER_PATHS } from '../routes/pathsRoutes';
import { formSchemaUserWithPassword } from '../utils';
import { FormUser } from './form';
import { User } from '../interfaces';

export const CreateUser = () => {
  const { mutate, isPending } = usePostUser();

  const handleSubmit = async (
    values: z.infer<typeof formSchemaUserWithPassword>
  ) => {
    const { passwords, ...rest } = values;
    const data = {
      ...rest,
      password: passwords.password1,
    } as User;
    console.log(data);
    mutate(data);
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
