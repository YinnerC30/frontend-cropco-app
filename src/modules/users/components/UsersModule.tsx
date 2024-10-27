import { Loading, SearchBar } from '@/modules/core/components';

import { ScrollArea } from '@/components';
import { ScrollBar } from '@/components/ui/scroll-area';
import { BreadCrumb } from '@/modules/core/components/BreadCrumb';
import { ButtonCreateRecord } from '@/modules/core/components/ButtonCreateRecord';
import { ButtonRefetchData } from '@/modules/core/components/ButtonRefetchData';
import { useBasicQueryData } from '@/modules/core/hooks/useBasicQueryData';
import { useGetAllUsers } from '../hooks/useGetAllUsers';
import { useUserAuthorizationActions } from '../hooks/useUserAuthorizationActions';
import { createColumnsTableUsers } from './ColumnsTableUsers';

import { DataTableHook } from '@/modules/core/components/table/DataTableHook';
import { useDataTable } from '@/modules/core/hooks/useDataTable';
import { useWindowSize } from 'react-use';

export const UsersModule = () => {
  const { value } = useBasicQueryData();
  const { width } = useWindowSize();

  const showActionsInFirstColumn = width < 1024;

  const { query, pagination, setPagination } = useGetAllUsers({
    value: value,
  });
  const { authorizationActions, isLoading } = useUserAuthorizationActions();

  const { table, lengthColumns, getIdsToRowsSelected } = useDataTable({
    columns: createColumnsTableUsers(showActionsInFirstColumn),
    data: query.data ?? [],
    rows: (authorizationActions?.find_all_users?.visible &&
      query.data?.rows) ??
      [],
    pagination,
    setPagination,
  })


  if (query.isLoading || isLoading) return <Loading />;





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
          <DataTableHook
            errorMessage={`${!authorizationActions.find_all_users.visible
              ? 'No tienes permiso para ver el listado de usuarios 😢'
              : 'No hay registros.'}`}
            disabledDoubleClick={!authorizationActions.find_all_users.visible}
            table={table}
            lengthColumns={lengthColumns}
            rowCount={query.data?.rowCount ?? 0} />
          <ScrollBar orientation="horizontal" />
        </ScrollArea>
      </div>
    </div>
  );
};

export default UsersModule;
