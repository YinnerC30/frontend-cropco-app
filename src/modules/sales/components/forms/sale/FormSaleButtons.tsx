import { Button } from '@/components';
import { ButtonsForm } from '@/modules/core/components';
import { useFormSaleContext } from '@/modules/sales/hooks/context/useFormSaleContext';

export const FormSaleButtons = () => {
  const { readOnly, handleReturnToModule, isSubmitting } = useFormSaleContext();

  return readOnly ? (
    <Button className="my-2" onClick={handleReturnToModule}>
      Volver
    </Button>
  ) : (
    <ButtonsForm
      actionToCancel={handleReturnToModule}
      isPending={isSubmitting}
      formId="formSale"
      className="flex w-48 gap-2 mt-2"
    />
  );
};
