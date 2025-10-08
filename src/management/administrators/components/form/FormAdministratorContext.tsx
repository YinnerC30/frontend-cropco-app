import { useCreateForm } from '@/modules/core/hooks';
import React, { createContext, ReactNode, useMemo } from 'react';

import { FormAdministratorProps } from '../../interfaces/form/FormAdministratorProps';

import { FormAdministratorContextProps } from '../../interfaces/context/FormAdministratorContextProps';
import { AdministratorForm } from '../../interfaces/form/AdministratorForm';
import {
  formSchemaAdministrator,
  formSchemaAdministratorWithPassword,
} from '../../utils/formSchemaAdministrator';
import { RolesAdministrator } from '../../interfaces/RolesAdministrator';

export const defaultValues: AdministratorForm = {
  first_name: '',
  last_name: '',
  email: '',
  cell_phone_number: '',
  passwords: {
    password1: '',
    password2: '',
  },
  role: RolesAdministrator.USER,
};

export const FormAdministratorContext = createContext<
  FormAdministratorContextProps | undefined
>(undefined);

export const FormAdministratorProvider: React.FC<
  FormAdministratorProps & { children: ReactNode }
> = ({
  children,
  defaultValues: propsDefaultValues,
  hiddenPassword = false,
  isSubmitting = false,
  onSubmit = (values) => {},
  readOnly = false,
}) => {
  const combinedDefaultValues = useMemo(
    () => ({
      ...defaultValues,
      ...(propsDefaultValues || {}),
      passwords: {
        ...(defaultValues.passwords || {}),
        ...(propsDefaultValues?.passwords || {}),
      },
    }),
    [propsDefaultValues]
  );

  const form = useCreateForm({
    schema: hiddenPassword
      ? formSchemaAdministrator
      : formSchemaAdministratorWithPassword,
    defaultValues: combinedDefaultValues,
    validationMode: 'onSubmit',
  });

  return (
    <FormAdministratorContext.Provider
      value={{
        form,
        isSubmitting,
        onSubmit,
        readOnly,
        hiddenPassword,
      }}
    >
      {children}
    </FormAdministratorContext.Provider>
  );
};

export default FormAdministratorProvider;
