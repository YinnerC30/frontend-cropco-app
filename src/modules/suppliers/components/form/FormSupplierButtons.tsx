import { Button } from '@/components';
import { useFormSupplierContext } from '../../hooks';
import { ButtonsForm } from '@/modules/core/components';
import { useNavigate } from 'react-router-dom';
import { MODULE_SUPPLIER_PATHS } from '../../routes/pathRoutes';

export const FormSupplierButtons: React.FC = () => {
  const { readOnly, isSubmitting } = useFormSupplierContext();

  const navigate = useNavigate();

  const handleReturnToModule = () => {
    navigate(MODULE_SUPPLIER_PATHS.ViewAll);
  };

  return readOnly ? (
    <Button className="my-2" onClick={handleReturnToModule}>
      Volver
    </Button>
  ) : (
    <ButtonsForm
      actionToCancel={handleReturnToModule}
      isPending={isSubmitting}
      formId="formSupplier"
      className="flex w-48 gap-2 mt-2"
    />
  );
};
