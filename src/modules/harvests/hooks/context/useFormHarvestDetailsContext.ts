import { useContext } from 'react';
import { FormHarvestDetailsContext } from '../../components/forms/harvest/details/FormHarvestDetailsContext';

export const useFormHarvestDetailsContext = () => {
  const context = useContext(FormHarvestDetailsContext);
  if (!context) {
    throw new Error(
      'useFormHarvestDetailsContext must be used within a FormHarvestDetailsProvider'
    );
  }
  return context;
};
