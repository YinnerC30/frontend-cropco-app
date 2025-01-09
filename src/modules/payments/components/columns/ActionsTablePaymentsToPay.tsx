import {
  ActionCopyIdRecord,
  ActionDeleteRecord,
  DropDownMenuActions,
} from '@/modules/core/components';
import { Row } from '@tanstack/react-table';
import { toast } from 'sonner';
import { RecordToPay } from '../../interfaces/RecordToPay';
import { useFormPaymentContext } from '../../hooks/context/useFormPaymentContext';

export const ActionsTablePaymentsToPay = ({
  row,
}: {
  row: Row<RecordToPay>;
}) => {
  const record = row.original;

  const { removeRecordToPay } = useFormPaymentContext();

  const handleDelete = () => {
    removeRecordToPay(record);
    toast.success(`Se ha eliminado el registro`);
  };

  return (
    <DropDownMenuActions>
      <ActionCopyIdRecord id={record.id} />
      <ActionDeleteRecord action={handleDelete} />
    </DropDownMenuActions>
  );
};
