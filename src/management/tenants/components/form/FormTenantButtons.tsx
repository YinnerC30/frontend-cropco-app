import { Button } from '@/components';
import { useFormTenantContext } from '../../hooks';
import { ButtonsForm } from '@/modules/core/components';
import { useNavigate } from 'react-router-dom';
import { MODULE_TENANTS_PATHS } from '../../routes/pathRoutes';

export const FormTenantButtons: React.FC = () => {
  const { readOnly, isSubmitting } = useFormTenantContext();

  const navigate = useNavigate();

  const handleReturnToModule = () => {
    navigate(MODULE_TENANTS_PATHS.ViewAll);
  };

  return readOnly ? (
    <Button className="my-2" onClick={handleReturnToModule}>
      Volver
    </Button>
  ) : (
    <ButtonsForm
      actionToCancel={handleReturnToModule}
      isPending={isSubmitting}
      formId="formTenant"
      className="flex w-48 gap-2 mt-2"
    />
  );
}; 