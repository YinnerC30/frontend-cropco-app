import { Button } from '@/components';
import { ButtonsForm } from '@/modules/core/components';
import { useFormWorkContext } from '@/modules/work/hooks/context/useFormWorkContext';

export const FormWorkButtons = () => {
  const { readOnly, handleReturnToModule, isSubmitting } = useFormWorkContext();

  return readOnly ? (
    <Button className="my-2" onClick={handleReturnToModule}>
      Volver
    </Button>
  ) : (
    <ButtonsForm
      actionToCancel={handleReturnToModule}
      isPending={isSubmitting}
      formId="formWork"
      className="flex w-48 gap-2 mt-2"
    />
  );
};
