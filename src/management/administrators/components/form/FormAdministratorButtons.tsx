import { Button } from '@/components';
import { ButtonsForm } from '@/modules/core/components';

import { useNavigate } from 'react-router-dom';
import { MODULE_ADMINISTRATORS_PATHS } from '../../routes/pathsRoutes';

export const FormAdministratorButtons: React.FC = () => {
  // const { readOnly, isSubmitting } = useFormAdministratorContext();

  const navigate = useNavigate();

  const handleReturnToModule = (): void => {
    navigate(MODULE_ADMINISTRATORS_PATHS.ViewAll);
  };

  return false ? (
    <Button className="my-2" onClick={handleReturnToModule}>
      Volver
    </Button>
  ) : (
    <ButtonsForm
      actionToCancel={handleReturnToModule}
      isPending={false}
      formId="formAdministrator"
      className="flex w-48 gap-2 mt-2"
    />
  );
};
