import {
  ActionCopyIdRecord,
  ActionNavigate,
  DropDownMenuActions,
} from '@/modules/core/components';
import { ShieldCheck } from 'lucide-react';

interface Props {
  id: string;
  path: string;
}

export const ActionsBasicDataTable: React.FC<Props> = ({ path, id }) => {
  return (
    <DropDownMenuActions>
      <ActionCopyIdRecord id={id} />
      <ActionNavigate
        path={path}
        Icon={ShieldCheck}
        name={'Consultar'}
        target="_blank"
      />
    </DropDownMenuActions>
  );
};
