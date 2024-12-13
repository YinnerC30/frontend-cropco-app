import { useParams } from 'react-router-dom';
import { useGetWork } from '../hooks/queries/useGetWork';

import { Loading } from '@/modules/core/components';

import { BreadCrumb } from '@/modules/core/components/';
import { ConvertStringToDate } from '@/modules/core/helpers/conversion/ConvertStringToDate';
import { MODULE_WORKS_PATHS } from '../routes/pathRoutes';
import { FormWork } from './forms/work/FormWork';

export const ViewWork = () => {
  const { id } = useParams();

  const { data, isLoading } = useGetWork(id!);

  // Render loading or error states
  if (isLoading) return <Loading />;

  return (
    <>
      <BreadCrumb
        items={[{ link: MODULE_WORKS_PATHS.ViewAll, name: 'Trabajos' }]}
        finalItem={`Información del trabajo`}
      />

      <FormWork
        readOnly
        defaultValues={{ ...data, date: ConvertStringToDate(data?.date) }}
      />
    </>
  );
};
export default ViewWork;