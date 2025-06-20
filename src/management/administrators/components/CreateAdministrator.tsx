import { BreadCrumb } from '@/modules/core/components';
import {
  formSchemaUser,
  formSchemaUserWithPassword,
} from '@/modules/users/utils';
import React from 'react';
import { z } from 'zod';
import { usePostAdministrator } from '../hooks/mutations/usePostAdministrator';
import { MODULE_ADMINISTRATORS_PATHS } from '../routes/pathsRoutes';
import { FormAdministrator } from './form/FormAdministrator';

export const CreateAdministrator: React.FC = () => {
  const { mutate, isPending } = usePostAdministrator();

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
        items={[
          {
            link: MODULE_ADMINISTRATORS_PATHS.ViewAll,
            name: 'Administradores',
          },
        ]}
        finalItem={`Registro`}
      />
      <FormAdministrator onSubmit={handleSubmit} isSubmitting={isPending} />
    </>
  );
};

export default CreateAdministrator;
