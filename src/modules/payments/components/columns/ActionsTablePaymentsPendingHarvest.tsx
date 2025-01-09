import {
  ActionCopyIdRecord,
  DropDownMenuActions,
} from '@/modules/core/components';
import { toast } from 'sonner';
import { ActionPayPendingPayment } from './ActionPayPendingPayment';
import { HarvestDetail } from '@/modules/harvests/interfaces';
import { Row } from '@tanstack/react-table';
import { useFormPaymentContext } from '../../hooks/context/useFormPaymentContext';

export const ActionsTablePaymentsPendingHarvest: React.FC<{
  row: Row<HarvestDetail>;
}> = ({ row }) => {
  const harvestDetail = row.original;

  const { addRecordToPay } = useFormPaymentContext();

  const {
    harvest: { date },
    id,
    value_pay,
    payment_is_pending,
  } = harvestDetail;

  const handlePayRecord = () => {
    addRecordToPay({
      id,
      value_pay,
      payment_is_pending,
      date,
      type: 'harvest',
    });

    toast.success(`Se ha añadido la cosecha para pagarla`);
  };

  return (
    <DropDownMenuActions>
      <ActionCopyIdRecord id={id!} />
      <ActionPayPendingPayment action={handlePayRecord} />
    </DropDownMenuActions>
  );
};
