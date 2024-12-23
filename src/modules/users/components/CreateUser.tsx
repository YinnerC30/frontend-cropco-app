import { BreadCrumb } from '@/modules/core/components';
import React from 'react';
import { z } from 'zod';
import { usePostUser } from '../hooks';
import { MODULE_USER_PATHS } from '../routes/pathsRoutes';
import { formSchemaUserWithPassword, formSchemaUser } from '../utils';
import { FormUser } from './form';

export const CreateUser: React.FC = () => {
  const { mutate, isPending } = usePostUser();

  const handleSubmit = (
    values: z.infer<typeof formSchemaUserWithPassword | typeof formSchemaUser>
  ) => {
    const { passwords, ...rest } = values as any;
    const data = {
      ...rest,
      password: passwords.password1,
    };
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
