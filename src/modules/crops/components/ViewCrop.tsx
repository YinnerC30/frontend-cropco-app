import { useParams } from 'react-router-dom';

import { ConvertStringToDate } from '@/modules/core/helpers/conversion/ConvertStringToDate';
import { Loading } from '../../core/components';
import { BreadCrumb } from '../../core/components/BreadCrumb';
import { useGetCrop } from '../hooks/queries/useGetCrop';
import { MODULE_CROPS_PATHS } from '../routes/pathRoutes';
import { FormCrop } from './FormCrop/FormCrop';

export const ViewCrop = () => {
  const { id } = useParams();

  const { data, isLoading } = useGetCrop(id!);

  if (isLoading) return <Loading />;

  return (
    <>
      <BreadCrumb
        items={[{ link: MODULE_CROPS_PATHS.ViewAll, name: 'Cultivos' }]}
        finalItem={'Información del cultivo'}
      />

      <FormCrop
        defaultValues={{
          ...data,
          dates: {
            date_of_creation: ConvertStringToDate(data.date_of_creation),
            date_of_termination: data.date_of_termination
              ? ConvertStringToDate(data.date_of_termination)
              : undefined,
          },
        }}
        readOnly
      />
    </>
  );
};
export default ViewCrop;
