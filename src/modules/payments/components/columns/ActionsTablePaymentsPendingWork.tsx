import {
  ActionCopyIdRecord,
  DropDownMenuActions,
} from '@/modules/core/components';
import { useAppDispatch } from '@/redux/store';
import { toast } from 'sonner';
import { addRecordToPay, calculateTotal } from '../../utils/paymentSlice';
import { ActionPayPendingPayment } from './ActionPayPendingPayment';

export const ActionsTablePaymentsPendingWork = ({ row }: any) => {
  const workDetail = row.original;

  const {
    work: { date },
    id,
    total,
    value_pay,
    payment_is_pending,
  } = workDetail;

  const dispatch = useAppDispatch();

  const handlePayRecord = () => {
    dispatch(
      addRecordToPay({
        date,
        id,
        total,
        value_pay,
        payment_is_pending,
        type: 'work',
        work: { id: workDetail?.work?.id },
      })
    );
    dispatch(calculateTotal());
    toast.success(`Se ha añadido el trabajo para pagarlo`);
  };

  return (
    <DropDownMenuActions>
      <ActionCopyIdRecord id={id} />
      <ActionPayPendingPayment action={handlePayRecord} />
    </DropDownMenuActions>
  );
};
