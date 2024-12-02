import { Button } from '@/components';
import { useFormHarvestContext } from '@/modules/harvests/hooks';

interface Props {
  onClick: any;
}

export const FormHarvestDetailsButtons = ({ onClick }: Props) => {
  const { formHarvestDetail } = useFormHarvestContext();

  const handleClick = async () => {
    const isValid = await formHarvestDetail.trigger();
    isValid && onClick();
  };
  return (
    <div>
      <Button onClick={handleClick}>Guardar</Button>
    </div>
  );
};
