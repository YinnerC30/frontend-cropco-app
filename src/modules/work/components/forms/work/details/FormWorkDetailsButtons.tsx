import { Button } from '@/components';
import { useFormWorkContext } from '@/modules/work/hooks/context/useFormWorkContext';

import { toast } from 'sonner';

interface Props {
  onClick: any;
}

export const FormWorkDetailsButtons = ({ onClick }: Props) => {
  const { formWorkDetail } = useFormWorkContext();

  const handleClick = async () => {
    const isDirty = formWorkDetail.formState.isDirty;
    if (!isDirty) {
      toast.info('No has realizado cambios;');
      return;
    }
    const isValid = await formWorkDetail.trigger();
    isValid && onClick();
  };
  return (
    <div>
      <Button onClick={handleClick}>Guardar</Button>
    </div>
  );
};
