import {
  ActionCopyIdRecord,
  ActionNavigate,
  DropDownMenuActions,
} from '@/modules/core/components';
import { MODULE_SALES_PATHS } from '@/modules/sales/routes/pathRoutes';
import { Row } from '@tanstack/react-table';
import { ShieldCheck } from 'lucide-react';

interface Props {
  row: Row<any>;
}

export const ActionsTableSaleDetailCrop: React.FC<Props> = ({ row }) => {
  const saleDetail = row.original;

  return (
    <DropDownMenuActions>
      <ActionCopyIdRecord id={saleDetail?.id!} />
      <ActionNavigate
        path={MODULE_SALES_PATHS.ViewOne + saleDetail.sale?.id}
        Icon={ShieldCheck}
        name={'Consultar'}
        target="_blank"
      />
    </DropDownMenuActions>
  );
};
