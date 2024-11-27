import { Button } from '@/components';
import { Plus } from 'lucide-react';
import { Link } from 'react-router-dom';
import { ToolTipTemplate } from '../ToolTipTemplate';


interface Props {
  route: any;
  className?: string;
  disabled?: boolean;
}

export const ButtonCreateRecord = ({
  route,
  className = '',
  disabled = false,
}: Props) => {
  return (
    <ToolTipTemplate content={'Crear registro'}>
      <Button variant="outline" size="icon" disabled={disabled} asChild>
        <Link
          to={!disabled && route}
          className={`${className}  ${disabled && 'opacity-50 cursor-default'}`}
        >
          <Plus className="w-4 h-4" />
          <span className="sr-only">Crear nuevo registro</span>
        </Link>
      </Button>
    </ToolTipTemplate>
  );
};
