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
    className = '',
    dataTestId = '',
  }: {
    label: string;
    content: JSX.Element;
    actionOnSave: () => Promise<boolean>;
    actionOnClose: () => void;
    className?: string;
    dataTestId?: string;
  }) => {
    const [openMenu, setOpenMenu] = useState(false);

    return (
      <DropdownMenuSub open={openMenu} onOpenChange={setOpenMenu} >
        <DropdownMenuSubTrigger
          data-testid={dataTestId}
          onMouseDown={(e) => e.preventDefault()}
        >
          {label}
        </DropdownMenuSubTrigger>
        <DropdownMenuPortal>
          <DropdownMenuSubContent
            className={`w-[240px] p-4 ml-2 ${className}`}
            avoidCollisions
            sideOffset={0}
            onPointerDownOutside={(e) => {
              e.preventDefault();
              /* setOpenDropDownMenu((prev: boolean) => !prev); */
            }}
            /* onCloseAutoFocus={(e) => e.preventDefault()} */
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
                data-testid={`button-${dataTestId}-apply`}
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
                data-testid={`button-${dataTestId}-close`}
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
