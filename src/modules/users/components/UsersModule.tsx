import { Loading, SearchBar } from '@/modules/core/components';

import { ScrollArea } from '@/components';
import { ScrollBar } from '@/components/ui/scroll-area';
import { BreadCrumb } from '@/modules/core/components/BreadCrumb';
import { ButtonCreateRecord } from '@/modules/core/components/ButtonCreateRecord';
import { ButtonRefetchData } from '@/modules/core/components/ButtonRefetchData';
import { useBasicQueryData } from '@/modules/core/hooks/useBasicQueryData';
import { useGetAllUsers } from '../hooks/useGetAllUsers';
import { createColumnsTableUsers } from './ColumnsTableUsers';

import { useAuthorization } from '@/modules/authentication/hooks/useAuthorization';
import { ButtonDeleteBulk } from '@/modules/core/components/ButtonDeleteBulk';
import { DataTableHook } from '@/modules/core/components/table/DataTableHook';
import { useDataTable } from '@/modules/core/hooks/useDataTable';
import { useEffect } from 'react';
import { useWindowSize } from 'react-use';
import { useDeleteBulkUsers } from '../hooks/useDeleteBulkUsers';

export const UsersModule = () => {
  const { value } = useBasicQueryData();
  const { width } = useWindowSize();

  const showActionsInFirstColumn = width < 1024;

  const { query, pagination, setPagination } = useGetAllUsers({
    value: value,
  });

  const { hasPermission } = useAuthorization();

  const { table, lengthColumns, getIdsToRowsSelected, resetSelectionRows } =
    useDataTable({
      columns: createColumnsTableUsers(showActionsInFirstColumn),
      data: query.data ?? [],
      rows:
        (hasPermission('users', 'find_all_users') && query.data?.rows) ?? [],
      pagination,
      setPagination,
    });

  const { mutate, isPending, isSuccess } = useDeleteBulkUsers();

  const handleDeleteBulkUsers = () => {
    mutate({ userIds: getIdsToRowsSelected() });
  };

  useEffect(() => {
    if (isSuccess) {
      resetSelectionRows();
    }
  }, [isSuccess]);

  if (query.isLoading) return <Loading />;

  return (
    <div>
      <BreadCrumb finalItem={'Usuarios'} />

      <div className="flex items-center justify-center w-full py-2">
        <SearchBar
          query={value}
          disabled={!hasPermission('users', 'find_all_users')}
        />
      </div>

      <div className="pt-5 ">
        <div className="flex items-center w-[100%] justify-between">
          <ButtonRefetchData
            onClick={query.refetch}
            disabled={!hasPermission('users', 'find_all_users')}
          />

          <div className="flex flex-row gap-2">
            <ButtonDeleteBulk
              disabled={
                isPending || !hasPermission('users', 'remove_bulk_users')
              }
              onClick={handleDeleteBulkUsers}
              visible={getIdsToRowsSelected().length > 0}
            />

            <ButtonCreateRecord
              className="flex items-center justify-end py-2 "
              route={'../create'}
              disabled={!hasPermission('users', 'create_user')}
            />
          </div>
        </div>
        <ScrollArea
          className={`w-[95%] pb-4 ${isPending && 'blur-sm'}`}
          type="auto"
        >
          <DataTableHook
            errorMessage={`${
              !hasPermission('users', 'find_all_users')
                ? 'No tienes permiso para ver el listado de usuarios 😢'
                : 'No hay registros.'
            }`}
            disabledDoubleClick={!hasPermission('users', 'find_one_user')}
            table={table}
            lengthColumns={lengthColumns}
            rowCount={query.data?.rowCount ?? 0}
          />
          <ScrollBar orientation="horizontal" />
        </ScrollArea>
      </div>
    </div>
  );
};

export default UsersModule;
