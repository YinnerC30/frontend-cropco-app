import { Input } from '@/components';
import { useFormDataTableContext } from './FormDataTableContext';

interface Props {
  placeholder: string;
  nameColumnFilter: string;
  children: React.ReactNode;
}

export const FormDataTableFilter = ({
  placeholder,
  nameColumnFilter,
  children,
}: Props) => {
  const { table, readOnly } = useFormDataTableContext();
  return (
    <div className={`flex justify-between ${!readOnly ? '' : 'hidden'}`}>
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
      {children}
    </div>
  );
};
