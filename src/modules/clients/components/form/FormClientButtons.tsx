import { Button } from '@/components';
import { useFormClientContext } from '../../hooks';
import { ButtonsForm } from '@/modules/core/components';

export const FormClientButtons = () => {
  const { readOnly, handleReturnToModule, isSubmitting } =
    useFormClientContext();

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
