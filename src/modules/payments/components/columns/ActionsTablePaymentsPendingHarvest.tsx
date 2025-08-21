import {
  ActionCopyIdRecord,
  ActionNavigate,
  DropDownMenuActions,
} from '@/modules/core/components';
import { HarvestDetail } from '@/modules/harvests/interfaces';
import { MODULE_HARVESTS_PATHS } from '@/modules/harvests/routes/pathRoutes';
import { Row } from '@tanstack/react-table';
import { ShieldCheck } from 'lucide-react';
import { toast } from 'sonner';
import { useFormPaymentContext } from '../../hooks/context/useFormPaymentContext';
import { ActionPayPendingPayment } from './ActionPayPendingPayment';

export const ActionsTablePaymentsPendingHarvest: React.FC<{
  row: Row<HarvestDetail>;
}> = ({ row }) => {
  const harvestDetail = row.original;

  const { addRecordToPay } = useFormPaymentContext();

  const { harvest, id, value_pay } = harvestDetail;

  const handlePayRecord = () => {
    addRecordToPay({
      id: id!,
      value_pay,
      payment_is_pending: true,
      date: harvest?.date!,
      type: 'harvest',
    });

    toast.success(`Se ha añadido la cosecha a la cola de pagos`);
  };

  return (
    <DropDownMenuActions idRecord={id!}>
      <ActionCopyIdRecord id={id!} />
      <ActionPayPendingPayment action={handlePayRecord} />
      <ActionNavigate
        path={MODULE_HARVESTS_PATHS.ViewOne + harvest?.id}
        Icon={ShieldCheck}
        name={'Consultar'}
        target="_blank"
      />
    </DropDownMenuActions>
  );
};
