import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components';
import { useFormDataTableContext } from './FormDataTableContext';

export const FormDataTableSelectPageSize = () => {
  const { table } = useFormDataTableContext();
  return (
    <div className="flex items-center space-x-2 ">
      <p className="text-sm font-medium text-muted-foreground">N° registros</p>
      <Select
        value={`${table.getState().pagination.pageSize}`}
        onValueChange={(value) => {
          table.setPageSize(Number(value));
        }}
      >
        <SelectTrigger className="h-8 w-[70px]">
          <SelectValue
            className="font-medium text-muted-foreground"
            placeholder={table.getState().pagination.pageSize}
          />
        </SelectTrigger>
        <SelectContent side="top">
          {[10, 20, 30, 40, 50].map((pageSize) => (
            <SelectItem key={pageSize} value={`${pageSize}`}>
              {pageSize}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
};
