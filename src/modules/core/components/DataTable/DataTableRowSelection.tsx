import { useDataTableContext } from './DataTableContext';

export const DataTableRowSelection = () => {
  const { table } = useDataTableContext();
  return (
    <div>
      <p className="text-sm font-medium">
        Registros seleccionados: {table.getSelectedRowModel().rows.length}
      </p>
    </div>
  );
};
