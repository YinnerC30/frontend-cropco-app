import { useParams } from 'react-router-dom';
import { z } from 'zod';
import { BreadCrumb, Loading } from '../../core/components';
import { usePatchCrop } from '../hooks';
import { useGetCrop } from '../hooks/queries/useGetCrop';
import { MODULE_CROPS_PATHS } from '../routes/pathRoutes';
import { formSchemaCrop } from '../utils';
import { FormCrop } from './form/FormCrop';
import { Crop } from '../interfaces/Crop';

export const ModifyCrop: React.FC = () => {
  const { id } = useParams();
  const { mutate, isPending } = usePatchCrop();
  const { data, isLoading } = useGetCrop(id!);
  const onSubmit = (values: z.infer<typeof formSchemaCrop>) => {
    const { dates, ...rest } = values;
    const data: Crop = { ...rest, ...dates, id } as unknown as Crop;
    mutate(data);
  };

  if (isLoading) return <Loading />;

  return (
    <>
      <BreadCrumb
        items={[{ link: MODULE_CROPS_PATHS.ViewAll, name: 'Cultivos' }]}
        finalItem={'Modificar'}
      />

      <FormCrop
        onSubmit={onSubmit}
        isSubmitting={isPending}
        defaultValues={data}
      />
    </>
  );
};

export default ModifyCrop;
