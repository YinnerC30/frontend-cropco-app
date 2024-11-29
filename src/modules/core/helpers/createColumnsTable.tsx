import { CheckboxTable } from '@/modules/core/components';

interface ValuesCreateColumns {
  actionsInFirstColumn: boolean;
  columns: any;
  actions: any;
}

export const createColumnsTable = ({
  actionsInFirstColumn,
  columns: columnsTable,
  actions: actionsTable,
}: ValuesCreateColumns) => {
  const columns = [CheckboxTable, ...columnsTable];

  const actions = {
    id: 'actions',
    cell: actionsTable,
  };

  actionsInFirstColumn ? columns.unshift(actions) : columns.push(actions);

  return columns;
};

// export default createColumnsTableUsers;
