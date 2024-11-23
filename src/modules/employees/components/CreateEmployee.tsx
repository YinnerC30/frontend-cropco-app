import { z } from 'zod';

import { BreadCrumb } from '@/modules/core/components/BreadCrumb';
import { MODULE_EMPLOYEE_PATHS } from '../routes/pathRoutes';
import { formSchemaEmployee } from '../utils';
import FormEmployee from './FormEmployee/FormEmployee';
import { usePostEmployee } from '../hooks';

export const CreateEmployee = () => {
  const { mutate, isPending } = usePostEmployee();

  const onSubmit = async (values: z.infer<typeof formSchemaEmployee>) => {
    mutate(values);
  };

  return (
    <>
      <BreadCrumb
        items={[{ link: MODULE_EMPLOYEE_PATHS.ViewAll, name: 'Empleados' }]}
        finalItem={`Registro`}
      />
      <FormEmployee onSubmit={onSubmit} isSubmitting={isPending} />
    </>
  );
};
