import { TIME_QUESTION_RENEW_TOKEN } from '@/auth';
import { useAuthContext, useRenewToken } from '@/auth/hooks';
import { ToastAction } from '@radix-ui/react-toast';
import { useEffect } from 'react';
import { useToast } from '../ui/use-toast';

export const useHome = () => {
  const { nameModulesUser } = useAuthContext();

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
    nameModulesUser,
  };
};
