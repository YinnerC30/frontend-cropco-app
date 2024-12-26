import { Button } from '@/components';
import { ButtonsForm } from '@/modules/core/components';
import { useNavigate } from 'react-router-dom';
import { useFormSupplyContext } from '../../hooks';
import { MODULE_SUPPLIES_PATHS } from '../../routes/pathRoutes';

export const FormSupplyButtons = () => {
  const { readOnly, isSubmitting } =
    useFormSupplyContext();


    const navigate = useNavigate();
    
      const handleReturnToModule = () => {
        navigate(MODULE_SUPPLIES_PATHS.ViewAll);
      };

  return readOnly ? (
    <Button className="my-2" onClick={handleReturnToModule}>
      Volver
    </Button>
  ) : (
    <ButtonsForm
      actionToCancel={handleReturnToModule}
      isPending={isSubmitting}
      formId="formSupply"
      className="flex w-48 gap-2 mt-2"
    />
  );
};
