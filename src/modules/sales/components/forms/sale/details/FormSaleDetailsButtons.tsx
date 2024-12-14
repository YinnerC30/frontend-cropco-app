import { Button } from '@/components';
import { useFormSaleContext } from '@/modules/sales/hooks';


import { toast } from 'sonner';

interface Props {
  onClick: any;
}

export const FormSaleDetailsButtons = ({ onClick }: Props) => {
  const { formSaleDetail } = useFormSaleContext();

  const handleClick = async () => {
    const isDirty = formSaleDetail.formState.isDirty;
    if (!isDirty) {
      toast.info('No has realizado cambios;');
      return;
    }
    const isValid = await formSaleDetail.trigger();
    console.log('Paso por')
    console.log(isValid);
    console.log(formSaleDetail.formState)
    isValid && onClick();
  };
  return (
    <div>
      <Button onClick={handleClick}>Guardar</Button>
    </div>
  );
};
