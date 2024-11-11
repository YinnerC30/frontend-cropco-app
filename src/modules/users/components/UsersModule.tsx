import { BasicSearchBar } from '@/modules/core/components';

import { ScrollArea, ScrollBar } from '@/components';
import { BreadCrumb } from '@/modules/core/components';
import {
  ButtonCreateRecord,
  ButtonRefetchData,
} from '@/modules/core/components/';
import { useBasicQueryData } from '@/modules/core/hooks/';
import { useGetAllUsers } from '../hooks/useGetAllUsers';
import { createColumnsTableUsers } from './ColumnsTableUsers';

import { useAuthorization } from '@/modules/authentication/hooks';
import { ButtonDeleteBulk, DataTableHook } from '@/modules/core/components';
import { useDataTable } from '@/modules/core/hooks';
import { useWindowSize } from 'react-use';
import { useDeleteBulkUsers } from '../hooks';
import { MODULE_USER_PATHS } from '../routes/pathsRoutes';

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

  const showButtonDeleteBulk = getIdsToRowsSelected().length > 0;

  const { mutate, isPending } = useDeleteBulkUsers({
    actionOnSuccess: resetSelectionRows,
  });

  const handleDeleteBulkUsers = () => {
    mutate({ userIds: getIdsToRowsSelected() });
  };

  return (
    <div className="select-none">
      <div className="flex items-center justify-center w-full py-2">
        <BasicSearchBar
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
              visible={showButtonDeleteBulk}
            />

            <ButtonCreateRecord
              className="px-5 py-1 text-black bg-white rounded-sm "
              route={MODULE_USER_PATHS.Create}
              disabled={!hasPermission('users', 'create_user')}
            />
          </div>
        </div>
        <ScrollArea className={`w-[95%] pb-4 `} type="auto">
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
            isLoading={query.isLoading || query.isRefetching}
          />
          <ScrollBar orientation="horizontal" />
        </ScrollArea>
      </div>
    </div>
  );
};

export default UsersModule;
