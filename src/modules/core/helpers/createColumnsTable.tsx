import { CheckboxTable } from '@/modules/core/components';

interface ValuesCreateColumns {
  actionsInFirstColumn: boolean;
  hiddenActions?: boolean;
  columns: any;
  actions: any;
}

export const createColumnsTable = ({
  actionsInFirstColumn,
  columns: columnsTable,
  actions: actionsTable,
  hiddenActions = false,
}: ValuesCreateColumns) => {
  const columns = [CheckboxTable, ...columnsTable];

  const actions = {
    id: 'actions',
    cell: actionsTable,
  };

  if (hiddenActions) {
    return columns;
  }

  actionsInFirstColumn ? columns.unshift(actions) : columns.push(actions);

  return columns;
};

// export default createColumnsTableUsers;
