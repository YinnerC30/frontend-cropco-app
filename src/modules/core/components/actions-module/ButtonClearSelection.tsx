import { Button } from '@/components';
import { XCircle } from 'lucide-react';
import { ToolTipTemplate } from '../shared/ToolTipTemplate';

export const ButtonClearSelection = ({ onClick, className, visible }: any) => {
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    onClick();
  };
  return (
    <ToolTipTemplate content="Borrar selección">
      <Button
        onClick={handleClick}
        className={`${className} ${!visible && 'hidden'}`}
        variant={'outline'}
      >
        <XCircle className="w-4 h-4" />
        <span className="sr-only">Limpiar selección</span>
      </Button>
    </ToolTipTemplate>
  );
};
