import { BreadCrumb } from '@/modules/core/components';
import { useNavigate } from 'react-router-dom';
import { usePostPayment } from '../hooks/mutations/usePostPayment';
import { MODULE_PAYMENTS_PATHS } from '../routes/pathRoutes';
import FormPayment from './forms/payment/FormPayment';

export const CreatePayment = () => {
  const { mutate, isPending } = usePostPayment();

  const navigate = useNavigate();

  const handleSubmit = async (values: any) => {
    mutate(values, {
      onSuccess: () => {
        navigate(MODULE_PAYMENTS_PATHS.ViewAll);
      },
    });
  };

  return (
    <>
      <BreadCrumb
        items={[{ link: MODULE_PAYMENTS_PATHS.ViewAll, name: 'Pagos' }]}
        finalItem={`Registro`}
      />
      <FormPayment onSubmit={handleSubmit} isSubmitting={isPending} />
    </>
  );
};
export default CreatePayment;
