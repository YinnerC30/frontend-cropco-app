import {
  ActionCopyIdRecord,
  ActionNavigate,
  DropDownMenuActions,
} from '@/modules/core/components';
import { Harvest } from '@/modules/harvests/interfaces';
import { MODULE_HARVESTS_PATHS } from '@/modules/harvests/routes/pathRoutes';
import { Row } from '@tanstack/react-table';
import { ShieldCheck } from 'lucide-react';

interface Props {
  row: Row<Harvest>;
}

export const ActionsTableHarvestCrop: React.FC<Props> = ({ row }) => {
  const harvest = row.original;

  return (
    <DropDownMenuActions>
      <ActionCopyIdRecord id={harvest?.id!} />
      <ActionNavigate
        path={MODULE_HARVESTS_PATHS.ViewOne + harvest.id}
        Icon={ShieldCheck}
        name={'Consultar'}
        target="_blank"
      />
    </DropDownMenuActions>
  );
};
