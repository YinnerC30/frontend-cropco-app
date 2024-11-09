import { useEffect } from 'react';
import { ToastAction } from './components/ui/toast';
import { useToast } from './components/ui/use-toast';
import { TIME_QUESTION_RENEW_TOKEN } from './modules/authentication/hooks';
import { useAuthorization } from './modules/authentication/hooks/useAuthorization';
import { useRenewToken } from './modules/authentication/hooks/useRenewToken';

export const useHome = () => {
  const { modulesUser } = useAuthorization();

  const mutationRenewToken = useRenewToken();

  const handleExtendedSesion = () => {
    mutationRenewToken.mutate();
  };

  const { toast } = useToast();

  const showToast = () => {
    return toast({
      title: 'Aumentar tiempo de sesión',

      duration: 3000,
      description:
        'La sesión esta por expirar, si desea continuar por favor presione Clic',
      action: (
        <ToastAction
          onClick={() => {
            handleExtendedSesion();
          }}
          altText="Extender sesión"
        >
          Aumentar
        </ToastAction>
      ),
    });
  };

  useEffect(() => {
    const timeOut = setTimeout(() => {
      showToast();
    }, TIME_QUESTION_RENEW_TOKEN);

    return () => clearTimeout(timeOut);
  }, [mutationRenewToken]);

  return {
    modulesUser,
  };
};
