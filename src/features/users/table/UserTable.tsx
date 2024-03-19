import { SearchBar } from '@/components/form/SearchBar';
import { DataTable } from '@/components/table/DataTable';
import { useGetAllUsersQuery } from '@/services/cropco';
import { Outlet } from 'react-router-dom';
import { columns } from './ColumnsUser';

import { useAppSelector } from '@/app/hooks';
import { Button } from '@/components/ui/button';

import { Link } from 'react-router-dom';

export const UserTable = () => {
  const parameter = useAppSelector(state => state.usersModule.searchParameter);
  const { data, isLoading } = useGetAllUsersQuery({ parameter });
  return (
    <>
      {isLoading ? (
        <h1>Cargando...</h1>
      ) : (
        <div>
          <div className="container mx-auto py-10">
            <Button asChild>
              <Link to="create">Crear usuario</Link>
            </Button>
            <SearchBar searchTerms={['nombre', 'email']} />
            <DataTable columns={columns} data={data} />
            <Outlet />
          </div>
        </div>
      )}
    </>
  );
};
