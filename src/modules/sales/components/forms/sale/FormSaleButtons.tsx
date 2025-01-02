import { Button } from '@/components';
import { ButtonsForm } from '@/modules/core/components';
import { useFormSaleContext } from '@/modules/sales/hooks/context/useFormSaleContext';
import { MODULE_SALES_PATHS } from '@/modules/sales/routes/pathRoutes';
import React from 'react';
import { useNavigate } from 'react-router-dom';

export const FormSaleButtons: React.FC = () => {
  const { readOnly, isSubmitting } = useFormSaleContext();

  const navigate = useNavigate();

  const handleReturnToModule = () => {
    navigate(MODULE_SALES_PATHS.ViewAll);
  };

  return readOnly ? (
    <Button className="my-2" onClick={handleReturnToModule}>
      Volver
    </Button>
  ) : (
    <ButtonsForm
      actionToCancel={handleReturnToModule}
      isPending={isSubmitting}
      formId="formSale"
      className="flex w-48 gap-2 mt-2"
    />
  );
};
