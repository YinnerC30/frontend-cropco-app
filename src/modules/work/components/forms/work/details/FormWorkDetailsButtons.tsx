import { Button } from '@/components';
import { useFormWorkContext } from '@/modules/work/hooks/context/useFormWorkContext';

interface Props {
  onClick: () => Promise<void>;
}

export const FormWorkDetailsButtons: React.FC<Props> = ({ onClick }: Props) => {
  const { formWorkDetail } = useFormWorkContext();

  const handleClick = async () => {
    const isValid = await formWorkDetail.trigger();
    isValid && (await onClick());
  };
  return (
    <div>
      <Button onClick={handleClick}>Guardar</Button>
    </div>
  );
};
