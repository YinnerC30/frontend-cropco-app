import { Button } from '@/components';
import { useFormHarvestDetailsContext } from '@/modules/harvests/hooks';

export const FormHarvestDetailsButtons = () => {
  const { onSubmitHarvestDetail, formHarvestDetail } =
    useFormHarvestDetailsContext();

  const handleClick = async () => {
    const isValid = await formHarvestDetail.trigger();
    isValid && onSubmitHarvestDetail();
  };
  return (
    <div>
      <Button onClick={handleClick}>Guardar</Button>
    </div>
  );
};
