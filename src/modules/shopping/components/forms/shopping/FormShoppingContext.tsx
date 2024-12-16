import React, { createContext, useEffect, useState } from 'react';

import { useNavigate } from 'react-router-dom';

import { useAuthContext } from '@/auth/hooks';
import { useDialogStatus } from '@/components/common/DialogStatusContext';
import { useCreateForm } from '@/modules/core/hooks';
import { useGetAllSuppliers } from '@/modules/suppliers/hooks';
import { Supplier } from '@/modules/suppliers/interfaces/Supplier';

import { useFormChange } from '@/modules/core/components';
import { useDataTableGeneric } from '@/modules/core/hooks/data-table/useDataTableGeneric';

import { toast } from 'sonner';

import { useCreateColumnsTable } from '@/modules/core/hooks/data-table/useCreateColumnsTable';
import { ShoppingDetail } from '@/modules/shopping/interfaces';
import { MODULE_SHOPPING_PATHS } from '@/modules/shopping/routes/pathRoutes';
import { formSchemaShopping } from '@/modules/shopping/utils';
import { formSchemaShoppingDetail } from '@/modules/shopping/utils/formSchemaShoppingDetail';
import { useGetAllSupplies } from '@/modules/supplies/hooks';
import { ActionsTableShoppingDetail } from './details/ActionsTableShoppingDetail';
import { columnsShoppingDetail } from './details/ColumnsTableShoppingDetail';

export const FormShoppingContext = createContext<any>(null);

export const defaultValuesShoppingDetail: ShoppingDetail | any = {
  id: '',
  supplier: {
    id: '',
    first_name: '',
  },
  supply: {
    id: '',
    name: '',
  },
  total: 0,
  amount: 0,
};

