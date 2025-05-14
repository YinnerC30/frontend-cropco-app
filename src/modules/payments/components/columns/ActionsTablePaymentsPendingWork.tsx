import {
  ActionCopyIdRecord,
  DropDownMenuActions,
} from '@/modules/core/components';
import { toast } from 'sonner';
import { ActionPayPendingPayment } from './ActionPayPendingPayment';
import { useFormPaymentContext } from '../../hooks/context/useFormPaymentContext';
import { Row } from '@tanstack/react-table';
import { WorkDetail } from '@/modules/work/interfaces/WorkDetail';

export const ActionsTablePaymentsPendingWork: React.FC<{
  row: Row<WorkDetail>;
}> = ({ row }) => {
  const workDetail = row.original;

  const { addRecordToPay } = useFormPaymentContext();

  const {
    id = '',
    value_pay,
    payment_is_pending,
    work,
  } = workDetail;

  const handlePayRecord = () => {
    addRecordToPay({
      id,
      value_pay,
      payment_is_pending: payment_is_pending || false,
      date: work?.date!,
      type: 'work',
    });
    toast.success(`Se ha añadido el trabajo para pagarlo`);
  };

  return (
    <DropDownMenuActions>
      <ActionCopyIdRecord id={id!} />
      <ActionPayPendingPayment action={handlePayRecord} />
    </DropDownMenuActions>
  );
};
