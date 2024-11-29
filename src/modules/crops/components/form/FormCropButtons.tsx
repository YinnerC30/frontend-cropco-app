import { Button } from '@/components';
import { useFormCropContext } from '../../hooks';
import { ButtonsForm } from '@/modules/core/components';

export const FormCropButtons = () => {
  const { readOnly, handleReturnToModule, isSubmitting } = useFormCropContext();

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
