import { Button } from '@/components';
import { DropdownMenuItem } from '@/components/ui/dropdown-menu';
import { Clipboard } from 'lucide-react';
import { toast } from 'sonner';

interface Props {
  id: string;
  onChange: (state: boolean) => void;
}

export const ItemCopyIdRecord = ({ id, onChange }: Props) => {
  return (
    <DropdownMenuItem asChild>
      <Button
        onClick={() => {
          navigator.clipboard.writeText(id);
          onChange(false);
          toast.success(`Id copiado al portapapeles ${id}`);
        }}
        variant={'ghost'}
        className="cursor-pointer"
      >
        <Clipboard className="w-4 h-4 mr-2" /> Copiar Id
      </Button>
    </DropdownMenuItem>
  );
};
