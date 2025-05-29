import { Button, Input } from '@/components';
import { X } from 'lucide-react';
import { ToolTipTemplate } from '../../shared/ToolTipTemplate';
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
  const { table } = useFormDataTableContext();

  const handleClearFilter = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    table.getColumn(nameColumnFilter)?.setFilterValue('');
    document
      .querySelector<HTMLInputElement>(`input[name="${nameColumnFilter}"]`)
      ?.focus();
  };

  return (
    <div className={`flex justify-between gap-2  ${className}`}>
      <Input
        name={nameColumnFilter}
        placeholder={placeholder}
        value={
          (table.getColumn(nameColumnFilter)?.getFilterValue() as string) ?? ''
        }
        onChange={(event) =>
          table.getColumn(nameColumnFilter)?.setFilterValue(event.target.value)
        }
        className="max-w-sm"
      />
      <ToolTipTemplate content="Eliminar busqueda">
        <Button
          type="button"
          onClick={handleClearFilter}
          size={'icon'}
          variant={'outline'}
          className='bg-destructive hover:bg-destructive/80'
        >
          <X className="w-4 h-4" />
          <span className="sr-only">Limpiar</span>
        </Button>
      </ToolTipTemplate>
    </div>
  );
};
