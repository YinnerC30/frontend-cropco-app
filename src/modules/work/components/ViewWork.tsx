import { useParams } from 'react-router-dom';
import { useGetWork } from '../hooks/queries/useGetWork';

import { Loading } from '@/modules/core/components';

import { BreadCrumb } from '@/modules/core/components/';
import { MODULE_WORKS_PATHS } from '../routes/pathRoutes';
import { FormWork } from './forms/work/FormWork';

export const ViewWork: React.FC = () => {
  const { id } = useParams();

  const { data, isLoading } = useGetWork(id!);

  if (isLoading) return <Loading />;

  return (
    <>
      <BreadCrumb
        items={[{ link: MODULE_WORKS_PATHS.ViewAll, name: 'Trabajos' }]}
        finalItem={`Información del trabajo`}
      />

      <FormWork readOnly defaultValues={data} />
    </>
  );
};
export default ViewWork;
