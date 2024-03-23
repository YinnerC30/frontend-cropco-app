import { Button } from '@/components/ui/button';
import { Pencil2Icon, PlusIcon } from '@radix-ui/react-icons';
import { UserTable } from './table/UserTable';
import { useNavigate } from 'react-router-dom';
import { SearchBar } from '@/components/form/SearchBar';
import {
  Tooltip,
  TooltipProvider,
  TooltipTrigger,
  TooltipContent,
} from '@/components/ui/tooltip';

export const UsersModule = () => {
  const navigate = useNavigate();
  return (
    <>
      <SearchBar />

      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              className="ml-8 bg-blue-600"
              onClick={() => navigate('../create')}
            >
              <PlusIcon className="w-4 h-4" />
            </Button>
          </TooltipTrigger>
          <TooltipContent>
            <p>Crear</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>

      <div className="flex items-center justify-center">
        <UserTable />
      </div>
    </>
  );
};

export default UsersModule;
