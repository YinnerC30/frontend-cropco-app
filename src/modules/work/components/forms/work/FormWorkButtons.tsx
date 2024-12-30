import { Button } from '@/components';
import { ButtonsForm } from '@/modules/core/components';
import { useFormWorkContext } from '@/modules/work/hooks/context/useFormWorkContext';
import { MODULE_WORKS_PATHS } from '@/modules/work/routes/pathRoutes';
import React from 'react';
import { useNavigate } from 'react-router-dom';

export const FormWorkButtons: React.FC = () => {
  const { readOnly, isSubmitting } = useFormWorkContext();

  const navigate = useNavigate();

  const handleReturnToModule = () => {
    navigate(MODULE_WORKS_PATHS.ViewAll);
  };

  return readOnly ? (
    <Button className="my-2" onClick={handleReturnToModule}>
      Volver
    </Button>
  ) : (
    <ButtonsForm
      actionToCancel={handleReturnToModule}
      isPending={isSubmitting}
      formId="formWork"
      className="flex w-48 gap-2 mt-2"
    />
  );
};
