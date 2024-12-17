import { Button } from '@/components';
import { useFormConsumptionContext } from '@/modules/consumption/hooks/context/useFormConsumptionContext';
import { ButtonsForm } from '@/modules/core/components';


export const FormConsumptionButtons = () => {
  const { readOnly, handleReturnToModule, isSubmitting } =
    useFormConsumptionContext();

  return readOnly ? (
    <Button className="my-2" onClick={handleReturnToModule}>
      Volver
    </Button>
  ) : (
    <ButtonsForm
      actionToCancel={handleReturnToModule}
      isPending={isSubmitting}
      formId="formConsumption"
      className="flex w-48 gap-2 mt-2"
    />
  );
};
