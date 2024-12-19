import { cropcoAPI } from '@/api/cropcoAPI';
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
    staleTime: 60 * 1000 * 60 * 5,
    enabled: stateQuery,
  });

  useEffect(() => {
    if (query.isSuccess) {
      toast.success('Las acciones de la app fueron creadas');
    }
  }, [query.isSuccess]);

  return query;
}
