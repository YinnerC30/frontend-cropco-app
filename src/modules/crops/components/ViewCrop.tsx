import { ScrollArea } from '@/components/ui/scroll-area';
import { useParams } from 'react-router-dom';

import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import { ConvertStringToDate } from '@/modules/core/helpers/ConvertStringToDate';
import { ErrorLoading, Loading } from '../../core/components';
import { BreadCrumb } from '../../core/components/BreadCrumb';
import { useGetCrop } from '../hooks/useGetCrop';
import { FormCrop } from './FormCrop';

export const ViewCrop = () => {
  const { id } = useParams();

  const { data, isLoading } = useGetCrop(id!);

  if (isLoading) return <Loading />;

  if (!data) return <ErrorLoading />;

  return (
    <>
      <BreadCrumb
        items={[{ link: '/crops/all', name: 'Cultivos' }]}
        finalItem={'Información del cultivo'}
      />

      <Separator className="my-2" />
      <ScrollArea type="auto" className="h-[80vh] w-full  mb-10">
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
      </ScrollArea>
    </>
  );
};
