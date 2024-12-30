import { z } from 'zod';

import { formSchemaWork } from '../utils/formSchemaWork';

import { BreadCrumb } from '@/modules/core/components/';

import { usePostWork } from '../hooks/mutations/usePostUser';
import { MODULE_WORKS_PATHS } from '../routes/pathRoutes';
import FormWork from './forms/work/FormWork';
import { WorkDetail } from '../interfaces/WorkDetail';

export const CreateWork: React.FC = () => {
  const { mutate, isPending } = usePostWork();

  const onSubmit = (values: z.infer<typeof formSchemaWork>) => {
    mutate({
      ...values,
      details: values.details.map(({ id, ...rest }: WorkDetail) => ({
        ...rest,
        employee: { id: rest.employee.id },
      })),
    });
  };

  return (
    <>
      <BreadCrumb
        items={[{ link: MODULE_WORKS_PATHS.ViewAll, name: 'Trabajos' }]}
        finalItem={`Registro`}
      />

      <FormWork isSubmitting={isPending} onSubmit={onSubmit} />
    </>
  );
};
export default CreateWork;
