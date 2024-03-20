import { getUserById } from '@/services/cropcoAPI';

import { useQuery } from '@tanstack/react-query';
import { useParams } from 'react-router-dom';

export const ViewUser = () => {
  const { id } = useParams();

  const { isLoading, data } = useQuery({
    queryKey: ['users'],
    queryFn: () => getUserById({ id }),
  });

  return <>{isLoading ? <h1>Cargando...</h1> : JSON.stringify(data)}</>;
};
