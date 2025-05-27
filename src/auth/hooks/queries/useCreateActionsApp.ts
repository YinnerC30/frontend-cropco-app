import { cropcoAPI } from '@/api/cropcoAPI';
import { getEnvironmentVariables } from '@/modules/core/helpers/getEnvironmentVariables';
import { useQuery } from '@tanstack/react-query';
import { useEffect } from 'react';
import { toast } from 'sonner';

// INFO: Metodo de uso solo en desarrollo
const createActionsApp = async () => {
  return await cropcoAPI.get('auth/module-actions/create');
};

interface Props {
  stateQuery: boolean;
}

export function useCreationsApp({ stateQuery }: Props) {
  const query = useQuery({
    queryKey: ['creation-actions-app'],
    queryFn: () => createActionsApp(),

    enabled:
      stateQuery && getEnvironmentVariables().STATUS_PROJECT === 'development',
  });

  useEffect(() => {
    if (query.isSuccess) {
      toast.success('Las acciones de la app fueron creadas');
    }
  }, [query.isSuccess]);

  return query;
}
