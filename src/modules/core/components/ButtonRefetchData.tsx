import { Button } from '@/components';

interface Props {
  onClick: any;
  disabled: boolean;
  className?: string;
}

export const ButtonRefetchData = ({
  onClick,
  disabled = false,
  className,
}: Props) => {
  return (
    <Button className={className} onClick={onClick} disabled={disabled}>
      Recargar
    </Button>
  );
};
