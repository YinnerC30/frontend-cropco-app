import { useFormDataTableContext } from './FormDataTableContext';

export const FormDataTablePageCount = () => {
  const { table } = useFormDataTableContext();
  const pageText = `Página ${
    table.getState().pagination.pageIndex + 1
  } de ${Math.ceil(
    table.getCoreRowModel().rows.length / table.getState().pagination.pageSize
  )}`;
  return (
    <p className="text-sm font-medium text-center text-muted-foreground">
      {pageText}
    </p>
  );
};
