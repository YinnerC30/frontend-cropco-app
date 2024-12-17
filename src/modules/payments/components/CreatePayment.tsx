import { BreadCrumb } from '@/modules/core/components';
import FormPayment from './forms/payment/FormPayment';
import { MODULE_PAYMENTS_PATHS } from '../routes/pathRoutes';

export const CreatePayment = () => {
  return (
    <>
      <BreadCrumb
        items={[{ link: MODULE_PAYMENTS_PATHS.ViewAll, name: 'Pagos' }]}
        finalItem={`Registro`}
      />
      <FormPayment />
    </>
  );
};
