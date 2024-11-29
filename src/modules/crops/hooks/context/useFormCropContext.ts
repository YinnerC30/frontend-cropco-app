import { useContext } from 'react';
import { FormCropContext } from '../../components/form';

export const useFormCropContext = () => {
  const context = useContext(FormCropContext);
  if (!context) {
    throw new Error(
      'useFormCropContext must be used within a FormCropProvider'
    );
  }
  return context;
};
