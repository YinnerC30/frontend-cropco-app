import { Button } from '@/components';
import { useFormConsumptionContext } from '@/modules/consumption/hooks/context/useFormConsumptionContext';

import { toast } from 'sonner';

interface Props {
  onClick: any;
}

export const FormConsumptionDetailsButtons = ({ onClick }: Props) => {
  const { formConsumptionDetail } = useFormConsumptionContext();

  const handleClick = async () => {
    const isDirty = formConsumptionDetail.formState.isDirty;
    if (!isDirty) {
      toast.info('No has realizado cambios;');
      return;
    }
    const isValid = await formConsumptionDetail.trigger();

    isValid && onClick();
  };
  return (
    <div>
      <Button onClick={handleClick}>Guardar</Button>
    </div>
  );
};
