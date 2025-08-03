import { ConsumptionDetails } from '@/modules/consumption/interfaces';
import { MODULE_CONSUMPTION_PATHS } from '@/modules/consumption/routes/pathRoutes';
import {
  ActionCopyIdRecord,
  ActionNavigate,
  DropDownMenuActions,
} from '@/modules/core/components';
import { Row } from '@tanstack/react-table';
import { ShieldCheck } from 'lucide-react';

interface Props {
  row: Row<ConsumptionDetails>;
}

export const ActionsTableConsumptionCrop: React.FC<Props> = ({ row }) => {
  const consumptionDetail = row.original as any;

  return (
    <DropDownMenuActions>
      <ActionCopyIdRecord id={consumptionDetail?.id!} />
      <ActionNavigate
        path={MODULE_CONSUMPTION_PATHS.ViewOne + consumptionDetail?.consumption.id! || ''}
        Icon={ShieldCheck}
        name={'Consultar'}
        target="_blank"
      />
    </DropDownMenuActions>
  );
};
