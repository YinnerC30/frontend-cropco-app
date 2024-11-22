import { BreadCrumb } from '@/modules/core/components/BreadCrumb';
import { useParams } from 'react-router-dom';
import { z } from 'zod';
import { Loading } from '../../core/components';
import { useGetEmployee } from '../hooks/useGetEmployee';
import { usePatchEmployee } from '../hooks/usePatchEmployee';
import { MODULE_EMPLOYEE_PATHS } from '../routes/pathRoutes';
import { formSchemaEmployee } from '../utils';
import FormEmployee from './FormEmployee/FormEmployee';

export const ModifyEmployee = () => {
  const { id } = useParams();
  const { data, isLoading } = useGetEmployee(id!);
  const { mutate, isPending } = usePatchEmployee();

  const onSubmit = (values: z.infer<typeof formSchemaEmployee>) => {
    mutate({ id, ...values });
  };

  if (isLoading) {
    return <Loading />;
  }

  return (
    <>
      <BreadCrumb
        items={[{ link: MODULE_EMPLOYEE_PATHS.ViewAll, name: 'Empleados' }]}
        finalItem={`Modificar`}
      />

      <FormEmployee
        onSubmit={onSubmit}
        isSubmitting={isPending}
        defaultValues={data}
      />
    </>
  );
};
