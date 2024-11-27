import { Button } from '@/components';
import { XCircle } from 'lucide-react';
import { ToolTipTemplate } from '../ToolTipTemplate';


export const ButtonClearSelection = ({ onClick, className, visible }: any) => {
  return (
    <ToolTipTemplate content="Borrar selección">
      <Button
        onClick={onClick}
        className={`mr-4 ${className} ${!visible && 'hidden'}`}
        variant={'outline'}
      >
        <XCircle className="w-4 h-4" />
        <span className="sr-only">Limpiar selección</span>
      </Button>
    </ToolTipTemplate>
  );
};
