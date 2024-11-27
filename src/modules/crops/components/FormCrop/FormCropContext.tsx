import React, { createContext, useContext } from 'react';

import { useNavigate } from 'react-router-dom';

import { useAuthorization } from '@/modules/authentication/hooks';
import { useCropForm } from '../../hooks/useCropForm';
import { MODULE_CROPS_PATHS } from '../../routes/pathRoutes';

const FormCropContext = createContext<any>(null);

export const FormCropProvider = ({
  children,
  defaultValues,
  hiddenPassword,
  isSubmitting,
  onSubmit,
  readOnly,
}: any & { children: React.ReactNode }) => {
  const formState = useCropForm({
    values: defaultValues,
  });
  const navigate = useNavigate();

  const { hasPermission } = useAuthorization();

  const handleReturnToModule = () => {
    navigate(MODULE_CROPS_PATHS.ViewAll);
  };

  return (
    <FormCropContext.Provider
      value={{
        ...formState,
        isSubmitting,
        onSubmit,
        readOnly,
        handleReturnToModule,
        hiddenPassword,
        hasPermission,
      }}
    >
      {children}
    </FormCropContext.Provider>
  );
};

export const useFormCropContext = () => {
  const context = useContext(FormCropContext);
  if (!context) {
    throw new Error(
      'useFormCropContext must be used within a FormCropProvider'
    );
  }
  return context;
};
