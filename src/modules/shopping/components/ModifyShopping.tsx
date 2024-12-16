import { Loading } from '@/modules/core/components';
import { useNavigate, useParams } from 'react-router-dom';
import { z } from 'zod';

import { BreadCrumb } from '@/modules/core/components/';
import { ConvertStringToDate } from '@/modules/core/helpers/conversion/ConvertStringToDate';
import { usePatchShopping } from '../hooks/mutations/usePatchShopping';
import { useGetShopping } from '../hooks/queries/useGetShopping';
import { ShoppingDetail } from '../interfaces/ShoppingDetails';
import { MODULE_SHOPPING_PATHS } from '../routes/pathRoutes';
import { formSchemaShopping } from '../utils/formSchemaShopping';
import FormShopping from './forms/shopping/FormShopping';

export const ModifyShopping = () => {
  const { id } = useParams();
  const { data, isLoading } = useGetShopping(id!);
  const { mutate, isPending } = usePatchShopping(id!);
  const navigate = useNavigate();

  const onSubmitShopping = (values: z.infer<typeof formSchemaShopping>) => {
    mutate(
      {
        id,
        ...values,
        details: values.details.map((item: ShoppingDetail) => {
          return {
            ...item,
            supplier: { id: item.supplier.id },
            supply: { id: item.supply.id },
          };
        }),
      },
      {
        onSuccess: () => {
          navigate('../view/all');
        },
      }
    );
  };

  // Render loading or error states
  if (isLoading) return <Loading />;

  return (
    <>
      <BreadCrumb
        items={[{ link: MODULE_SHOPPING_PATHS.ViewAll, name: 'Compras' }]}
        finalItem={`Modificar`}
      />

      {/* Formulario principal */}
      <FormShopping
        onSubmit={onSubmitShopping}
        isSubmitting={isPending}
        defaultValues={{ ...data, date: ConvertStringToDate(data.date) }}
      />
    </>
  );
};
export default ModifyShopping;
