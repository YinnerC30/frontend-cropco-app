import { BreadCrumb } from '@/modules/core/components';
import { usePostPayment } from '../hooks/mutations/usePostPayment';
import { MODULE_PAYMENTS_PATHS } from '../routes/pathRoutes';
import FormPayment from './forms/payment/FormPayment';

export const CreatePayment: React.FC = () => {
  const { mutate, isPending } = usePostPayment();

  const handleSubmit = (values: any) => {
    mutate({ ...values, employee: { id: values.employee.id } });
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
