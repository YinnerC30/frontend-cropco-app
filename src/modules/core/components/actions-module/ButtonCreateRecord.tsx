import { Button } from '@/components';
import { Plus } from 'lucide-react';
import { Link } from 'react-router-dom';
import { ToolTipTemplate } from '../shared/ToolTipTemplate';
import { memo } from 'react';

interface Props {
  route: string;
  className?: string;
  disabled?: boolean;
}

export const ButtonCreateRecord = memo(
  ({ route, className = '', disabled = false }: Props) => {
    return (
      <ToolTipTemplate content={'Crear registro'}>
        <Button size="icon" disabled={disabled} asChild className={`bg-primary/70 hover:bg-primary/50`}>
          <Link
            to={!disabled ? route : ''}
            className={`${className}  ${
              disabled && 'opacity-50 cursor-default'
            }`}
          >
            <Plus className="w-4 h-4" />
            <span className="sr-only">Crear nuevo registro</span>
          </Link>
        </Button>
      </ToolTipTemplate>
    );
  }
);
