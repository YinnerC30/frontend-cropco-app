import { Outlet } from 'react-router-dom';

import { useAppSelector } from '@/app/hooks';

import { DataTable } from '@/components/table/DataTable';
import { getUsers } from '@/services/cropcoAPI';
import { useQuery } from '@tanstack/react-query';
import { columns } from './ColumnsUser';

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
        <div className="container py-2">
          <DataTable columns={columns} data={data}></DataTable>
          <Outlet />
        </div>
      )}
    </>
  );
};
