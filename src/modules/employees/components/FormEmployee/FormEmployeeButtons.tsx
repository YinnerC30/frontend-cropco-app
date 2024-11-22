import { Button } from '@/components';
import { useFormEmployeeContext } from './FormEmployeeContext';
import { ButtonsForm } from '@/modules/core/components';

export const FormEmployeeButtons = () => {
  const { readOnly, handleReturnToModule, isSubmitting } = useFormEmployeeContext();

  return readOnly ? (
    <Button className="my-2" onClick={handleReturnToModule}>
      Volver
    </Button>
  ) : (
    <ButtonsForm
      actionToCancel={handleReturnToModule}
      isPending={isSubmitting}
      formId="formEmployee"
      className="flex w-48 gap-2 mt-2"
    />
  );
};
