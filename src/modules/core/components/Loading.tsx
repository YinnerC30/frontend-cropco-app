import { ReloadIcon } from '@radix-ui/react-icons';
import { Button } from '../ui/button';

export const Loading = () => {
  return (
    <div className="flex items-center justify-center h-full">
      <Button disabled>
        <ReloadIcon className="w-4 h-4 mr-2 animate-spin" />
        Cargando información
      </Button>
    </div>
  );
};
