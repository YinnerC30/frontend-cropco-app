import {
  ActionCopyIdRecord,
  ActionNavigate,
  DropDownMenuActions,
} from '@/modules/core/components';
import { Payment } from '@/modules/payments/interfaces/Payment';
import { MODULE_PAYMENTS_PATHS } from '@/modules/payments/routes/pathRoutes';
import { Row } from '@tanstack/react-table';
import { ShieldCheck } from 'lucide-react';

interface Props {
  row: Row<Payment>;
}

export const ActionsTablePaymentEmployee: React.FC<Props> = ({ row }) => {
  const payment = row.original;

  return (
    <DropDownMenuActions>
      <ActionCopyIdRecord id={payment?.id!} />
      <ActionNavigate
        path={MODULE_PAYMENTS_PATHS.ViewOne + payment.id}
        Icon={ShieldCheck}
        name={'Consultar'}
        target="_blank"
      />
    </DropDownMenuActions>
  );
};
