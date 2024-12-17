import { BreadCrumb } from '@/modules/core/components';
import FormPayment from './forms/payment/FormPayment';
import { MODULE_PAYMENTS_PATHS } from '../routes/pathRoutes';
import { usePostPayment } from '../hooks/mutations/usePostPayment';
import { toast } from 'sonner';

export const CreatePayment = () => {
  const { mutate, isPending } = usePostPayment();

  const handleSubmit = async (values: any) => {
    console.log('llego');
    console.log(values);
    mutate(values, {
      onSuccess: () => {
        toast.success('Se pago al empleado');
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
