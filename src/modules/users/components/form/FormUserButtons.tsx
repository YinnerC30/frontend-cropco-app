import { Button } from '@/components';
import { ButtonsForm } from '@/modules/core/components';
import { useFormUserContext } from '../../hooks';
import { useNavigate } from 'react-router-dom';
import { MODULE_USER_PATHS } from '../../routes/pathsRoutes';

export const FormUserButtons: React.FC = () => {
  const { readOnly, isSubmitting } = useFormUserContext();

  const navigate = useNavigate();

  const handleReturnToModule = (): void => {
    navigate(MODULE_USER_PATHS.ViewAll);
  };

  return readOnly ? (
    <Button className="my-2" onClick={handleReturnToModule}>
      Volver
    </Button>
  ) : (
    <ButtonsForm
      actionToCancel={handleReturnToModule}
      isPending={isSubmitting}
      formId="formUser"
      className="flex w-48 gap-2 mt-2"
    />
  );
};
