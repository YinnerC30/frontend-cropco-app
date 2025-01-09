import { Button } from '@/components';
import { ButtonsForm } from '@/modules/core/components';
import { useFormPaymentContext } from '@/modules/payments/hooks/context/useFormPaymentContext';
import { MODULE_PAYMENTS_PATHS } from '@/modules/payments/routes/pathRoutes';
import React from 'react';
import { useNavigate } from 'react-router-dom';

export const FormPaymentButtons: React.FC = () => {
  const { readOnly, isSubmitting } = useFormPaymentContext();

  const navigate = useNavigate();

  const handleReturnToModule = () => {
    navigate(MODULE_PAYMENTS_PATHS.ViewAll);
  };

  return readOnly ? (
    <Button className="my-2" onClick={handleReturnToModule}>
      Volver
    </Button>
  ) : (
    <ButtonsForm
      actionToCancel={handleReturnToModule}
      isPending={isSubmitting}
      formId="formPayment"
      className="flex w-48 gap-2 mt-2"
    />
  );
};
