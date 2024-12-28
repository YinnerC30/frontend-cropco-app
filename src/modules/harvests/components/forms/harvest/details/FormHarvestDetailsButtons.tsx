import { Button } from '@/components';
import { useFormHarvestContext } from '@/modules/harvests/hooks';
// import { toast } from 'sonner';

interface Props {
  onClick: () => void;
}

export const FormHarvestDetailsButtons = ({ onClick }: Props) => {
  const { formHarvestDetail } = useFormHarvestContext();

  const handleClick = async () => {
    // const isDirty = formHarvestDetail.formState.isDirty;
    // if (!isDirty) {
    //   toast.info('No has realizado cambios;');
    //   return;
    // }
    const isValid = await formHarvestDetail.trigger();
    isValid && onClick();
  };
  return (
    <div>
      <Button onClick={handleClick}>Guardar</Button>
    </div>
  );
};
