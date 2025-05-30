import { TIME_QUESTION_RENEW_TOKEN } from '@/auth';
import { useAuthContext, useRenewToken } from '@/auth/hooks';
import { useEffect } from 'react';
import { toast } from 'sonner';

export const useHome = () => {
  const { nameModulesUser } = useAuthContext();

  const mutationRenewToken = useRenewToken();

  const handleExtendedSesion = () => {
    mutationRenewToken.mutate();
  };

  const showToast = () => {
    toast('Aumentar tiempo de sesión', {
      description:
        'La sesión esta por expirar, si desea continuar por favor presione Clic',
      action: {
        label: 'Extender sesión',
        onClick: handleExtendedSesion,
      },
      duration: 3000,
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
