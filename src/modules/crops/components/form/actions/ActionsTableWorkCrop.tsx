import {
  ActionCopyIdRecord,
  ActionNavigate,
  DropDownMenuActions,
} from '@/modules/core/components';
import { Work } from '@/modules/work/interfaces/Work';
import { MODULE_WORKS_PATHS } from '@/modules/work/routes/pathRoutes';
import { Row } from '@tanstack/react-table';
import { ShieldCheck } from 'lucide-react';

interface Props {
  row: Row<Work>;
}

export const ActionsTableWorkCrop: React.FC<Props> = ({ row }) => {
  const work = row.original;

  return (
    <DropDownMenuActions>
      <ActionCopyIdRecord id={work?.id!} />
      <ActionNavigate
        path={MODULE_WORKS_PATHS.ViewOne + work.id}
        Icon={ShieldCheck}
        name={'Consultar'}
        target="_blank"
      />
    </DropDownMenuActions>
  );
};
