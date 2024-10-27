import { DataTable, Loading, SearchBar } from '@/modules/core/components';

import { ScrollArea } from '@/components';
import { ScrollBar } from '@/components/ui/scroll-area';
import { BreadCrumb } from '@/modules/core/components/BreadCrumb';
import { ButtonCreateRecord } from '@/modules/core/components/ButtonCreateRecord';
import { ButtonRefetchData } from '@/modules/core/components/ButtonRefetchData';
import { useBasicQueryData } from '@/modules/core/hooks/useBasicQueryData';
import { useGetAllUsers } from '../hooks/useGetAllUsers';
import { useUserAuthorizationActions } from '../hooks/useUserAuthorizationActions';
import { createColumnsTableUsers } from './ColumnsTableUsers';

import { useWindowSize } from 'react-use';

export const UsersModule = () => {
  const { value } = useBasicQueryData();
  const { width } = useWindowSize();

  const showActionsInFirstColumn = width < 1024;

  console.log(showActionsInFirstColumn);

  const { query, pagination, setPagination } = useGetAllUsers({
    value: value,
  });
  const { authorizationActions, isLoading } = useUserAuthorizationActions();

  if (query.isLoading || isLoading || query.isRefetching) return <Loading />;





  return (
    <div>
      <BreadCrumb finalItem={'Usuarios'} />

      <div className="flex items-center justify-center w-full py-2">
        <SearchBar
          query={value}
          disabled={!authorizationActions.find_all_users.visible}
        />
      </div>

      <div className="pt-5">
        <div className="flex items-center w-[100%] justify-between">
          <ButtonRefetchData
            onClick={query.refetch}
            disabled={!authorizationActions.find_all_users.visible}
          />

          <ButtonCreateRecord
            className="flex items-center justify-end py-2 "
            route={'../create'}
            disabled={!authorizationActions.create_user.visible}
          />
        </div>
        <ScrollArea className="w-[95%] pb-4" type="auto">
          <DataTable
            columns={createColumnsTableUsers(showActionsInFirstColumn)}
            rows={
              (authorizationActions.find_all_users.visible &&
                query.data?.rows) ??
              []
            }
            data={query.data ?? []}
            pagination={pagination}
            setPagination={setPagination}
            errorMessage={`${!authorizationActions.find_all_users.visible
              ? 'No tienes permiso para ver el listado de usuarios 😢'
              : 'No hay registros.'
              }`}
            disabledDoubleClick={!authorizationActions.find_all_users.visible}
          />
          <ScrollBar orientation="horizontal" />
        </ScrollArea>
      </div>
    </div>
  );
};

export default UsersModule;
