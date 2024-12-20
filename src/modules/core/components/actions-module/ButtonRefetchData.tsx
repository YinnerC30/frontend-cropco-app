import { Button } from '@/components';
import { RefreshCw } from 'lucide-react';
import { ToolTipTemplate } from '../shared/ToolTipTemplate';
import { memo } from 'react';

interface Props {
  onClick: () => void;
  disabled: boolean;
  className?: string;
}

export const ButtonRefetchData = memo(
  ({ onClick, disabled = false, className }: Props) => {
    return (
      <ToolTipTemplate content="Recargar datos de la tabla">
        <Button
          className={className}
          onClick={onClick}
          disabled={disabled}
          variant="outline"
          size="icon"
        >
          <RefreshCw className="w-4 h-4" />
          <span className="sr-only">Recargar datos</span>
        </Button>
      </ToolTipTemplate>
    );
  }
);
