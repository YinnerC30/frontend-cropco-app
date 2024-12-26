import { useFormDataTableContext } from './FormDataTableContext';

export const FormDataTableRowCount = () => {
  const { table } = useFormDataTableContext();
  return (
    <p className="text-sm font-medium  text-muted-foreground">
      Total: {table.getCoreRowModel().rows.length}
    </p>
  );
};
