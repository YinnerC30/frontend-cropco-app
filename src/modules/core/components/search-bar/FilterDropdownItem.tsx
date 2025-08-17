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
      <DropdownMenuSub
        open={openMenu}

        // onOpenChange={(value) => {
        //   // if (value) {
        //   //   setOpenMenu(value);
        //   // }
        // }}
      >
        <DropdownMenuSubTrigger
          data-testid={dataTestId}
          onMouseDown={(e) => e.preventDefault()}
          onClick={(e) => {
            e.preventDefault();
            // e.stopPropagation();
            console.log('Se llamo');
            setOpenMenu((prev) => !prev);
          }}
          // onMouseEnter={(e) => e.preventDefault()}
          // onFocus={(e) => e.preventDefault()}
        >
          {label}
        </DropdownMenuSubTrigger>

        <DropdownMenuPortal>
          <DropdownMenuSubContent
            className={`w-[360px] p-4 ml-2 ${className}`}
            avoidCollisions
            sideOffset={0}
            onPointerDownOutside={(e) => {
              e.preventDefault();
              e.stopImmediatePropagation();
            }}
            alignOffset={5}

            // onFocusOutside={(e) => {
            //   e.preventDefault();
            //   // setOpenMenu(false)
            // }}
            // onInteractOutside={(e) => e.preventDefault()}
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
