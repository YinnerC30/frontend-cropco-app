import { useDataTableContext } from './DataTableContext';

export const DataTableRowCount = () => {
  const { rowCount } = useDataTableContext();
  return (
    <p className="text-sm font-medium text-muted-foreground">
      Total: {rowCount}
    </p>
  );
};
