import { Button } from '@/components';

interface Props {
  onClick: any;
  disabled: boolean;
  visible: boolean;
}

export const ButtonDeleteBulk = ({ onClick, disabled = false, visible }: Props) => {
  return (
    <Button onClick={onClick} disabled={disabled} className={`${!visible ? 'hidden' : ''}`}>
      Eliminar
    </Button>
  );
};
