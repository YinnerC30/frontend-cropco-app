import { Button } from '@/components';
// import { useFormEmployeeContext } from '../../hooks';

import { ButtonsForm } from '@/modules/core/components';
import { useFormEmployeeContext } from '../../hooks';
import { useNavigate } from 'react-router-dom';
import { MODULE_EMPLOYEE_PATHS } from '../../routes/pathRoutes';

export const FormEmployeeButtons: React.FC = () => {
  const { readOnly, isSubmitting } = useFormEmployeeContext();

  const navigate = useNavigate();

  const handleReturnToModule = () => {
    navigate(MODULE_EMPLOYEE_PATHS.ViewAll);
  };

  return readOnly ? (
    <Button className="my-2" onClick={handleReturnToModule}>
      Volver
    </Button>
  ) : (
    <ButtonsForm
      actionToCancel={handleReturnToModule}
      isPending={isSubmitting}
      formId="formEmployee"
      className="flex w-48 gap-2 mt-2"
    />
  );
};
