import {
  Button,
  DropdownMenuPortal,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
} from '@/components';
import { memo, useState } from 'react';

export const FilterDropdownItem = memo(
  ({
    label,
    content,
    actionOnSave,
    actionOnClose,
    className = ''
  }: {
    label: string;
    content: JSX.Element;
    actionOnSave: () => Promise<boolean>;
    actionOnClose: () => void;
    className?: string;
  }) => {
    const [openMenu, setOpenMenu] = useState(false);

    return (
      <DropdownMenuSub open={openMenu} onOpenChange={setOpenMenu}>
        <DropdownMenuSubTrigger>{label}</DropdownMenuSubTrigger>
        <DropdownMenuPortal>
          <DropdownMenuSubContent
            className={`w-[240px] p-4 ml-2 ${className}`}
            avoidCollisions
            sideOffset={0}
          >
            {content}
            <div className="flex justify-center gap-2">
              <Button
                className="self-end w-24 mt-4"
                onClick={async (e) => {
                  e.preventDefault();
                  const value = await actionOnSave();
                  setOpenMenu(!value);
                }}
              >
                Aplicar
              </Button>
              <Button
                variant={'destructive'}
                className="self-end w-24 mt-4"
                onClick={() => {
                  setOpenMenu(false);
                  actionOnClose();
                }}
              >
                Cerrar
              </Button>
            </div>
          </DropdownMenuSubContent>
        </DropdownMenuPortal>
      </DropdownMenuSub>
    );
  }
);
