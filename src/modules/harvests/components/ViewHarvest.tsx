import { BreadCrumb } from '@/modules/core/components/';
import { ConvertStringToDate } from '@/modules/core/helpers/conversion/ConvertStringToDate';
import { useParams } from 'react-router-dom';
import { Loading } from '../../core/components';
import { useGetHarvest } from '../hooks/queries/useGetHarvest';
import { MODULE_HARVESTS_PATHS } from '../routes/pathRoutes';
import { FormHarvest } from './forms/harvest/FormHarvest';

export const ViewHarvest = () => {
  const { id } = useParams();

  const { data, isLoading } = useGetHarvest(id!);

  if (isLoading) return <Loading />;

  return (
    <>
      <BreadCrumb
        items={[{ link: MODULE_HARVESTS_PATHS.ViewAll, name: 'Cosechas' }]}
        finalItem={` Información de la cosecha`}
      />

      {/* Formulario principal */}
      <FormHarvest
        defaultValues={{
          ...data,
          date: ConvertStringToDate(data.date),
        }}
        readOnly
      />
    </>
  );
};
