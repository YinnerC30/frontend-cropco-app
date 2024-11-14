import { z } from 'zod';

import { ScrollArea } from '@/components/ui/scroll-area';
import { useNavigate } from 'react-router-dom';

import { Separator } from '@/components/ui/separator';
import { usePostCrop } from '../hooks/usePostCrop';

import { BreadCrumb } from '../../core/components/BreadCrumb';
import { formSchemaCrop } from '../utils';
import { FormCrop } from './FormCrop';

export const CreateCrop = () => {
  const navigate = useNavigate();

  const { isSuccess, mutate, isPending } = usePostCrop();

  const onSubmit = (values: z.infer<typeof formSchemaCrop>) => {
    const { dates, ...rest } = values;
    mutate({ ...rest, ...dates });
  };

  if (isSuccess) {
    navigate('../view/all');
  }

  return (
    <>
      <BreadCrumb
        items={[{ link: '/crops/view/all', name: 'Cultivos' }]}
        finalItem={'Registro'}
      />

      <Separator className="my-2" />
      <ScrollArea type="auto" className="h-[80vh] w-full  mb-10">
        <FormCrop onSubmit={onSubmit} isSubmitting={isPending} />
      </ScrollArea>
    </>
  );
};