export const FormShoppingProvider = ({
  children,
  defaultValues,
  isSubmitting,
  onSubmit,
  readOnly,
}: any & { children: React.ReactNode }) => {
  const [isOpenDialogForm, setIsOpenDialogForm] = useState(false);
  const detailsDefaultValues = defaultValues?.details ?? [];
  const [detailsShopping, setDetailsShopping] = useState(detailsDefaultValues);

  console.log(detailsShopping);

  const removeShoppingDetail = (shoppingDetail: ShoppingDetail) => {
    setDetailsShopping((details: any) =>
      details.filter(
        (detail: ShoppingDetail) => detail.id !== shoppingDetail.id
      )
    );
  };

  const formShopping = useCreateForm({
    schema: formSchemaShopping,
    defaultValues,
  });

  const modifyShoppingDetail = (shoppingDetail: ShoppingDetail) => {
    const data = detailsShopping.filter(
      (item: any) => item.id !== shoppingDetail.id
    );
    setDetailsShopping([...data, shoppingDetail]);
    formShopping.setValue('details', [...data, shoppingDetail], {
      shouldValidate: true,
      shouldDirty: true,
    });
  };

  const resetShoppingDetails = () => {
    setDetailsShopping([]);
  };

  const total = detailsShopping.reduce(
    (total: number, detail: ShoppingDetail) =>
      Number(total) + Number(detail.total),
    0
  );

  const executeValidationFormShopping = async () => {
    return await formShopping.trigger();
  };

  const columnsTable = useCreateColumnsTable({
    columns: columnsShoppingDetail,
    actions: ActionsTableShoppingDetail,
    hiddenActions: readOnly,
  });

  const dataTableShoppingDetail = useDataTableGeneric({
    columns: columnsTable,
    data: detailsShopping,
  });

  const { getIdsToRowsSelected, resetSelectionRows, hasSelectedRecords } =
    dataTableShoppingDetail;

  const { setIsActiveDialog } = useDialogStatus();
  const { hasUnsavedChanges, showToast } = useFormChange();

  const [shoppingDetail, setShoppingDetail] = useState(
    defaultValuesShoppingDetail
  );

  const resetShoppingDetail = () => {
    setShoppingDetail(defaultValuesShoppingDetail);
  };

  const [openDialog, setOpenDialog] = useState(false);

  const navigate = useNavigate();

  const { hasPermission } = useAuthContext();

  const handleReturnToModule = () => {
    navigate(MODULE_SHOPPING_PATHS.ViewAll);
  };

  const formShoppingDetail = useCreateForm({
    schema: formSchemaShoppingDetail,
    defaultValues: shoppingDetail,
    validationMode: 'onSubmit',
  });

  const { query: querySuppliers } = useGetAllSuppliers('');

  const { query: querySupplies } = useGetAllSupplies({
    searchParameter: '',
    allRecords: true,
  });

  const findSupplierName = (id: string): string => {
    return (
      querySuppliers?.data?.rows.find((item: Supplier) => item.id === id)
        ?.first_name || ''
    );
  };
  const findSupplyName = (id: string): string => {
    return (
      querySupplies?.data?.rows.find((item: any) => item.id === id)?.name || ''
    );
  };

  const resetForm = () => {
    formShoppingDetail.reset(defaultValuesShoppingDetail);
  };

  const handleOpenDialog = () => {
    setIsActiveDialog(true);
    setOpenDialog(true);
  };

  const ClearFormShoppingDetail = () => {
    resetForm();
    setIsActiveDialog(false);
    setOpenDialog(false);
  };

  const handleCloseDialog = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    if (hasUnsavedChanges) {
      showToast({
        skiptRedirection: true,
        action: ClearFormShoppingDetail,
      });
      return;
    }
    ClearFormShoppingDetail();
  };

  const getCurrentDataShoppingDetail = () => {
    const values = { ...formShoppingDetail.getValues() };
    const supplierIdForm = values?.supplier?.id;
    const supplyIdForm = values?.supply?.id;
    const nameSupplier = findSupplierName(supplierIdForm);
    const nameSupply = findSupplyName(supplyIdForm);
    const data = {
      ...values,
      total: +values.total,
      amount: +values.amount,
      supplier: { id: supplierIdForm, first_name: nameSupplier },
      supply: { id: supplyIdForm, name: nameSupply },
    };
    return data;
  };

  const filterSuppliersToShow = (): Supplier[] => {
    return (
      querySuppliers?.data?.rows.filter((record: Supplier) => {
        const state = detailsShopping.some(
          (item: ShoppingDetail) => item.supplier.id === record.id
        );
        if (state && record.id !== shoppingDetail?.supplier?.id) {
          return;
        }
        return record;
      }) || []
    );
  };

  const handleDeleteBulkShoppingDetails = () => {
    const recordsIds = getIdsToRowsSelected().map((el: any) => el.id);
    const currentValues = [...formShopping.watch('details')];
    const result = currentValues.filter((element: any) => {
      if (!recordsIds.includes(element.id)) {
        return element;
      }
    });

    for (const record of getIdsToRowsSelected()) {
      removeShoppingDetail(record as ShoppingDetail);
    }
    resetSelectionRows();
    formShopping.setValue('details', result, {
      shouldValidate: true,
      shouldDirty: true,
    });
    toast.success(`Se han eliminado las cosechas!`);
  };

  useEffect(() => {
    formShopping.setValue('total', total, { shouldValidate: true });
  }, [total]);

  return (
    <FormShoppingContext.Provider
      value={{
        form: formShopping,
        isOpenDialogForm,
        setIsOpenDialogForm,
        isSubmitting,
        onSubmit,
        readOnly,
        handleReturnToModule,
        hasPermission,
        total,
        shoppingDetail,
        setShoppingDetail,
        filterSuppliersToShow,
        getCurrentDataShoppingDetail,
        resetForm,
        formShoppingDetail,
        openDialog,
        setOpenDialog,
        handleOpenDialog,
        handleCloseDialog,
        resetShoppingDetail,
        ...dataTableShoppingDetail,
        handleDeleteBulkShoppingDetails,
        hasSelectedRecords,
        executeValidationFormShopping,
        querySuppliers: querySuppliers,
        detailsShopping,
        setDetailsShopping,
        removeShoppingDetail,
        modifyShoppingDetail,
        resetShoppingDetails,
        querySupplies,
      }}
    >
      {children}
    </FormShoppingContext.Provider>
  );
};
