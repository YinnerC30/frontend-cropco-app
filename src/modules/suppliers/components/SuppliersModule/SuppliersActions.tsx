import {
  ButtonClearSelection,
  ButtonCreateRecord,
  ButtonDeleteBulk,
  ButtonRefetchData,
} from '@/modules/core/components';

import { MODULE_SUPPLIER_PATHS } from '../../routes/pathRoutes';
import { useSuppliersModuleContext } from './SuppliersModuleContext';

export const SuppliersActions = () => {
  const {
    query,
    hasPermission,
    hasSelectedRecords,
    resetSelectionRows,
    isPending,
    handleDeleteBulkSuppliers,
  } = useSuppliersModuleContext();

  return (
    <div className="flex justify-between">
      <ButtonRefetchData
        onClick={query.refetch}
        disabled={!hasPermission('suppliers', 'find_all_suppliers')}
        className=""
      />

      <div className="flex items-center gap-1">
        <ButtonClearSelection
          onClick={() => resetSelectionRows()}
          visible={hasSelectedRecords}
        />

        <ButtonDeleteBulk
          disabled={
            isPending || !hasPermission('suppliers', 'remove_bulk_suppliers')
          }
          onClick={handleDeleteBulkSuppliers}
          visible={hasSelectedRecords}
        />

        <ButtonCreateRecord
          route={MODULE_SUPPLIER_PATHS.Create}
          disabled={!hasPermission('suppliers', 'create_supplier')}
          className=""
        />
      </div>
    </div>
  );
};
