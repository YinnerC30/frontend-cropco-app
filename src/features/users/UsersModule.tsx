import { DataTable } from '@/components/data-table/DataTable';
import { useGetAllUsersQuery } from '@/services/cropco';
import { columns } from './columns-users';

export const UsersModule = () => {
  const { data, isLoading } = useGetAllUsersQuery({});

  return (
    <>
      {isLoading ? (
        <h1>Cargando...</h1>
      ) : (
        <div className="container mx-auto py-10">
          <DataTable columns={columns} data={data} />
        </div>
      )}
    </>
  );
};

export default UsersModule;
