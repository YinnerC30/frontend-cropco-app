import { ColumnDef, Row } from '@tanstack/react-table';
import { CheckboxTable } from '../../components';
import { useResponsiveWindow } from '../useResponsiveWindow';

interface CreateColumnsProps {
  hiddenActions?: boolean;
  columns: ColumnDef<unknown>[];
  actions: ({ row }: { row: Row<unknown> }) => JSX.Element;
  readOnly?: boolean;
}

export const useCreateColumnsTable = ({
  columns: columnsTable,
  actions: actionsTable,
  hiddenActions = false,
}: CreateColumnsProps): ColumnDef<unknown>[] => {
  const { isSmallScreen } = useResponsiveWindow();
  const columns = [...columnsTable];

  const actions = {
    id: 'actions',
    cell: actionsTable,
  };

  if (hiddenActions) {
    return columns;
  }

  columns.unshift(CheckboxTable);

  isSmallScreen ? columns.unshift(actions) : columns.push(actions);
  return columns;
};
