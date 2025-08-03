import {
  ActionCopyIdRecord,
  ActionNavigate,
  DropDownMenuActions,
} from '@/modules/core/components';
import { HarvestProcessed } from '@/modules/harvests/interfaces';
import { MODULE_HARVESTS_PATHS } from '@/modules/harvests/routes/pathRoutes';
import { Row } from '@tanstack/react-table';
import { ShieldCheck } from 'lucide-react';

interface Props {
  row: Row<HarvestProcessed>;
}

export const ActionsTableHarvestProcessedCrop: React.FC<Props> = ({ row }) => {
  const harvestProcessed = row.original;

  return (
    <DropDownMenuActions>
      <ActionCopyIdRecord id={harvestProcessed?.id!} />
      <ActionNavigate
        path={MODULE_HARVESTS_PATHS.Processed + harvestProcessed?.harvest.id}
        Icon={ShieldCheck}
        name={'Consultar'}
        target="_blank"
      />
    </DropDownMenuActions>
  );
};
