import { Button } from '@/components';
import { useFormConsumptionContext } from '@/modules/consumption/hooks/context/useFormConsumptionContext';
import { MODULE_CONSUMPTION_PATHS } from '@/modules/consumption/routes/pathRoutes';
import { ButtonsForm } from '@/modules/core/components';
import { useNavigate } from 'react-router-dom';

export const FormConsumptionButtons: React.FC = () => {
  const { readOnly, isSubmitting } = useFormConsumptionContext();

  const navigate = useNavigate();

  const handleReturnToModule = () => {
    navigate(MODULE_CONSUMPTION_PATHS.ViewAll);
  };

  return readOnly ? (
    <Button className="my-2" onClick={handleReturnToModule}>
      Volver
    </Button>
  ) : (
    <ButtonsForm
      actionToCancel={handleReturnToModule}
      isPending={isSubmitting}
      formId="formConsumption"
      className="flex w-48 gap-2 mt-2"
    />
  );
};
