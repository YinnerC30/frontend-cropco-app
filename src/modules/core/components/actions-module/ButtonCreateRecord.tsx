import { Button } from '@/components';
import { Plus } from 'lucide-react';
import { ToolTipTemplate } from '../shared/ToolTipTemplate';
import { memo } from 'react';
import { useNavigate } from 'react-router-dom';

interface Props {
  route: string;
  className?: string;
  disabled?: boolean;
}

export const ButtonCreateRecord = memo(
  ({ route, className = '', disabled = false }: Props) => {
    const navigate = useNavigate();

    const handleClick = () => {
      if (!disabled) {
        navigate(route);
      }
    };

    return (
      <ToolTipTemplate content={'Crear registro'}>
        <Button
          data-testid="btn-create-record"
          size="icon"
          disabled={disabled}
          className={`bg-primary/70 hover:bg-primary/50 ${className} ${
            disabled ? 'opacity-50 cursor-default' : ''
          }`}
          onClick={handleClick}
        >
          <Plus className="w-4 h-4" />
          <span className="sr-only">Crear nuevo registro</span>
        </Button>
      </ToolTipTemplate>
    );
  }
);
