import { ScrollArea } from '@/components/ui/scroll-area';
import { Separator } from '@/components/ui/separator';
import { Loading } from '@/modules/core/components';
import { useParams } from 'react-router-dom';
import { useGetConsumption } from '../hooks/queries/useGetConsumption';

import { BreadCrumb } from '@/modules/core/components/';
import { ConvertStringToDate } from '@/modules/core/helpers/conversion/ConvertStringToDate';
import { MODULE_CONSUMPTION_PATHS } from '../routes/pathRoutes';
import { FormConsumption } from './forms/consumption/FormConsumption';

export const ViewConsumption = () => {
  const { id } = useParams();
  const { data, isLoading } = useGetConsumption(id!);

  if (isLoading) return <Loading />;

  return (
    <>
      <BreadCrumb
        items={[{ link: MODULE_CONSUMPTION_PATHS.ViewAll, name: 'Consumos' }]}
        finalItem={`Información del consumo`}
      />

      {/* Formulario principal */}
      <FormConsumption
        defaultValues={{ ...data, date: ConvertStringToDate(data.date) }}
        readOnly
      />
    </>
  );
};
export default ViewConsumption;
