import { Button } from '@/components/ui/button';
import { useFormChange } from './form/FormChangeContext';
import { useToastDiscardChanges } from './useToastDiscardChanges';

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
