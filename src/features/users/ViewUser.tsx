import { useGetUserByIdQuery } from '@/services/cropco';
import { useParams } from 'react-router-dom';

export const ViewUser = () => {
  const { id } = useParams();
  const { data, isLoading } = useGetUserByIdQuery(id);

  return <>{isLoading ? <h1>Cargando...</h1> : JSON.stringify(data)}</>;
};
