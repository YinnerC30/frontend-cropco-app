import { useContext } from 'react';
import { FormTenantContext } from '../../components/form';

export const useFormTenantContext = () => {
  const context = useContext(FormTenantContext);
  if (!context) {
    throw new Error(
      'useFormTenantContext must be used within a FormTenantProvider'
    );
  }
  return context;
}; 