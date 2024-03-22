import { DataTable } from '@/components/table/DataTable';

import { Outlet } from 'react-router-dom';
import { columns } from './ColumnsUser';

import { useAppSelector } from '@/app/hooks';

import { getUsers } from '@/services/cropcoAPI';
import { useQuery } from '@tanstack/react-query';
import { CreateUser } from '../form/CreateUser';

export const UserTable = () => {
  const parameter = useAppSelector(state => state.usersModule.searchParameter);

  const { isLoading, data } = useQuery({
    queryKey: ['users', parameter],
    queryFn: () => getUsers({ parameter }),
  });

  return (
    <>
      {isLoading ? (
        <h1>Cargando...</h1>
      ) : (
        <div>
          <div className="container mx-auto py-10">
            <CreateUser />
            <DataTable columns={columns} data={data} />
            <Outlet />
          </div>
        </div>
      )}
    </>
  );
};
