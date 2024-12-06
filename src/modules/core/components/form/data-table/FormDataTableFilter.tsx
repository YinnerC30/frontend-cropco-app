import { Input } from '@/components';
import { useFormDataTableContext } from './FormDataTableContext';

interface Props {
  placeholder: string;
  nameColumnFilter: string;

  className?: string;
}

export const FormDataTableFilter = ({
  placeholder,
  nameColumnFilter,

  className,
}: Props) => {
  const { table, readOnly } = useFormDataTableContext();
  return (
    <div
      className={`flex justify-between gap-2 ${
        !readOnly ? '' : 'hidden'
      } ${className}`}
    >
      <Input
        placeholder={placeholder}
        value={
          (table.getColumn(nameColumnFilter)?.getFilterValue() as string) ?? ''
        }
        onChange={(event) =>
          table.getColumn(nameColumnFilter)?.setFilterValue(event.target.value)
        }
        className="max-w-sm"
      />
    </div>
  );
};
