import { ColumnDef, Row } from '@tanstack/react-table';
import { CheckboxTable } from '../../components';
import { useResponsiveWindow } from '../useResponsiveWindow';
import React from 'react';

interface CreateColumnsProps<T> {
  hiddenActions?: boolean;
  columns: ColumnDef<T>[];
  actions: React.FC<{ row: Row<T> }>;
  readOnly?: boolean;
}

export const useCreateColumnsTable = <T>({
  columns: columnsTable,
  actions: actionsTable,
  hiddenActions = false,
}: CreateColumnsProps<T>): ColumnDef<T>[] => {
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
