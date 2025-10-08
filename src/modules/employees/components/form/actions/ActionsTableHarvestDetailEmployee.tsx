import {
  ActionCopyIdRecord,
  ActionNavigate,
  DropDownMenuActions,
} from '@/modules/core/components';
import { HarvestDetailEmployee } from '@/modules/employees/interfaces/HarvestDetailEmployee';
import { MODULE_HARVESTS_PATHS } from '@/modules/harvests/routes/pathRoutes';
import { Row } from '@tanstack/react-table';
import { ShieldCheck } from 'lucide-react';

interface Props {
  row: Row<HarvestDetailEmployee>;
}

export const ActionsTableHarvestDetailEmployee: React.FC<Props> = ({ row }) => {
  const harvestDetail = row.original;

  return (
    <DropDownMenuActions>
      <ActionCopyIdRecord id={harvestDetail?.id!} />
      <ActionNavigate
        path={MODULE_HARVESTS_PATHS.ViewOne + harvestDetail.harvest?.id}
        Icon={ShieldCheck}
        name={'Consultar'}
        target="_blank"
      />
    </DropDownMenuActions>
  );
};
