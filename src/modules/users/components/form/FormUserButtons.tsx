import { ButtonsForm } from '@/modules/core/components';
import { ButtonBack } from '@/modules/core/components/form/buttons/ButtonBack';
import { useNavigate } from 'react-router-dom';
import { useFormUserContext } from '../../hooks';
import { MODULE_USER_PATHS } from '../../routes/pathsRoutes';

export const FormUserButtons: React.FC = () => {
  const { readOnly, isSubmitting } = useFormUserContext();

  const navigate = useNavigate();

  const handleReturnToModule = (): void => {
    navigate(MODULE_USER_PATHS.ViewAll);
  };

  return readOnly ? (
    <ButtonBack handleNavigation={handleReturnToModule} />
  ) : (
    <ButtonsForm
      actionToCancel={handleReturnToModule}
      isPending={isSubmitting}
      formId="formUser"
      className="flex w-48 gap-2 mt-2"
    />
  );
};
