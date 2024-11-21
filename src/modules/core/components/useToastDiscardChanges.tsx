import { ToastAction, toast } from '@/components';
import { useNavigate } from 'react-router-dom';
import { useFormChange } from './form/FormChangeContext';

export const useToastDiscardChanges = () => {
  const navigate = useNavigate();

  const { markChanges } = useFormChange();

  const handleToastAction = (route: string, skiptRedirection: boolean) => {
    markChanges(false);
    if (!skiptRedirection) {
      navigate(route);
    }
  };

  const showToast = ({
    route = '/',
    skiptRedirection,
  }: {
    route?: string;
    skiptRedirection: boolean;
  }) => {
    return toast({
      title: '¡Atención! Cambios sin guardar.',
      description: 'Tienes modificaciones pendientes en el formulario.',
      duration: 3_000,
      action: (
        <ToastAction
          altText="Descartar cambios y continuar"
          onClick={() => handleToastAction(route, skiptRedirection)}
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
