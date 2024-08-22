import { Button } from "@/components";
import { DropdownMenuItem } from "@/components/ui/dropdown-menu";

export const ItemTemplate = ({
  setOpenDropDownMenu,
  action,
  Icon,
  message,
}: any) => {
  return (
    <DropdownMenuItem asChild>
      <Button
        onClick={() => {
          action();
          setOpenDropDownMenu(false);
        }}
        variant={"ghost"}
      >
        <Icon className="w-4 h-4 mr-2" /> {message}
      </Button>
    </DropdownMenuItem>
  );
};
