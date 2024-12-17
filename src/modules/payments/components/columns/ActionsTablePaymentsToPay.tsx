import {
  ActionCopyIdRecord,
  ActionDeleteRecord,
  DropDownMenuActions,
} from '@/modules/core/components';
import { useAppDispatch } from '@/redux/store';
import { toast } from 'sonner';
import { calculateTotal, removeRecordToPay } from '../../utils/paymentSlice';

export const ActionsTablePaymentsToPay = ({ row }: any) => {
  const record = row.original;

  const dispatch = useAppDispatch();

  const handleDelete = () => {
    const { date, ...rest } = record;

    const data = {
      ...rest,
      [rest.type === 'harvest' ? 'harvest' : 'work']: {
        id: rest[rest.type === 'harvest' ? 'harvest' : 'work'].id,
        date,
      },
    };

    dispatch(removeRecordToPay({ ...data }));
    dispatch(calculateTotal());
    toast.success(`Se ha eliminado el registro`);
  };

  return (
    <DropDownMenuActions>
      <ActionCopyIdRecord id={record.id} />
      <ActionDeleteRecord action={handleDelete} />
    </DropDownMenuActions>
  );
};
