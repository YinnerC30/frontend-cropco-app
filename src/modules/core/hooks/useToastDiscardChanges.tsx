// import { ToastAction, toast } from '@/components';
import { useNavigate } from 'react-router-dom';
import { useFormChange } from '../components';
import { toast } from 'sonner';

export const useToastDiscardChanges = () => {
  const navigate = useNavigate();

  const { markChanges } = useFormChange();

  const handleToastAction = (route: string, skipRedirection: boolean) => {
    markChanges(false);
    if (!skipRedirection) {
      navigate(route);
    }
  };

  const showToast = ({
    route = '/',
    skipRedirection = false,
    action,
  }: {
    route?: string;
    skipRedirection?: boolean;
    action?: () => void;
  }) => {
    toast('¡Atención! Cambios sin guardar.', {
      description: 'Tienes modificaciones pendientes en el formulario.',
      action: {
        label: 'Ignorar',
        onClick: () => {
          handleToastAction(route, skipRedirection);
          action && action();
        },
      },
    });

    //   return toast({
    //     title: '¡Atención! Cambios sin guardar.',
    //     description: 'Tienes modificaciones pendientes en el formulario.',
    //     duration: 3_000,
    //     action: (
    //       <ToastAction
    //         altText="Descartar cambios y continuar"
    //         onClick={() => {
    //           handleToastAction(route, skipRedirection);
    //           action && action();
    //         }}
    //       >
    //         Descartar
    //       </ToastAction>
    //     ),
    //   });
  };

  return {
    showToast,
  };
};
