import { useDataTableContext } from './DataTableContext';

export const DataTableRowSelection = () => {
  const { table } = useDataTableContext();
  return (
    <div>
      <p className="text-sm font-medium text-muted-foreground">
        N° seleccionados:
        <span className="font-medium">
          {' '}
          {table.getSelectedRowModel().rows.length}
        </span>
      </p>
    </div>
  );
};