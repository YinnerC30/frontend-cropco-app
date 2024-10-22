import {
  DataTable,
  ErrorLoading,
  Loading,
  SearchBar,
} from '@/modules/core/components';

import { ScrollArea } from '@/components';
import { BreadCrumb } from '@/modules/core/components/BreadCrumb';
import { ButtonCreateRecord } from '@/modules/core/components/ButtonCreateRecord';
import { ButtonRefetchData } from '@/modules/core/components/ButtonRefetchData';
import { useBasicQueryData } from '@/modules/core/hooks/useBasicQueryData';
import { useGetAllUsers } from '../hooks/useGetAllUsers';
import { useUserAuthorizationActions } from '../hooks/useUserAuthorizationActions';
import columnsTableUsers from './ColumnsTableUsers';
import { ScrollBar } from '@/components/ui/scroll-area';

export const UsersModule = () => {
  const { value } = useBasicQueryData();

  const { query, pagination, setPagination } = useGetAllUsers({
    value: value,
  });

  const { authorizationActions, isLoading } = useUserAuthorizationActions();

  if (query.isLoading || isLoading) return <Loading />;

  if (query.isError) return <ErrorLoading />;

  return (
    <div>
      <BreadCrumb finalItem={'Usuarios'} />

      {authorizationActions.find_all_users.visible && (
        <div className="flex items-center justify-center w-full py-2">
          <SearchBar query={value} />
        </div>
      )}

      <div className="pt-5">
        <div className="flex items-center w-[100%] justify-between">
          <ButtonRefetchData onClick={query.refetch} />
          {authorizationActions.create_user.visible && (
            <ButtonCreateRecord
              className="flex items-center justify-end py-2 "
              route={'../create'}
            />
          )}
        </div>
        <ScrollArea className="w-[95%] md:h-auto pb-4" type="auto">
          <DataTable
            columns={columnsTableUsers}
            rows={
              (authorizationActions.find_all_users.visible &&
                query.data?.rows) ??
              []
            }
            data={query.data ?? []}
            pagination={pagination}
            setPagination={setPagination}
            // TODO: Arreglar errorMessage
            errorMessage={`${
              !authorizationActions.find_all_users.visible
                ? 'No tienes permiso para ver el listado de usuarios 😢'
                : null
            }`}
          />
          <ScrollBar orientation="horizontal" />
        </ScrollArea>
      </div>
    </div>
  );
};

export default UsersModule;
