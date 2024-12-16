import { Button } from '@/components';
import { useFormShoppingContext } from '@/modules/shopping/hooks/context/useFormShoppingContext';

import { toast } from 'sonner';

interface Props {
  onClick: any;
}

export const FormShoppingDetailsButtons = ({ onClick }: Props) => {
  const { formShoppingDetail } = useFormShoppingContext();

  const handleClick = async () => {
    const isDirty = formShoppingDetail.formState.isDirty;
    if (!isDirty) {
      toast.info('No has realizado cambios;');
      return;
    }
    const isValid = await formShoppingDetail.trigger();
    console.log('Paso por');
    console.log(isValid);
    console.log(formShoppingDetail.formState);
    isValid && onClick();
  };
  return (
    <div>
      <Button onClick={handleClick}>Guardar</Button>
    </div>
  );
};
