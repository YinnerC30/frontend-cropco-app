import { useEffect, useLayoutEffect } from 'react';
import { ToastAction } from './components/ui/toast';
import { useToast } from './components/ui/use-toast';
import { useAuthenticationUser } from './modules/authentication/hooks/useAuthenticationUser';
import { useRenewToken } from './modules/authentication/hooks/useRenewToken';
import { useRoutesManager } from './routes/hooks/useRoutesManager';
import { RootState, useAppSelector } from './redux/store';

export const useHome = () => {
  const { user } = useAppSelector((state: RootState) => state.authentication);
  const modulesUser = user?.modules?.map((module: any) => module?.name) ?? [];

  const { isLogin, tokenSesion } = useAuthenticationUser();

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
    }, 15_000);

    return () => clearTimeout(timeOut);
  }, [mutationRenewToken]);

  return {
    modulesUser,
  };
};
