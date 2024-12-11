import { Button } from '@/components';
import { ReloadIcon } from '@radix-ui/react-icons';

interface Props {
  className?: string;
  message?: string;
}
export const Loading = ({
  className = '',
  message = 'Cargando información',
}: Props) => {
  return (
    <div
      className={`flex items-center justify-center w-full h-full ${className}`}
    >
      <Button disabled>
        <ReloadIcon className="w-4 h-4 mr-2 animate-spin" />
        {message}
      </Button>
    </div>
  );
};
