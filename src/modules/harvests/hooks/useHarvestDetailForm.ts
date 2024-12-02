import { useCreateForm } from '@/modules/core/hooks/useCreateForm';
import { formSchemaHarvestDetail } from '../utils/formSchemaHarvestDetail';

import { useAppSelector } from '@/redux/store';
import { useState } from 'react';
import { HarvestDetail } from '../interfaces/HarvestDetail';
import { useFormHarvestContext } from './context/useFormHarvestContext';

const defaultValuesHarvestDetail: HarvestDetail = {
  employee: {
    id: '',
    first_name: '',
  },
  total: 0,
  value_pay: 0,
};

export const useHarvestDetailForm = () => {
  const { harvestDetail } = useFormHarvestContext();
  const details: HarvestDetail[] = useAppSelector(
    (state: any) => state.harvest.details
  );

  const formHarvestDetail = useCreateForm({
    schema: formSchemaHarvestDetail,
    defaultValues: harvestDetail,
  });

  console.log(harvestDetail);

  const [openPopoverEmployee, setOpenPopoverEmployee] = useState(false);
  return {
    formHarvestDetail,
    details,
    openPopoverEmployee,
    setOpenPopoverEmployee,
  };
};
