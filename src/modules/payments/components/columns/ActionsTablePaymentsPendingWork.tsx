import {
  ActionCopyIdRecord,
  ActionNavigate,
  DropDownMenuActions,
} from '@/modules/core/components';
import { WorkDetail } from '@/modules/work/interfaces/WorkDetail';
import { MODULE_WORKS_PATHS } from '@/modules/work/routes/pathRoutes';
import { Row } from '@tanstack/react-table';
import { ShieldCheck } from 'lucide-react';
import { toast } from 'sonner';
import { useFormPaymentContext } from '../../hooks/context/useFormPaymentContext';
import { ActionPayPendingPayment } from './ActionPayPendingPayment';

export const ActionsTablePaymentsPendingWork: React.FC<{
  row: Row<WorkDetail>;
}> = ({ row }) => {
  const workDetail = row.original;

  const { addRecordToPay } = useFormPaymentContext();

  const { id = '', value_pay, payment_is_pending, work } = workDetail;

  const handlePayRecord = () => {
    addRecordToPay({
      id,
      value_pay,
      payment_is_pending: payment_is_pending || false,
      date: work?.date!,
      type: 'work',
    });
    toast.success(`Se ha añadido el trabajo a la cola de pagos`);
  };

  return (
    <DropDownMenuActions idRecord={id!}>
      <ActionCopyIdRecord id={id!} />
      <ActionPayPendingPayment action={handlePayRecord} />
      <ActionNavigate
        path={MODULE_WORKS_PATHS.ViewOne + work?.id}
        Icon={ShieldCheck}
        name={'Consultar'}
        target="_blank"
      />
    </DropDownMenuActions>
  );
};
