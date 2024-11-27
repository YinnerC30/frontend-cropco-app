import { Button } from '@/components/ui/button';
import { useFormChange } from '../FormChangeContext';
import { useToastDiscardChanges } from '@/modules/core/hooks/useToastDiscardChanges';


interface Props {
  action: () => void;
}

export const ButtonCancelRegister = ({ action }: Props) => {
  const { hasUnsavedChanges } = useFormChange();
  const { showToast } = useToastDiscardChanges();
  return (
    <Button
      variant={'destructive'}
      onClick={() => {
        if (hasUnsavedChanges) {
          showToast({ route: '../', skiptRedirection: false });
        } else {
          action();
        }
      }}
    >
      Cancelar
    </Button>
  );
};
