import React, { createContext, useEffect, useState } from 'react';

import { useNavigate } from 'react-router-dom';

import { useAuthContext } from '@/auth/hooks';
import { useDialogStatus } from '@/components/common/DialogStatusContext';
import { useGetAllClients } from '@/modules/clients/hooks';
import { Client } from '@/modules/clients/interfaces/Client';
import { useCreateForm } from '@/modules/core/hooks';

import { useFormChange } from '@/modules/core/components';
import { useDataTableGeneric } from '@/modules/core/hooks/data-table/useDataTableGeneric';

import { toast } from 'sonner';

import { useCreateColumnsTable } from '@/modules/core/hooks/data-table/useCreateColumnsTable';
import { SaleDetail } from '@/modules/sales/interfaces';
import { MODULE_SALES_PATHS } from '@/modules/sales/routes/pathRoutes';
import { formSchemaSale } from '@/modules/sales/utils';
import { formSchemaSaleDetails } from '@/modules/sales/utils/formSchemaSaleDetail';
import { ActionsTableSaleDetail } from './details/ActionsTableSaleDetail';
import { columnsSaleDetail } from './details/ColumnsTableSaleDetail';
import { useGetAllHarvestsStock } from '@/modules/harvests/hooks';

export const FormSaleContext = createContext<any>(null);

export const defaultValuesSaleDetail: SaleDetail | any = {
  id: '',
  client: {
    id: '',
    first_name: '',
  },
  crop: {
    id: '',
    name: '',
  },
  total: 0,
  quantity: 0,
  is_receivable: false,
};

