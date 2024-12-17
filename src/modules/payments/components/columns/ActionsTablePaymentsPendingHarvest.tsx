import {
  ActionCopyIdRecord,
  DropDownMenuActions,
} from '@/modules/core/components';
import { useAppDispatch } from '@/redux/store';
import { toast } from 'sonner';
import { addRecordToPay, calculateTotal } from '../../utils/paymentSlice';
import { ActionPayPendingPayment } from './ActionPayPendingPayment';

export const ActionsTablePaymentsPendingHarvest = ({ row }: any) => {
  const harvestDetail = row.original;

  const {
    harvest: { date },
    id,
    total,
    value_pay,
    payment_is_pending,
  } = harvestDetail;

  const dispatch = useAppDispatch();

  const handlePayRecord = () => {
    dispatch(
      addRecordToPay({
        date,
        id,
        total,
        value_pay,
        payment_is_pending,
        type: 'harvest',
        harvest: { id: harvestDetail?.harvest?.id },
      })
    );
    dispatch(calculateTotal());
    toast.success(`Se ha añadido la cosecha para pagarla`);
  };

  return (
    <DropDownMenuActions>
      <ActionCopyIdRecord id={id} />
      <ActionPayPendingPayment action={handlePayRecord} />
    </DropDownMenuActions>
  );
};
