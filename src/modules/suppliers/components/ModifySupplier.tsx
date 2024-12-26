import { useParams } from 'react-router-dom';
import { z } from 'zod';
import { Loading } from '../../core/components';

import { usePatchSupplier } from '../hooks/mutations/usePatchSupplier';
import { useGetSupplier } from '../hooks/queries/useGetSupplier';

import { BreadCrumb } from '@/modules/core/components';
import { MODULE_SUPPLIER_PATHS } from '../routes/pathRoutes';
import { formSchemaSupplier } from '../utils/formSchemaSupplier';
import { FormSupplier } from './form/FormSupplier';

export const ModifySupplier: React.FC = () => {
  const { id } = useParams();
  const { data, isLoading } = useGetSupplier(id!);
  const { mutate, isPending } = usePatchSupplier();

  const onSubmit = (values: z.infer<typeof formSchemaSupplier>) => {
    mutate({ id, ...values });
  };

  if (isLoading) {
    return <Loading />;
  }

  return (
    <>
      <BreadCrumb
        items={[{ link: MODULE_SUPPLIER_PATHS.ViewAll, name: 'Proveedores' }]}
        finalItem={`Modificar`}
      />

      <FormSupplier
        onSubmit={onSubmit}
        isSubmitting={isPending}
        defaultValues={data}
      />
    </>
  );
};
export default ModifySupplier;
