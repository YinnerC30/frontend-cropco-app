import { Button } from '@/components';
import { ButtonsForm } from '@/modules/core/components';
import { useFormHarvestContext } from '@/modules/harvests/hooks';

export const FormHarvestButtons = () => {
  const { readOnly, handleReturnToModule, isSubmitting } =
    useFormHarvestContext();

  return readOnly ? (
    <Button className="my-2" onClick={handleReturnToModule}>
      Volver
    </Button>
  ) : (
    <ButtonsForm
      actionToCancel={handleReturnToModule}
      isPending={isSubmitting}
      formId="formHarvest"
      className="flex w-48 gap-2 mt-2"
    />
  );
};
