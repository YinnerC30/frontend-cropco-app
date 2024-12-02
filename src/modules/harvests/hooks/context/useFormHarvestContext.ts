import { useContext } from 'react';
import { FormHarvestContext } from '../../components/forms/harvest/FormHarvestContext';

export const useFormHarvestContext = () => {
  const context = useContext(FormHarvestContext);
  if (!context) {
    throw new Error(
      'useFormHarvestContext must be used within a FormHarvestProvider'
    );
  }
  return context;
};
