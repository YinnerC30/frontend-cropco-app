import { Button } from '@/components/ui/button';
import { useToastDiscardChanges } from '@/modules/core/hooks/useToastDiscardChanges';
import React from 'react';
import { useFormChange } from '../FormChangeContext';


interface Props {
  action: () => void;
}

export const ButtonCancelRegister: React.FC<Props> = ({ action }) => {
  const { hasUnsavedChanges } = useFormChange();
  const { showToast } = useToastDiscardChanges();
  return (
    <Button
      variant={'destructive'}
      onClick={() => {
        if (hasUnsavedChanges) {
          showToast({ route: '../', skipRedirection: false });
        } else {
          action();
        }
      }}
    >
      Cancelar
    </Button>
  );
};
