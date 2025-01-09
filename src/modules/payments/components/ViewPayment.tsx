import { BreadCrumb, Loading } from '@/modules/core/components';
import { useParams } from 'react-router-dom';
import { useGetPayment } from '../hooks/queries/useGetPayment';
import { MODULE_PAYMENTS_PATHS } from '../routes/pathRoutes';
import FormPayment from './forms/payment/FormPayment';

export const ViewPayment: React.FC = () => {
  const { id } = useParams();

  const { data, isLoading } = useGetPayment(id!);

  if (isLoading) {
    return <Loading />;
  }

  return (
    <>
      <BreadCrumb
        items={[{ link: MODULE_PAYMENTS_PATHS.ViewAll, name: 'Pagos' }]}
        finalItem={`Información del pago`}
      />
      <FormPayment defaultValues={data} readOnly />
    </>
  );
};
export default ViewPayment;
