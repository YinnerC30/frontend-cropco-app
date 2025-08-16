import { Button } from '@/components';
import { Filter } from 'lucide-react';

interface Props {
  onClick: () => void;
  disabled: boolean;
  
  dataTestId: string;
}

export const ButtonFiltersModule: React.FC<Props> = ({
  
  dataTestId,
  onClick,
  ...rest
}) => {
  return (
    <Button
      variant="outline"
      onClick={() => onClick()}
      size={'icon'}
      {...rest}
      data-testid={dataTestId}
    >
      <Filter className="w-4 h-4" />
    </Button>
  );
};
