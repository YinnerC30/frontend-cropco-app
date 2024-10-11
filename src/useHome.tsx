import { useEffect } from 'react';
import { ToastAction } from './components/ui/toast';
import { useToast } from './components/ui/use-toast';
import { useAuthenticationUser } from './modules/authentication/hooks/useAuthenticationUser';
import { useRenewToken } from './modules/authentication/hooks/useRenewToken';

export const useHome = () => {
  const { tokenSesion } = useAuthenticationUser();
  const mutationRenewToken = useRenewToken();

  const handleExtendedSesion = () => {
    mutationRenewToken.mutate({ token: tokenSesion });
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
      console.log('Mostrando timeout desde hook');
    }, 5000);

    return clearTimeout(timeOut);
  }, []);

  return {
    showToast,
  };
};
