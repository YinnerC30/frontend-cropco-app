import { Button } from '@/components';
import { useFormSupplyContext } from '../../hooks';
import { ButtonsForm } from '@/modules/core/components';

export const FormSupplyButtons = () => {
  const { readOnly, handleReturnToModule, isSubmitting } =
    useFormSupplyContext();

  return readOnly ? (
    <Button className="my-2" onClick={handleReturnToModule}>
      Volver
    </Button>
  ) : (
    <ButtonsForm
      actionToCancel={handleReturnToModule}
      isPending={isSubmitting}
      formId="formSupply"
      className="flex w-48 gap-2 mt-2"
    />
  );
};
