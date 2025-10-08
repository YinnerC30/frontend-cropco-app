import { X } from 'lucide-react';

import { ToolTipTemplate } from '../shared/ToolTipTemplate';
import { Button } from '@/components';

interface Props {
  onClearValues: () => void;
  disabled: boolean;
}

export const ButtonClearAllFilters: React.FC<Props> = (props) => {
  const { onClearValues, disabled } = props;
  return (
    <ToolTipTemplate content="Borrar consulta">
      <Button
        variant="outline"
        onClick={() => onClearValues()}
        size={'icon'}
        disabled={disabled}
        className="bg-destructive hover:bg-destructive/80"
      >
        <X className="w-4 h-4" />
      </Button>
    </ToolTipTemplate>
  );
};
