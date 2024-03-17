import { DataTable } from '@/components/data-table/DataTable';
import { useGetAllUsersQuery } from '@/services/cropco';
import { columns } from './columns-users';
import { Link, Outlet } from 'react-router-dom';

export const UsersModule = () => {
  const { data, isLoading } = useGetAllUsersQuery({});

  return (
    <>
      {isLoading ? (
        <h1>Cargando...</h1>
      ) : (
        <div>
          <Link to="create">Crear usuario</Link>
          <div className="container mx-auto py-10">
            <DataTable columns={columns} data={data} />
          </div>
          <Outlet />
        </div>
      )}
    </>
  );
};

export default UsersModule;
