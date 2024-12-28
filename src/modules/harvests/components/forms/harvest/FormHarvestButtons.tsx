import { Button } from '@/components';
import { ButtonsForm } from '@/modules/core/components';
import { useFormHarvestContext } from '@/modules/harvests/hooks';
import { MODULE_HARVESTS_PATHS } from '@/modules/harvests/routes/pathRoutes';
import { useNavigate } from 'react-router-dom';

export const FormHarvestButtons: React.FC = () => {
  const { readOnly, isSubmitting } = useFormHarvestContext();

  const navigate = useNavigate();

  const handleReturnToModule = () => {
    navigate(MODULE_HARVESTS_PATHS.ViewAll);
  };

  return readOnly ? (
    <Button className="my-2" onClick={handleReturnToModule}>
      Volver
    </Button>
  ) : (
    <ButtonsForm
      actionToCancel={handleReturnToModule}
      isPending={isSubmitting}
      formId="formHarvest"
      className="flex w-48 gap-2 mt-2"
    />
  );
};
