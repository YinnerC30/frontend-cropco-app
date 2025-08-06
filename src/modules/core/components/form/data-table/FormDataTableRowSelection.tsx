import { useFormDataTableContext } from './FormDataTableContext';

export const FormDataTableRowSelection = () => {
  const { table } = useFormDataTableContext();
  return (
    <div>
      <p className="text-sm font-medium text-muted-foreground">
        N° seleccionados:
        <span className="font-medium" data-testid='data-table-row-selection-number'>
          {' '}
          {table.getSelectedRowModel().rows.length}
        </span>
      </p>
    </div>
  );
};
