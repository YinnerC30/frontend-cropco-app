import { Button } from '@/components';
import { RefreshCw } from 'lucide-react';
import { ToolTipTemplate } from '../shared/ToolTipTemplate';
import { memo } from 'react';

interface Props {
  onClick: () => Promise<void>;
  disabled: boolean;
  className?: string;
  content?: string;
}

export const ButtonRefetchData = memo(
  ({
    onClick,
    disabled = false,
    className,
    content = 'Actualizar datos de la consulta',
  }: Props) => {
    return (
      <ToolTipTemplate content={content}>
        <Button
          className={className}
          onClick={onClick}
          disabled={disabled}
          variant="outline"
          size="icon"
          type="button"
        >
          <RefreshCw className="w-4 h-4" />
          <span className="sr-only">Recargar datos</span>
        </Button>
      </ToolTipTemplate>
    );
  }
);
