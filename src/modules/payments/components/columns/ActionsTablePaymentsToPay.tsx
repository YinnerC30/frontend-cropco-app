import {
  ActionCopyIdRecord,
  ActionDeleteRecord,
  ActionNavigate,
  DropDownMenuActions,
} from '@/modules/core/components';
import { MODULE_HARVESTS_PATHS } from '@/modules/harvests/routes/pathRoutes';
import { MODULE_WORKS_PATHS } from '@/modules/work/routes/pathRoutes';
import { Row } from '@tanstack/react-table';
import { ShieldCheck } from 'lucide-react';
import { toast } from 'sonner';
import { useFormPaymentContext } from '../../hooks/context/useFormPaymentContext';
import { RecordToPay } from '../../interfaces/RecordToPay';

export const ActionsTablePaymentsToPay = ({
  row,
}: {
  row: Row<RecordToPay>;
}) => {
  const record: RecordToPay = row.original;

  const dialogDescription =
    'El registro será removido de la tabla actual y regresará a su tabla original.';

  const { removeRecordToPay, paymentsState, readOnly } =
    useFormPaymentContext();

  const handleDelete = () => {
    removeRecordToPay(record);
    toast.success(`Se ha eliminado el registro`);
  };

  const getCorrectId = (id: string, typeRecord: string) => {
    if (typeRecord === 'harvest') {
      const record: any = paymentsState.records_to_pay?.find(
        (item: any) => item.id === id
      );
      return record?.harvest?.id || '';
    } else {
      const record: any = paymentsState.records_to_pay.find(
        (item: any) => item.id === id
      );
      return record?.work?.id || '';
    }
  };

  return (
    <DropDownMenuActions idRecord={record.id}>
      <ActionCopyIdRecord id={record.id} />
      <ActionNavigate
        path={
          record.type === 'harvest'
            ? MODULE_HARVESTS_PATHS.ViewOne + getCorrectId(record.id, 'harvest')
            : MODULE_WORKS_PATHS.ViewOne + getCorrectId(record.id, 'work')
        }
        Icon={ShieldCheck}
        name={'Consultar'}
        target="_blank"
      />
      {!readOnly && (
        <ActionDeleteRecord
          action={handleDelete}
          alertDialogDescription={dialogDescription}
        />
      )}
    </DropDownMenuActions>
  );
};
