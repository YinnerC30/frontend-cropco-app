import { ToastAction, useToast } from '@/components';
import { useNavigate } from 'react-router-dom';
import { useFormChange } from './form/FormChangeContext';

export const useToastDiscardChanges = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const { markChanges } = useFormChange();

  const handleToastAction = (route: string) => {
    markChanges(false);
    navigate(route);
  };

  const showToast = (route: string) => {
    return toast({
      variant: 'destructive',
      title: '¡Atención! Cambios sin guardar.',
      description: 'Tienes modificaciones pendientes en el formulario.',
      duration: 3000,
      action: (
        <ToastAction
          altText="Descartar cambios y continuar"
          onClick={() => handleToastAction(route)}
        >
          Descartar
        </ToastAction>
      ),
    });
  };

  return {
    showToast,
  };
};
