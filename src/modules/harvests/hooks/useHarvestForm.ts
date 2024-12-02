import { useCreateForm } from '@/modules/core/hooks/useCreateForm';
import { useAppSelector } from '@/redux/store';
import { useState } from 'react';
import { formSchemaHarvest } from '../utils';

export const defaultValuesHarvest = {
  date: undefined,
  crop: {
    id: undefined,
  },

  total: undefined,
  value_pay: undefined,
  observation: '',
};

export const useHarvestForm = ({
  values = defaultValuesHarvest,
}: {
  values?: any;
}) => {
  const [openPopoverCrop, setOpenPopoverCrop] = useState(false);
  const [isOpenDialogForm, setIsOpenDialogForm] = useState(false);
  const [isOpenDialogModifyForm, setIsOpenDialogModifyForm] = useState(false);
  const [harvestDetail, setHarvestDetail] = useState({});

  const formHarvest = useCreateForm({
    schema: formSchemaHarvest,
    defaultValues: values,
  });

  const { details, total, value_pay } = useAppSelector(
    (state: any) => state.harvest
  );

  return {
    details,
    form: formHarvest,
    harvestDetail,
    isOpenDialogForm,
    isOpenDialogModifyForm,
    setHarvestDetail,
    setIsOpenDialogForm,
    setIsOpenDialogModifyForm,
    total,
    value_pay,
    openPopoverCrop,
    setOpenPopoverCrop,
  };
};
