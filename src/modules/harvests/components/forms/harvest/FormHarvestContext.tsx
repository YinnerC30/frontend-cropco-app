import React, { createContext, useEffect, useState } from 'react';

import { useNavigate } from 'react-router-dom';

import { useAuthContext } from '@/auth/hooks';
import { useHarvestForm } from '@/modules/harvests/hooks';
import { MODULE_HARVESTS_PATHS } from '@/modules/harvests/routes/pathRoutes';
import { add, calculateTotal } from '@/modules/harvests/utils/harvestSlice';
import { AppDispatch, useAppDispatch, useAppSelector } from '@/redux/store';

export const FormHarvestContext = createContext<any>(null);

export const FormHarvestProvider = ({
  children,
  defaultValues,
  isSubmitting,
  onSubmit,
  readOnly,
}: any & { children: React.ReactNode }) => {
  const formState = useHarvestForm({
    values: defaultValues,
  });

  const [harvestDetail, setHarvestDetail] = useState({});

  const { form } = formState;

  const { details, total, value_pay } = useAppSelector(
    (state: any) => state.harvest
  );
  const navigate = useNavigate();

  const { hasPermission } = useAuthContext();

  const handleReturnToModule = () => {
    navigate(MODULE_HARVESTS_PATHS.ViewAll);
  };

  const dispatch: AppDispatch = useAppDispatch();

  useEffect(() => {
    if (defaultValues) {
      dispatch(add(defaultValues.details));
      dispatch(calculateTotal());
    }
  }, [defaultValues]);

  useEffect(() => {
    dispatch(calculateTotal());
  }, [details]);

  useEffect(() => {
    form.reset({
      ...form.getValues(),
      total,
      value_pay,
    });
  }, [total, value_pay]);

  useEffect(() => {
    form.setValue('details', details);
  }, [details]);

  return (
    <FormHarvestContext.Provider
      value={{
        ...formState,
        isSubmitting,
        onSubmit,
        readOnly,
        handleReturnToModule,
        hasPermission,
        details,
        total,
        value_pay,
        harvestDetail,
        setHarvestDetail,
      }}
    >
      {children}
    </FormHarvestContext.Provider>
  );
};
