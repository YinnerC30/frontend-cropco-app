import {
  ActionCopyIdRecord,
  ActionNavigate,
  DropDownMenuActions,
} from '@/modules/core/components';
import { Link } from 'lucide-react';

export const ActionsTablePaymentsToPayView = ({ row }: any) => {
  const record = row.original;

  return (
    <DropDownMenuActions>
      <ActionCopyIdRecord id={record.id} />
      <ActionNavigate
        path={`/${record.type === 'harvest' ? 'harvests' : 'works'}/view/${
          record.type === 'harvest' ? record?.harvest?.id : record?.work?.id
        }`}
        Icon={Link}
        name={'Ver registro'}
      />
    </DropDownMenuActions>
  );
};
