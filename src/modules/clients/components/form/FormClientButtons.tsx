import { Button } from '@/components';
import { useFormClientContext } from '../../hooks';
import { ButtonsForm } from '@/modules/core/components';
import { useNavigate } from 'react-router-dom';
import { MODULE_CLIENTS_PATHS } from '../../routes/pathRoutes';

export const FormClientButtons: React.FC = () => {
  const { readOnly, isSubmitting } =
    useFormClientContext();

  const navigate = useNavigate();

  const handleReturnToModule = () => {
    navigate(MODULE_CLIENTS_PATHS.ViewAll);
  };

  return readOnly ? (
    <Button className="my-2" onClick={handleReturnToModule}>
      Volver
    </Button>
  ) : (
    <ButtonsForm
      actionToCancel={handleReturnToModule}
      isPending={isSubmitting}
      formId="formClient"
      className="flex w-48 gap-2 mt-2"
    />
  );
};
