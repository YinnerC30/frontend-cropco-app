import { useContext } from 'react';
import { FormConsumptionContext } from '../../components/forms/consumption/FormConsumptionContext';

export const useFormConsumptionContext = () => {
  const context = useContext(FormConsumptionContext);
  if (!context) {
    throw new Error(
      'useFormConsumptionContext must be used within a FormConsumptionProvider'
    );
  }
  return context;
};
