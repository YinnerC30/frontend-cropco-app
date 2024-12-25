import React, { createContext, useEffect, useState } from 'react';

import { useNavigate } from 'react-router-dom';

import { useAuthContext } from '@/auth/hooks';
import { useDialogStatus } from '@/components/common/DialogStatusContext';
import { useCreateForm } from '@/modules/core/hooks';

import { useFormChange } from '@/modules/core/components';
import { useDataTableGeneric } from '@/modules/core/hooks/data-table/useDataTableGeneric';

import { toast } from 'sonner';

import { ConsumptionDetails } from '@/modules/consumption/interfaces';
import { MODULE_CONSUMPTION_PATHS } from '@/modules/consumption/routes/pathRoutes';
import { formSchemaConsumption } from '@/modules/consumption/utils';
import { formSchemaConsumptionDetail } from '@/modules/consumption/utils/formSchemaConsumptionDetail';
import { useCreateColumnsTable } from '@/modules/core/hooks/data-table/useCreateColumnsTable';
import { useGetAllSupplies } from '@/modules/supplies/hooks';
import { ActionsTableConsumptionDetail } from '../consumption/details/ActionsTableConsumptionDetail';
import { columnsConsumptionDetail } from '../consumption/details/ColumnsTableConsumptionDetail';
import { useGetAllCrops } from '@/modules/crops/hooks';
import { Crop } from '@/modules/crops/interfaces/Crop';

export const FormConsumptionContext = createContext<any>(null);

export const defaultValuesConsumptionDetail: ConsumptionDetails | any = {
  id: '',
  crop: {
    id: '',
    name: '',
  },
  supply: {
    id: '',
    name: '',
  },
};

