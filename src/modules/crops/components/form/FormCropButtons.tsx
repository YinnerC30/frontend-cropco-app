import { Button } from '@/components';
import { useFormCropContext } from '../../hooks';
import { ButtonsForm } from '@/modules/core/components';
import { useNavigate } from 'react-router-dom';
import { MODULE_CROPS_PATHS } from '../../routes/pathRoutes';

export const FormCropButtons: React.FC = () => {
  const { readOnly, isSubmitting } = useFormCropContext();

  const navigate = useNavigate();

  const handleReturnToModule = () => {
    navigate(MODULE_CROPS_PATHS.ViewAll);
  };

  return readOnly ? (
    <Button className="my-2" onClick={handleReturnToModule}>
      Volver
    </Button>
  ) : (
    <ButtonsForm
      actionToCancel={handleReturnToModule}
      isPending={isSubmitting}
      formId="formCrop"
      className="flex w-48 gap-2 mt-2"
    />
  );
};
