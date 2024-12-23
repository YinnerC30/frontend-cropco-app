import { z } from 'zod';

import { MODULE_EMPLOYEE_PATHS } from '../routes/pathRoutes';
import { formSchemaEmployee } from '../utils';
import FormEmployee from './form/FormEmployee';
import { usePostEmployee } from '../hooks';
import { BreadCrumb } from '@/modules/core/components';

export const CreateEmployee: React.FC = () => {
  const { mutate, isPending } = usePostEmployee();

  const onSubmit = (values: z.infer<typeof formSchemaEmployee>) => {
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
export default CreateEmployee;
