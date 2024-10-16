import { useEffect, useLayoutEffect } from 'react';
import { ToastAction } from './components/ui/toast';
import { useToast } from './components/ui/use-toast';
import { useAuthenticationUser } from './modules/authentication/hooks/useAuthenticationUser';
import { useAuthorizationUser } from './modules/authentication/hooks/useAuthorizationUser';
import { useRenewToken } from './modules/authentication/hooks/useRenewToken';
import { useRoutesManager } from './routes/hooks/useRoutesManager';

export const useHome = () => {
  const { modulesUser } = useAuthorizationUser();

  const { isLogin, tokenSesion, TIME_QUESTION_RENEW_TOKEN } =
    useAuthenticationUser();

  const { redirectToLogin } = useRoutesManager();

  useLayoutEffect(() => {
    if (!isLogin) {
      redirectToLogin();
    }
  }, []);

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
      showToast();
    }, TIME_QUESTION_RENEW_TOKEN);

    return () => clearTimeout(timeOut);
  }, [mutationRenewToken]);

  return {
    modulesUser,
  };
};
