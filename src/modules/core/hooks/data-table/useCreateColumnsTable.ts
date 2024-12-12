import { CheckboxTable } from '../../components';
import { useResponsiveWindow } from '../useResponsiveWindow';

interface Props {
  hiddenActions?: boolean;
  columns: any;
  actions: any;
  readOnly?: boolean;
}

export const useCreateColumnsTable = ({
  columns: columnsTable,
  actions: actionsTable,
  hiddenActions = false,
}: Props) => {
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
