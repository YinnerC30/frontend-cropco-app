import { Button } from '@/components';
import { ButtonsForm } from '@/modules/core/components';
import { useFormShoppingContext } from '@/modules/shopping/hooks/context/useFormShoppingContext';
import { MODULE_SHOPPING_PATHS } from '@/modules/shopping/routes/pathRoutes';
import { useNavigate } from 'react-router-dom';

export const FormShoppingButtons: React.FC = () => {
  const { readOnly, isSubmitting } = useFormShoppingContext();

  const navigate = useNavigate();

  const handleReturnToModule = () => {
    navigate(MODULE_SHOPPING_PATHS.ViewAll);
  };

  return readOnly ? (
    <Button className="my-2" onClick={handleReturnToModule}>
      Volver
    </Button>
  ) : (
    <ButtonsForm
      actionToCancel={handleReturnToModule}
      isPending={isSubmitting}
      formId="formShopping"
      className="flex w-48 gap-2 mt-2"
    />
  );
};
