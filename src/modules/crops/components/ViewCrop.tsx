import { useParams } from 'react-router-dom';

import { BreadCrumb } from '@/modules/core/components/';
import { Loading } from '../../core/components';
import { useGetCrop } from '../hooks/queries/useGetCrop';
import { MODULE_CROPS_PATHS } from '../routes/pathRoutes';
import { FormCrop } from './form/FormCrop';

export const ViewCrop: React.FC = () => {
  const { id } = useParams();

  const { data, isLoading } = useGetCrop(id!);

  if (isLoading) return <Loading />;

  return (
    <>
      <BreadCrumb
        items={[{ link: MODULE_CROPS_PATHS.ViewAll, name: 'Cultivos' }]}
        finalItem={'Información del cultivo'}
      />

      <FormCrop defaultValues={data} readOnly />
    </>
  );
};
export default ViewCrop;
