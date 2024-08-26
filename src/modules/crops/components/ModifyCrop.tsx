import { ScrollArea } from '@/components/ui/scroll-area';
import { useNavigate, useParams } from 'react-router-dom';
import { z } from 'zod';

import { Separator } from '@/components/ui/separator';
import { ErrorLoading, Loading } from '../../core/components';
import { useGetCrop } from '../hooks/useGetCrop';
import { usePatchCrop } from '../hooks/usePatchCrop';

import { ConvertStringToDate } from '@/modules/core/helpers/ConvertStringToDate';
import { BreadCrumb } from '../../core/components/BreadCrumb';
import { formSchemaCrop } from '../utils';
import { FormCrop } from './FormCrop';

export const ModifyCrop = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const { mutate, isPending, isSuccess } = usePatchCrop();

  const { data, isLoading } = useGetCrop(id!);

  const onSubmit = (values: z.infer<typeof formSchemaCrop>) => {
    const { dates, ...rest } = values;
    mutate({ ...rest, ...dates, id });
  };

  if (isLoading) return <Loading />;

  if (!data) return <ErrorLoading />;

  if (isSuccess) {
    navigate(`../all`);
  }

  return (
    <>
      <BreadCrumb
        items={[{ link: '/crops/all', name: 'Cultivos' }]}
        finalItem={'Modificar'}
      />

      <Separator className="my-2" />
      <ScrollArea type="auto" className="h-[80vh] w-full  mb-10">
        <FormCrop
          onSubmit={onSubmit}
          isPending={isPending}
          defaultValues={{
            ...data,
            dates: {
              date_of_creation: ConvertStringToDate(data.date_of_creation),
              date_of_termination: data.date_of_termination
                ? ConvertStringToDate(data.date_of_termination)
                : undefined,
            },
          }}
        />
      </ScrollArea>
    </>
  );
};
