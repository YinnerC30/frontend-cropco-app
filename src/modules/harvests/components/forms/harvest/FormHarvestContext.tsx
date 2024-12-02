import React, { createContext } from 'react';

import { useNavigate } from 'react-router-dom';

import { useAuthContext } from '@/auth/hooks';
import { MODULE_HARVESTS_PATHS } from '@/modules/harvests/routes/pathRoutes';
import { useHarvestForm } from '@/modules/harvests/hooks';

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
  const navigate = useNavigate();

  const { hasPermission } = useAuthContext();

  const handleReturnToModule = () => {
    navigate(MODULE_HARVESTS_PATHS.ViewAll);
  };

  return (
    <FormHarvestContext.Provider
      value={{
        ...formState,
        isSubmitting,
        onSubmit,
        readOnly,
        handleReturnToModule,
        hasPermission,
      }}
    >
      {children}
    </FormHarvestContext.Provider>
  );
};
