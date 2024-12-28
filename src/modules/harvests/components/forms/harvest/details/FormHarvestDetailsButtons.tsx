import { Button } from '@/components';
import { useFormHarvestContext } from '@/modules/harvests/hooks';
// import { toast } from 'sonner';

interface Props {
  onClick: () => Promise<void>;
}

export const FormHarvestDetailsButtons: React.FC<Props> = ({ onClick }) => {
  const { formHarvestDetail } = useFormHarvestContext();

  const handleClick = async () => {
    const isValid = await formHarvestDetail.trigger();
    isValid && (await onClick());
  };
  return (
    <div>
      <Button onClick={handleClick}>Guardar</Button>
    </div>
  );
};