export const FormConsumptionProvider = ({
  children,
  defaultValues,
  isSubmitting,
  onSubmit,
  readOnly,
}: any & { children: React.ReactNode }) => {
  const [isOpenDialogForm, setIsOpenDialogForm] = useState(false);
  const detailsDefaultValues = defaultValues?.details ?? [];
  const [detailsConsumption, setDetailsConsumption] =
    useState(detailsDefaultValues);

  const removeConsumptionDetail = (consumptionDetail: ConsumptionDetails) => {
    setDetailsConsumption((details: any) =>
      details.filter(
        (detail: ConsumptionDetails) => detail.id !== consumptionDetail.id
      )
    );
  };

  const formConsumption = useCreateForm({
    schema: formSchemaConsumption,
    defaultValues,
  });

  const modifyConsumptionDetail = (consumptionDetail: ConsumptionDetails) => {
    const data = detailsConsumption.filter(
      (item: any) => item.id !== consumptionDetail.id
    );
    setDetailsConsumption([...data, consumptionDetail]);
    formConsumption.setValue('details', [...data, consumptionDetail], {
      shouldValidate: true,
      shouldDirty: true,
    });
  };

  const resetConsumptionDetails = () => {
    setDetailsConsumption([]);
  };

  const executeValidationFormConsumption = async () => {
    return await formConsumption.trigger();
  };

  const columnsTable = useCreateColumnsTable({
    columns: columnsConsumptionDetail,
    actions: ActionsTableConsumptionDetail,
    hiddenActions: readOnly,
  });

  const dataTableConsumptionDetail = useDataTableGeneric({
    columns: columnsTable,
    data: detailsConsumption,
  });

  const { getIdsToRowsSelected, resetSelectionRows, hasSelectedRecords } =
    dataTableConsumptionDetail;

  const { setIsActiveDialog } = useDialogStatus();
  const { hasUnsavedChanges, showToast } = useFormChange();

  const [consumptionDetail, setConsumptionDetail] = useState(
    defaultValuesConsumptionDetail
  );

  const resetConsumptionDetail = () => {
    setConsumptionDetail(defaultValuesConsumptionDetail);
  };

  const [openDialog, setOpenDialog] = useState(false);

  const navigate = useNavigate();

  const { hasPermission } = useAuthContext();

  const handleReturnToModule = () => {
    navigate(MODULE_CONSUMPTION_PATHS.ViewAll);
  };

  const formConsumptionDetail = useCreateForm({
    schema: formSchemaConsumptionDetail,
    defaultValues: consumptionDetail,
    validationMode: 'onSubmit',
  });

  const { query: queryCrops } = useGetAllCrops({
    allRecords: true,
    queryValue: '',
  });

  const { query: querySupplies } = useGetAllSupplies({
    searchParameter: '',
    allRecords: true,
  });

  const findCropName = (id: string): string => {
    return (
      queryCrops?.data?.rows.find((item: Crop) => item.id === id)?.name || ''
    );
  };
  const findSupplyName = (id: string): string => {
    return (
      querySupplies?.data?.rows.find((item: any) => item.id === id)?.name || ''
    );
  };

  const resetForm = () => {
    formConsumptionDetail.reset(defaultValuesConsumptionDetail);
  };

  const handleOpenDialog = () => {
    setIsActiveDialog(true);
    setOpenDialog(true);
  };

  const ClearFormConsumptionDetail = () => {
    resetForm();
    setIsActiveDialog(false);
    setOpenDialog(false);
  };

  const handleCloseDialog = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    if (hasUnsavedChanges) {
      showToast({
        skiptRedirection: true,
        action: ClearFormConsumptionDetail,
      });
      return;
    }
    ClearFormConsumptionDetail();
  };

  const getCurrentDataConsumptionDetail = () => {
    const values = { ...formConsumptionDetail.getValues() };
    const cropIdForm = values?.crop?.id;
    const supplyIdForm = values?.supply?.id;
    const nameCrop = findCropName(cropIdForm);
    const nameSupply = findSupplyName(supplyIdForm);
    const data = {
      ...values,
      amount: +values.amount,
      supply: { id: supplyIdForm, name: nameSupply },
      crop: { id: cropIdForm, name: nameCrop },
    };
    return data;
  };

  // const filterCropsToShow = (): Crop[] => {
  //   return (
  //     queryCrops?.data?.rows.filter((record: Crop) => {
  //       const state = detailsConsumption.some(
  //         (item: ConsumptionDetails) => item.supplier.id === record.id
  //       );
  //       if (state && record.id !== consumptionDetail?.supplier?.id) {
  //         return;
  //       }
  //       return record;
  //     }) || []
  //   );
  // };

  const handleDeleteBulkConsumptionDetails = () => {
    const recordsIds = getIdsToRowsSelected().map((el: any) => el.id);
    const currentValues = [...formConsumption.watch('details')];
    const result = currentValues.filter((element: any) => {
      if (!recordsIds.includes(element.id)) {
        return element;
      }
    });

    for (const record of getIdsToRowsSelected()) {
      removeConsumptionDetail(record as ConsumptionDetails);
    }
    resetSelectionRows();
    formConsumption.setValue('details', result, {
      shouldValidate: true,
      shouldDirty: true,
    });
    toast.success(`Se han eliminado las cosechas!`);
  };

  return (
    <FormConsumptionContext.Provider
      value={{
        form: formConsumption,
        isOpenDialogForm,
        setIsOpenDialogForm,
        isSubmitting,
        onSubmit,
        readOnly,
        handleReturnToModule,
        hasPermission,
        consumptionDetail,
        setConsumptionDetail,
        getCurrentDataConsumptionDetail,
        resetForm,
        formConsumptionDetail,
        openDialog,
        setOpenDialog,
        handleOpenDialog,
        handleCloseDialog,
        resetConsumptionDetail,
        ...dataTableConsumptionDetail,
        handleDeleteBulkConsumptionDetails,
        hasSelectedRecords,
        executeValidationFormConsumption,
        queryCrops: queryCrops,
        detailsConsumption,
        setDetailsConsumption,
        removeConsumptionDetail,
        modifyConsumptionDetail,
        resetConsumptionDetails,
        querySupplies,
      }}
    >
      {children}
    </FormConsumptionContext.Provider>
  );
};
