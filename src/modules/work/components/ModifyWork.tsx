import { useNavigate, useParams } from 'react-router-dom';
import { z } from 'zod';

import { formSchemaWork } from '../utils/formSchemaWork';

import { Loading } from '@/modules/core/components';

import { BreadCrumb } from '@/modules/core/components/';
import { ConvertStringToDate } from '../../core/helpers/conversion/ConvertStringToDate';

import { usePatchWork } from '../hooks/mutations/usePatchWork';
import { MODULE_WORKS_PATHS } from '../routes/pathRoutes';
import FormWork from './forms/work/FormWork';
import { useGetWork } from '../hooks/queries/useGetWork';

export const ModifyWork = () => {
  const { id } = useParams();

  const { data, isLoading } = useGetWork(id!);
  const { mutate, isPending } = usePatchWork(id!);

  const navigate = useNavigate();

  // Handle form submission
  const onSubmitWork = (values: z.infer<typeof formSchemaWork>) => {
    mutate(
      {
        ...values,
        id,
        details: values.details.map((detail: any) => ({
          ...detail,
          employee: { id: detail.employee.id },
          id,
        })),
      },
      {
        onSuccess: () => {
          navigate('../view/all');
        },
      }
    );
  };

  // Render loading or error states
  if (isLoading) return <Loading />;

  return (
    <>
      <BreadCrumb
        items={[{ link: MODULE_WORKS_PATHS.ViewAll, name: 'Trabajos' }]}
        finalItem={`Modificar`}
      />

      <FormWork
        defaultValues={{ ...data, date: ConvertStringToDate(data?.date) }}
        isSubmitting={isPending}
        onSubmit={onSubmitWork}
      />
    </>
  );
};
export default ModifyWork;