export const FormSaleProvider = ({
  children,
  defaultValues,
  isSubmitting,
  onSubmit,
  readOnly,
}: any & { children: React.ReactNode }) => {
  const [isOpenDialogForm, setIsOpenDialogForm] = useState(false);
  const detailsDefaultValues = defaultValues?.details ?? [];
  const [detailsSale, setDetailsSale] = useState(detailsDefaultValues);

  console.log(detailsSale);

  const removeSaleDetail = (saleDetail: SaleDetail) => {
    setDetailsSale((details: any) =>
      details.filter((detail: SaleDetail) => detail.id !== saleDetail.id)
    );
  };

  const formSale = useCreateForm({
    schema: formSchemaSale,
    defaultValues,
  });

  const modifySaleDetail = (saleDetail: SaleDetail) => {
    const data = detailsSale.filter((item: any) => item.id !== saleDetail.id);
    setDetailsSale([...data, saleDetail]);
    formSale.setValue('details', [...data, saleDetail], {
      shouldValidate: true,
      shouldDirty: true,
    });
  };

  const resetSaleDetails = () => {
    setDetailsSale([]);
  };

  const total = detailsSale.reduce(
    (total: number, detail: SaleDetail) => Number(total) + Number(detail.total),
    0
  );
  const quantity = detailsSale.reduce(
    (quantity: number, detail: SaleDetail) =>
      Number(quantity) + Number(detail.quantity),
    0
  );

  const executeValidationFormSale = async () => {
    return await formSale.trigger();
  };

  const columnsTable = useCreateColumnsTable({
    columns: columnsSaleDetail,
    actions: ActionsTableSaleDetail,
    hiddenActions: readOnly,
  });

  const dataTableSaleDetail = useDataTableGeneric({
    columns: columnsTable,
    data: detailsSale,
  });

  const { getIdsToRowsSelected, resetSelectionRows, hasSelectedRecords } =
    dataTableSaleDetail;

  const { setIsActiveDialog } = useDialogStatus();
  const { hasUnsavedChanges, showToast } = useFormChange();

  const [saleDetail, setSaleDetail] = useState(defaultValuesSaleDetail);

  const resetSaleDetail = () => {
    setSaleDetail(defaultValuesSaleDetail);
  };

  const [openDialog, setOpenDialog] = useState(false);

  const navigate = useNavigate();

  const { hasPermission } = useAuthContext();

  const handleReturnToModule = () => {
    navigate(MODULE_SALES_PATHS.ViewAll);
  };

  const formSaleDetail = useCreateForm({
    schema: formSchemaSaleDetails,
    defaultValues: saleDetail,
    validationMode: 'onSubmit',
  });

  const { query: queryClients } = useGetAllClients('');

  const { query: queryCrops } = useGetAllHarvestsStock('');

  const findClientName = (id: string): string => {
    return (
      queryClients?.data?.rows.find((item: Client) => item.id === id)
        ?.first_name || ''
    );
  };
  const findCropName = (id: string): string => {
    return (
      queryCrops?.data?.rows.find((item: any) => item.id === id)?.name || ''
    );
  };

  const resetForm = () => {
    formSaleDetail.reset(defaultValuesSaleDetail);
  };

  const handleOpenDialog = () => {
    setIsActiveDialog(true);
    setOpenDialog(true);
  };

  const ClearFormSaleDetail = () => {
    resetForm();
    setIsActiveDialog(false);
    setOpenDialog(false);
  };

  const handleCloseDialog = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    if (hasUnsavedChanges) {
      showToast({
        skiptRedirection: true,
        action: ClearFormSaleDetail,
      });
      return;
    }
    ClearFormSaleDetail();
  };

  const getCurrentDataSaleDetail = () => {
    const values = { ...formSaleDetail.getValues() };
    const clientIdForm = values?.client?.id;
    const cropIdForm = values?.crop?.id;
    const nameClient = findClientName(clientIdForm);
    const nameCrop = findCropName(cropIdForm);
    const data = {
      ...values,
      total: +values.total,
      quantity: +values.quantity,
      client: { id: clientIdForm, first_name: nameClient },
      crop: { id: cropIdForm, name: nameCrop },
    };
    return data;
  };

  const filterClientsToShow = (): Client[] => {
    return (
      queryClients?.data?.rows.filter((record: Client) => {
        const state = detailsSale.some(
          (item: SaleDetail) => item.client.id === record.id
        );
        if (state && record.id !== saleDetail?.client?.id) {
          return;
        }
        return record;
      }) || []
    );
  };

  const handleDeleteBulkSaleDetails = () => {
    const recordsIds = getIdsToRowsSelected().map((el: any) => el.id);
    const currentValues = [...formSale.watch('details')];
    const result = currentValues.filter((element: any) => {
      if (!recordsIds.includes(element.id)) {
        return element;
      }
    });

    for (const record of getIdsToRowsSelected()) {
      removeSaleDetail(record as SaleDetail);
    }
    resetSelectionRows();
    formSale.setValue('details', result, {
      shouldValidate: true,
      shouldDirty: true,
    });
    toast.success(`Se han eliminado las cosechas!`);
  };

  useEffect(() => {
    formSale.setValue('total', total, { shouldValidate: true });
    formSale.setValue('quantity', quantity, { shouldValidate: true });
  }, [total, quantity]);

  console.log({ total, quantity, detailsSale, formSale });

  console.log(formSale.getValues('details'));

  return (
    <FormSaleContext.Provider
      value={{
        form: formSale,
        isOpenDialogForm,
        setIsOpenDialogForm,
        isSubmitting,
        onSubmit,
        readOnly,
        handleReturnToModule,
        hasPermission,
        total,
        saleDetail,
        setSaleDetail,
        filterClientsToShow,
        getCurrentDataSaleDetail,
        resetForm,
        formSaleDetail,
        openDialog,
        setOpenDialog,
        handleOpenDialog,
        handleCloseDialog,
        resetSaleDetail,
        ...dataTableSaleDetail,
        handleDeleteBulkSaleDetails,
        hasSelectedRecords,
        executeValidationFormSale,
        queryClients: queryClients,
        detailsSale,
        setDetailsSale,
        removeSaleDetail,
        modifySaleDetail,
        resetSaleDetails,
        quantity,
        queryCrops
      }}
    >
      {children}
    </FormSaleContext.Provider>
  );
};
