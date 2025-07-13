import {
  ActionCopyIdRecord,
  ActionNavigate,
  DropDownMenuActions,
} from '@/modules/core/components';
import { WorkDetail } from '@/modules/work/interfaces/WorkDetail';
import { MODULE_WORKS_PATHS } from '@/modules/work/routes/pathRoutes';
import { Row } from '@tanstack/react-table';
import { ShieldCheck } from 'lucide-react';

interface Props {
  row: Row<WorkDetail>;
}

export const ActionsTableWorkDetailEmployee: React.FC<Props> = ({ row }) => {
  const workDetail = row.original;

  return (
    <DropDownMenuActions>
      <ActionCopyIdRecord id={workDetail?.id!} />
      <ActionNavigate
        path={MODULE_WORKS_PATHS.ViewOne + workDetail.work?.id}
        Icon={ShieldCheck}
        name={'Consultar'}
        target="_blank"
      />
    </DropDownMenuActions>
  );
};
