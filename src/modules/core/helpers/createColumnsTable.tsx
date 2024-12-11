import { CheckboxTable } from '@/modules/core/components';

interface ValuesCreateColumns {
  actionsInFirstColumn: boolean;
  hiddenActions?: boolean;
  columns: any;
  actions: any;
  readOnly?: boolean;
}

export const createColumnsTable = ({
  actionsInFirstColumn,
  columns: columnsTable,
  actions: actionsTable,
  hiddenActions = false,
  readOnly = false,
}: ValuesCreateColumns) => {
  const columns = [...columnsTable];

  const actions = {
    id: 'actions',
    cell: actionsTable,
  };

  if (hiddenActions) {
    return columns;
  }

  columns.unshift(CheckboxTable);

  actionsInFirstColumn ? columns.unshift(actions) : columns.push(actions);

  return columns;
};

// export default createColumnsTableUsers;
