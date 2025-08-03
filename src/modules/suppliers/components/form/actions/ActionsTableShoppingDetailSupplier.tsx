import {
  ActionCopyIdRecord,
  ActionNavigate,
  DropDownMenuActions,
} from '@/modules/core/components';
import { MODULE_SHOPPING_PATHS } from '@/modules/shopping/routes/pathRoutes';
import { Row } from '@tanstack/react-table';
import { ShieldCheck } from 'lucide-react';

interface Props {
  row: Row<any>;
}

export const ActionsTableShoppingDetailSupplier: React.FC<Props> = ({ row }) => {
  const shoppingDetail = row.original;

  return (
    <DropDownMenuActions>
      <ActionCopyIdRecord id={shoppingDetail?.id!} />
      <ActionNavigate
        path={MODULE_SHOPPING_PATHS.ViewOne + shoppingDetail.shopping?.id}
        Icon={ShieldCheck}
        name={'Consultar'}
        target="_blank"
      />
    </DropDownMenuActions>
  );
};
