import { Button } from '@/components';

interface Props {
  onClick: any;
  disabled: boolean;
}

export const ButtonRefetchData = ({ onClick, disabled = false }: Props) => {
  return (
    <Button onClick={onClick} disabled={disabled}>
      Recargar
    </Button>
  );
};
