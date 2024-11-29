import { Button } from '@/components';
import { useFormSupplierContext } from '../../hooks';
import { ButtonsForm } from '@/modules/core/components';

export const FormSupplierButtons = () => {
  const { readOnly, handleReturnToModule, isSubmitting } =
    useFormSupplierContext();

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
