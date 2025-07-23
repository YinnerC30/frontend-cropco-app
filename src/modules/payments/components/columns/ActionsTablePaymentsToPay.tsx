import {
  ActionCopyIdRecord,
  ActionDeleteRecord,
  ActionNavigate,
  DropDownMenuActions,
} from '@/modules/core/components';
import { Row } from '@tanstack/react-table';
import { toast } from 'sonner';
import { RecordToPay } from '../../interfaces/RecordToPay';
import { useFormPaymentContext } from '../../hooks/context/useFormPaymentContext';
import { ShieldCheck } from 'lucide-react';
import { MODULE_HARVESTS_PATHS } from '@/modules/harvests/routes/pathRoutes';
import { MODULE_WORKS_PATHS } from '@/modules/work/routes/pathRoutes';
import { WorkDetail } from '@/modules/work/interfaces/WorkDetail';
import { HarvestDetail } from '@/modules/harvests/interfaces';

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
      const harvestDetail = paymentsState.original_data?.harvests_detail?.find(
        (item: HarvestDetail) => item.id === id
      );
      return harvestDetail?.harvest?.id || '';
    } else {
      const workDetail = paymentsState.original_data?.works_detail?.find(
        (item: WorkDetail) => item.id === id
      );
      return workDetail?.work?.id || '';
    }
  };

  return (
    <DropDownMenuActions>
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
