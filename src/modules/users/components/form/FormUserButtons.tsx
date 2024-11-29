import { Button } from '@/components';
import { useFormUserContext } from './FormUserContext';
import { ButtonsForm } from '@/modules/core/components';

export const FormUserButtons = () => {
  const { readOnly, handleReturnToModule, isSubmitting } = useFormUserContext();

  return readOnly ? (
    <Button className="my-2" onClick={handleReturnToModule}>
      Volver
    </Button>
  ) : (
    <ButtonsForm
      actionToCancel={handleReturnToModule}
      isPending={isSubmitting}
      formId="formUser"
      className="flex w-48 gap-2 mt-2"
    />
  );
};
