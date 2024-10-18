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
import columnsTableUsers from './ColumnsTableUsers';
import { useUserAuthorizationActions } from '../hooks/useUserAuthorizationActions';

export const UsersModule = () => {
  const { value } = useBasicQueryData();

  const { query, pagination, setPagination } = useGetAllUsers({
    value: value,
  });

  const { authorizationActions, isLoading } = useUserAuthorizationActions();

  if (query.isLoading || isLoading) return <Loading />;

  if (query.isError) return <ErrorLoading />;

  return (
    <>
      <BreadCrumb finalItem={'Usuarios'} />

      <ScrollArea className="w-full h-[80vh] ">
        {authorizationActions.find_all_users.visible && (
          <div className="flex items-center justify-center w-full py-2">
            <SearchBar query={value} />
          </div>
        )}
        {authorizationActions.create_user.visible && (
          <div className="flex items-center justify-end w-full py-2">
            <ButtonCreateRecord route={'../create'} />
          </div>
        )}
        {authorizationActions.find_all_users.visible && (
          <div>
            <ButtonRefetchData onClick={query.refetch} />
            <DataTable
              columns={columnsTableUsers}
              rows={query.data?.rows ?? []}
              data={query.data ?? []}
              pagination={pagination}
              setPagination={setPagination}
            />
          </div>
        )}
      </ScrollArea>
    </>
  );
};

export default UsersModule;
