import { Button } from '@/components';
import { ButtonsForm } from '@/modules/core/components';
import { useFormShoppingContext } from '@/modules/shopping/hooks/context/useFormShoppingContext';

export const FormShoppingButtons = () => {
  const { readOnly, handleReturnToModule, isSubmitting } =
    useFormShoppingContext();

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
