import { ToastAction, toast } from '@/components';
import { useNavigate } from 'react-router-dom';
import { useFormChange } from '../components';
import { useDialogStatus } from '@/components/common/DialogStatusContext';

export const useToastDiscardChanges = () => {
  const navigate = useNavigate();

  const { markChanges } = useFormChange();
  const { setIsActiveDialog } = useDialogStatus();
  const handleToastAction = (route: string, skiptRedirection: boolean) => {
    setIsActiveDialog(false);
    markChanges(false);
    if (!skiptRedirection) {
      navigate(route);
    }
  };

  const showToast = ({
    route = '/',
    skiptRedirection = false,
    action,
  }: {
    route?: string;
    skiptRedirection?: boolean;
    action?: () => void;
  }) => {
    return toast({
      title: '¡Atención! Cambios sin guardar.',
      description: 'Tienes modificaciones pendientes en el formulario.',
      duration: 3_000,
      action: (
        <ToastAction
          altText="Descartar cambios y continuar"
          onClick={() => {
            handleToastAction(route, skiptRedirection);
            action && action();
          }}
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
